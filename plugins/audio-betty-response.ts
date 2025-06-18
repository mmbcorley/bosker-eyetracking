import { JsPsych, JsPsychPlugin, ParameterType, TrialType } from "jspsych";

const info = <const>{
  name: "audio-betty-response",
  version: "1.0.0",
  parameters: {
    stimulus: {
      type: ParameterType.AUDIO,
      default: undefined,
    },
    choices: {
      type: ParameterType.IMAGE,
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
    response_ends_trial: {
      type: ParameterType.BOOL,
      default: true,
    },
    trial_ends_after_audio: {
      type: ParameterType.BOOL,
      default: false,
    },
    response_allowed_while_playing: {
      type: ParameterType.BOOL,
      default: true,
    },
    hide_mouse_during_audio: {
      type: ParameterType.BOOL,
      default: true,
    },
  },
  data: {
    rt: {
      type: ParameterType.FLOAT,
    },
    stimulus: {
      type: ParameterType.STRING,
    },
    left_img: {
      type: ParameterType.STRING,
    },
    right_img: {
      type: ParameterType.STRING,
    },
    choice: {
      type: ParameterType.STRING,
    },
    audio_onset: {
      type: ParameterType.FLOAT,
    },
    audio_offset: {
      type: ParameterType.FLOAT,
    },
    l_img_top: { type: ParameterType.INT },
    l_img_bottom: { type: ParameterType.INT },
    l_img_left: { type: ParameterType.INT },
    l_img_right: { type: ParameterType.INT },
    r_img_top: { type: ParameterType.INT },
    r_img_bottom: { type: ParameterType.INT },
    r_img_left: { type: ParameterType.INT },
    r_img_right: { type: ParameterType.INT },
  },
};

type Info = typeof info;

class AudioBettyResponsePlugin implements JsPsychPlugin<Info> {
  static info = info;

  constructor(private jsPsych: JsPsych) {}

  trial(display_element: HTMLElement, trial: TrialType<Info>) {
    const context = this.jsPsych.pluginAPI.audioContext();
    let audio: AudioBufferSourceNode | HTMLAudioElement;

    let left_bbox: DOMRect = null;
    let right_bbox: DOMRect = null;

    const response = {
      rt: null as number | null,
      button: null as string | null,
    };

    let startTime: number;
    let audioEndTime: number = null;
    let audioStartTime: number = null;

    const round = (number: number, digits = 2) => {
      const power_of_10 = Math.pow(10, digits);
      return Math.round(number * power_of_10) / power_of_10;
    };

    const get_stimuli_name = (image_path: string) => {
      if (typeof image_path !== "string") return null;
      const path_pieces = image_path.split("/");
      return path_pieces[path_pieces.length - 1];
    };

    const end_trial = () => {
      this.jsPsych.pluginAPI.clearAllTimeouts();

      if (audio) {
        if (context) {
          (audio as AudioBufferSourceNode).stop();
        } else {
          (audio as HTMLAudioElement).pause();
        }
        audio.removeEventListener("ended", end_trial);
        audio.removeEventListener("ended", enable_buttons);
        audio.removeEventListener("ended", on_audio_ended);
        audio.removeEventListener("ended", reveal_mouse);
      }

      const trial_data = {
        rt: response.rt,
        stimulus: get_stimuli_name(trial.stimulus),
        left_img: get_stimuli_name(trial.choices[0]),
        right_img: get_stimuli_name(trial.choices[1]),
        choice: response.button,
        audio_onset: audioStartTime,
        audio_offset: audioEndTime,
        l_img_top: left_bbox ? round(left_bbox.top) : null,
        l_img_bottom: left_bbox ? round(left_bbox.bottom) : null,
        l_img_left: left_bbox ? round(left_bbox.left) : null,
        l_img_right: left_bbox ? round(left_bbox.right) : null,
        r_img_top: right_bbox ? round(right_bbox.top) : null,
        r_img_bottom: right_bbox ? round(right_bbox.bottom) : null,
        r_img_left: right_bbox ? round(right_bbox.left) : null,
        r_img_right: right_bbox ? round(right_bbox.right) : null,
      };

      display_element.innerHTML = "";
      this.jsPsych.finishTrial(trial_data);
    };

    const button_response = (e: MouseEvent) => {
      const choice = (e.currentTarget as HTMLElement).getAttribute("data-choice");
      after_response(choice);
    };

    const disable_buttons = () => {
      const btns = document.querySelectorAll(".jspsych-audio-betty-response-button");
      btns.forEach((btn) => {
        btn.removeEventListener("click", button_response as EventListener);
        const button_element = btn.querySelector("button");
        if (button_element) button_element.disabled = true;
      });
    };

    const enable_buttons = () => {
      const btns = document.querySelectorAll(".jspsych-audio-betty-response-button");
      btns.forEach((btn) => {
        btn.addEventListener("click", button_response as EventListener);
        const button_element = btn.querySelector("button");
        if (button_element) button_element.disabled = false;
      });
    };

    const after_response = (choice: string) => {
      const endTime = performance.now();
      const rt = round(endTime - startTime, 3);
      response.button = choice;
      response.rt = rt;
      disable_buttons();
      if (trial.response_ends_trial) {
        end_trial();
      }
    };

    const on_audio_ended = () => {
      audioEndTime = round(performance.now() - startTime, 3);
      left_bbox = document.querySelector("#button-left").getBoundingClientRect();
      right_bbox = document.querySelector("#button-right").getBoundingClientRect();
    };

    const reveal_mouse = () => {
      document.documentElement.style.cursor = "auto";
    };

    const setupTrial = () => {
      if (trial.trial_ends_after_audio) {
        audio.addEventListener("ended", end_trial);
      }
      if (!trial.response_allowed_while_playing && !trial.trial_ends_after_audio) {
        audio.addEventListener("ended", enable_buttons);
      }
      if (trial.hide_mouse_during_audio) {
        document.documentElement.style.cursor = "none";
        audio.addEventListener("ended", reveal_mouse);
      }

      let buttons = [];
      if (Array.isArray(trial.button_html) && trial.button_html.length === trial.choices.length) {
        buttons = trial.button_html;
      } else {
        for (let i = 0; i < trial.choices.length; i++) {
          buttons.push(trial.button_html);
        }
      }

      const left_img = buttons[0].replace(/%choice%/g, trial.choices[0]);
      const right_img = buttons[1].replace(/%choice%/g, trial.choices[1]);
      let html = `
        <div id="jspsych-audio-betty-response-btngroup" class="container-fluid" style="height: 100%">
          <div class="row" style="height: 100%">
            <div class="col-md-5 align-self-center">
              <div class="jspsych-audio-betty-response-button" style="display: inline-block; margin: ${trial.margin_vertical} ${trial.margin_horizontal};" id="button-left" data-choice="left">${left_img}</div>
            </div>
            <div class="col-md-2"></div>
            <div class="col-md-5 align-self-center">
              <div class="jspsych-audio-betty-response-button" style="display: inline-block; margin: ${trial.margin_vertical} ${trial.margin_horizontal};" id="button-right" data-choice="right">${right_img}</div>
            </div>
          </div>
        </div>`;
      if (trial.prompt !== null) {
        html += trial.prompt;
      }
      display_element.innerHTML = html;

      if (trial.response_allowed_while_playing) {
        enable_buttons();
      } else {
        disable_buttons();
      }

      audio.addEventListener("ended", on_audio_ended);

      startTime = performance.now();
      audioStartTime = round(performance.now() - startTime, 3);

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

export default AudioBettyResponsePlugin;
