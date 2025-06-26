var jsPsychWebGazerTwoItem = (function (jspsych) {
  'use strict';

  var version = "0.0.1";

  const info = {
    name: "web-gazer-two-item",
    version,
    parameters: {
      stimulus: {
        type: jspsych.ParameterType.AUDIO,
        default: void 0
      },
      choices: {
        type: jspsych.ParameterType.IMAGE,
        default: void 0,
        array: true
      },
      button_html: {
        type: jspsych.ParameterType.HTML_STRING,
        default: '<button class="jspsych-btn">%choice%</button>',
        array: true
      },
      prompt: {
        type: jspsych.ParameterType.STRING,
        default: null
      },
      trial_duration: {
        type: jspsych.ParameterType.INT,
        default: null
      },
      margin_vertical: {
        type: jspsych.ParameterType.STRING,
        default: "0px"
      },
      margin_horizontal: {
        type: jspsych.ParameterType.STRING,
        default: "8px"
      },
      response_ends_trial: {
        type: jspsych.ParameterType.BOOL,
        default: true
      },
      trial_ends_after_audio: {
        type: jspsych.ParameterType.BOOL,
        default: false
      },
      response_allowed_while_playing: {
        type: jspsych.ParameterType.BOOL,
        default: true
      },
      hide_mouse_during_audio: {
        type: jspsych.ParameterType.BOOL,
        default: true
      }
    },
    data: {
      rt: {
        type: jspsych.ParameterType.FLOAT
      },
      stimulus: {
        type: jspsych.ParameterType.STRING
      },
      left_img: {
        type: jspsych.ParameterType.STRING
      },
      right_img: {
        type: jspsych.ParameterType.STRING
      },
      choice: {
        type: jspsych.ParameterType.STRING
      },
      audio_onset: {
        type: jspsych.ParameterType.FLOAT
      },
      audio_offset: {
        type: jspsych.ParameterType.FLOAT
      },
      l_img_top: { type: jspsych.ParameterType.INT },
      l_img_bottom: { type: jspsych.ParameterType.INT },
      l_img_left: { type: jspsych.ParameterType.INT },
      l_img_right: { type: jspsych.ParameterType.INT },
      r_img_top: { type: jspsych.ParameterType.INT },
      r_img_bottom: { type: jspsych.ParameterType.INT },
      r_img_left: { type: jspsych.ParameterType.INT },
      r_img_right: { type: jspsych.ParameterType.INT }
    },
    // prettier-ignore
    citations: {
      "apa": "",
      "bibtex": ""
    }
  };
  class WebGazerTwoItemPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }
    static {
      this.info = info;
    }
    trial(display_element, trial) {
      const context = this.jsPsych.pluginAPI.audioContext();
      let audio;
      let left_bbox = null;
      let right_bbox = null;
      const response = {
        rt: null,
        button: null
      };
      let startTime;
      let audioEndTime = null;
      let audioStartTime = null;
      const round = (number, digits = 2) => {
        const power_of_10 = Math.pow(10, digits);
        return Math.round(number * power_of_10) / power_of_10;
      };
      const get_stimuli_name = (image_path) => {
        if (typeof image_path !== "string") return null;
        const path_pieces = image_path.split("/");
        return path_pieces[path_pieces.length - 1];
      };
      const end_trial = () => {
        this.jsPsych.pluginAPI.clearAllTimeouts();
        if (audio) {
          if (context) {
            audio.stop();
          } else {
            audio.pause();
          }
          audio.removeEventListener("ended", end_trial);
          audio.removeEventListener("ended", enable_buttons);
          audio.removeEventListener("ended", on_audio_ended);
          audio.removeEventListener("ended", reveal_mouse);
        }
        var trial_data = {
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
          r_img_right: right_bbox ? round(right_bbox.right) : null
        };
        display_element.innerHTML = "";
        this.jsPsych.finishTrial(trial_data);
      };
      const button_response = (e) => {
        const choice = e.currentTarget.getAttribute("data-choice");
        after_response(choice);
      };
      const disable_buttons = () => {
        const btns = document.querySelectorAll(".jspsych-audio-betty-response-button");
        btns.forEach((btn) => {
          btn.removeEventListener("click", button_response);
          const button_element = btn.querySelector("button");
          if (button_element) button_element.disabled = true;
        });
      };
      const enable_buttons = () => {
        const btns = document.querySelectorAll(".jspsych-audio-betty-response-button");
        btns.forEach((btn) => {
          btn.addEventListener("click", button_response);
          const button_element = btn.querySelector("button");
          if (button_element) button_element.disabled = false;
        });
      };
      const after_response = (choice) => {
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
          audio.start(context.currentTime);
        } else {
          audio.play();
        }
        if (trial.trial_duration !== null) {
          this.jsPsych.pluginAPI.setTimeout(end_trial, trial.trial_duration);
        }
      };
      this.jsPsych.pluginAPI.getAudioBuffer(trial.stimulus).then((buffer) => {
        if (context) {
          const source = context.createBufferSource();
          source.buffer = buffer;
          source.connect(context.destination);
          audio = source;
        } else {
          audio = buffer;
          audio.currentTime = 0;
        }
        setupTrial();
      }).catch((err) => {
        console.error(`Failed to load audio file "${trial.stimulus}".`, err);
        end_trial();
      });
    }
  }

  return WebGazerTwoItemPlugin;

})(jsPsychModule);
//# sourceMappingURL=index.browser.js.map
