import { JsPsych, JsPsychPlugin, ParameterType, TrialType } from "jspsych";

const info = <const>{
  name: "audio-button-preamble",
  version: "1.0.0",
  parameters: {
    stimulus: {
      type: ParameterType.AUDIO,
      default: undefined,
    },
    choices: {
      type: ParameterType.STRING,
      default: undefined,
      array: true,
    },
    button_html: {
      type: ParameterType.HTML_STRING,
      default: '<button class="jspsych-btn">%choice%</button>',
      array: true,
    },
    prompt: {
      type: ParameterType.STRING,
      default: null,
    },
    trial_duration: {
      type: ParameterType.INT,
      default: null,
    },
    margin_vertical: {
      type: ParameterType.STRING,
      default: "0px",
    },
    margin_horizontal: {
      type: ParameterType.STRING,
      default: "8px",
    },
  },
  data: {
    rt: {
      type: ParameterType.INT,
    },
    stimulus: {
      type: ParameterType.STRING,
    },
    response: {
      type: ParameterType.INT,
    },
  },
};

type Info = typeof info;

class AudioButtonPreamblePlugin implements JsPsychPlugin<Info> {
  static info = info;

  constructor(private jsPsych: JsPsych) {}

  trial(display_element: HTMLElement, trial: TrialType<Info>) {
    const context = this.jsPsych.pluginAPI.audioContext();
    let audio: AudioBufferSourceNode | HTMLAudioElement;

    const response = {
      rt: null as number | null,
      button: null as number | null,
    };

    let startTime: number;

    const get_stimuli_name = (audio_path: string) => {
      if (typeof audio_path !== "string") return null;
      const path_pieces = audio_path.split("/");
      return path_pieces[path_pieces.length - 1];
    };

    const end_trial = () => {
      this.jsPsych.pluginAPI.clearAllTimeouts();
      if (audio) {
        if (context) {
          // (audio as AudioBufferSourceNode).stop(); // deprecated
        } else {
          (audio as HTMLAudioElement).pause();
        }
        audio.removeEventListener("ended", end_trial);
      }

      const trial_data = {
        rt: response.rt,
        stimulus: get_stimuli_name(trial.stimulus),
        response: response.button,
      };

      display_element.innerHTML = "";
      this.jsPsych.finishTrial(trial_data);
    };

    const after_response = (choice: string) => {
      const endTime = performance.now();
      response.rt = Math.round(endTime - startTime);
      response.button = parseInt(choice, 10);
      disable_buttons();

      if (context) {
        context.resume();
        (audio as AudioBufferSourceNode).start(context.currentTime);
      } else {
        (audio as HTMLAudioElement).play();
      }

      if (trial.trial_duration !== null) {
        this.jsPsych.pluginAPI.setTimeout(end_trial, trial.trial_duration);
      }
    };

    const button_response = (e: MouseEvent) => {
      const choice = (e.currentTarget as HTMLElement).getAttribute("data-choice");
      after_response(choice);
    };

    const disable_buttons = () => {
      const btns = document.querySelectorAll(".jspsych-audio-button-response-button");
      btns.forEach((btn) => {
        btn.removeEventListener("click", button_response as EventListener);
        const button_element = btn.querySelector("button");
        if (button_element) button_element.disabled = true;
      });
    };

    const enable_buttons = () => {
      const btns = document.querySelectorAll(".jspsych-audio-button-response-button");
      btns.forEach((btn) => {
        btn.addEventListener("click", button_response as EventListener);
        const button_element = btn.querySelector("button");
        if (button_element) button_element.disabled = false;
      });
    };

    const setupTrial = () => {
      audio.addEventListener("ended", end_trial);

      let buttons = [];
      if (Array.isArray(trial.button_html) && trial.button_html.length === trial.choices.length) {
        buttons = trial.button_html;
      } else {
        for (let i = 0; i < trial.choices.length; i++) {
          buttons.push(trial.button_html);
        }
      }

      let html = '<div id="jspsych-audio-button-response-btngroup">';
      for (let i = 0; i < trial.choices.length; i++) {
        const str = buttons[i].replace(/%choice%/g, trial.choices[i]);
        html += `<div class="jspsych-audio-button-response-button" style="cursor: pointer; display: inline-block; margin:${trial.margin_vertical} ${trial.margin_horizontal}" id="jspsych-audio-button-response-button-${i}" data-choice="${i}">${str}</div>`;
      }
      html += "</div>";

      if (trial.prompt !== null) {
        html += trial.prompt;
      }

      display_element.innerHTML = html;
      startTime = performance.now();
      enable_buttons();
    };

    this.jsPsych.pluginAPI.getAudioBuffer(trial.stimulus)
      .then((buffer) => {
        if (context) {
          audio = context.createBufferSource();
          audio.buffer = buffer;
          audio.connect(context.destination);
        } else {
          audio = buffer;
          (audio as HTMLAudioElement).currentTime = 0;
        }
        setupTrial();
      })
      .catch((err) => {
        console.error(`Failed to load audio file "${trial.stimulus}".`, err);
        end_trial();
      });
  }
}

export default AudioButtonPreamblePlugin;
