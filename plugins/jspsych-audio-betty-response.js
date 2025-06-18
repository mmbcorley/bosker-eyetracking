var _globalName_ = (function (jspsych) {
  "use strict";

  const info = {
    name: "audio-betty-response",
    description: "A jsPsych plugin for playing audio and collecting a button/picture response.",
    parameters: {
      stimulus: {
        type: jspsych.ParameterType.AUDIO,
        pretty_name: "Stimulus",
        default: undefined,
        description: "The audio to be played.",
      },
      choices: {
        type: jspsych.ParameterType.IMAGE, // Assuming choices are image paths for the buttons
        pretty_name: "Choices",
        default: undefined,
        array: true,
        description: "The image files for the buttons.",
      },
      button_html: {
        type: jspsych.ParameterType.HTML_STRING,
        pretty_name: "Button HTML",
        default: '<button class="jspsych-btn">%choice%</button>',
        array: true,
        description: "Custom button. Can make your own style.",
      },
      prompt: {
        type: jspsych.ParameterType.STRING,
        pretty_name: "Prompt",
        default: null,
        description: "Any content here will be displayed below the stimulus.",
      },
      trial_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Trial duration",
        default: null,
        description: "The maximum duration to wait for a response.",
      },
      margin_vertical: {
        type: jspsych.ParameterType.STRING,
        pretty_name: "Margin vertical",
        default: "0px",
        description: "Vertical margin of button.",
      },
      margin_horizontal: {
        type: jspsych.ParameterType.STRING,
        pretty_name: "Margin horizontal",
        default: "8px",
        description: "Horizontal margin of button.",
      },
      response_ends_trial: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: "Response ends trial",
        default: true,
        description: "If true, the trial will end when user makes a response.",
      },
      trial_ends_after_audio: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: "Trial ends after audio",
        default: false,
        description: "If true, then the trial will end as soon as the audio file finishes playing.",
      },
      response_allowed_while_playing: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: "Response allowed while playing",
        default: true,
        description: "If true, then responses are allowed while the audio is playing. If false, then the audio must finish playing before a response is accepted.",
      },
      hide_mouse_during_audio: {
          type: jspsych.ParameterType.BOOL,
          pretty_name: 'Hide cursor while audio is playing',
          default: true,
          description: 'If true, the cursor will be hidden while the audio is playing. If false, the cursor will remain visible.'
      }
    },
    data: {
        rt: {
            type: jspsych.ParameterType.FLOAT,
            description: "The reaction time to make a response. This is the time from the start of the trial until a response is made."
        },
        stimulus: {
            type: jspsych.ParameterType.STRING,
            description: "The name of the audio stimulus file."
        },
        left_img: {
            type: jspsych.ParameterType.STRING,
            description: "The name of the image file for the left choice."
        },
        right_img: {
            type: jspsych.ParameterType.STRING,
            description: "The name of the image file for the right choice."
        },
        choice: {
            type: jspsych.ParameterType.STRING,
            description: "The choice made by the participant ('left' or 'right')."
        },
        audio_onset: {
            type: jspsych.ParameterType.FLOAT,
            description: "The timestamp of when the audio began playing relative to the start of the trial."
        },
        audio_offset: {
            type: jspsych.ParameterType.FLOAT,
            description: "The timestamp of when the audio finished playing relative to the start of the trial."
        },
        l_img_top: { type: jspsych.ParameterType.INT },
        l_img_bottom: { type: jspsych.ParameterType.INT },
        l_img_left: { type: jspsych.ParameterType.INT },
        l_img_right: { type: jspsych.ParameterType.INT },
        r_img_top: { type: jspsych.ParameterType.INT },
        r_img_bottom: { type: jspsych.ParameterType.INT },
        r_img_left: { type: jspsych.ParameterType.INT },
        r_img_right: { type: jspsych.ParameterType.INT },
    }
  };

  /**
   * **audio-betty-response**
   *
   * Plays an audio file and records a button response, adapted for a Visual World Paradigm.
   *
   * @author Kristin Diep, Myrte Vos
   */
  class AudioBettyResponsePlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    trial(display_element, trial) {
      // setup stimulus
      const context = this.jsPsych.pluginAPI.audioContext();
      var audio;
      var left_bbox = null;
      var right_bbox = null;

      // store response
      var response = {
        rt: null,
        button: null,
      };

      // record webaudio context start time
      var startTime;
      // ...and end time
      var audioEndTime;
      var audioStartTime = null;

      // function to round numbers
      const round = (number, digits = 2) => {
        var power_of_10 = Math.pow(10, digits);
        return Math.round(number * power_of_10) / power_of_10;
      };

      const get_stimuli_name = (image_path) => {
        if (typeof image_path !== 'string') return null;
        var path_pieces = image_path.split("/");
        return path_pieces[path_pieces.length - 1];
      };

      const on_audio_ended = () => {
        audioEndTime = round((performance.now() / 1000) - startTime, 3);
        left_bbox = document.querySelector("#button-left").getBoundingClientRect();
        right_bbox = document.querySelector("#button-right").getBoundingClientRect();
      };
      
      const reveal_mouse = () => {
          document.documentElement.style.cursor = 'auto';
      };

      // function to end trial when it is time
      const end_trial = () => {
        // kill any remaining setTimeout handlers
        this.jsPsych.pluginAPI.clearAllTimeouts();

        // stop the audio file if it is playing
        if (context !== null) {
          audio.stop();
        } else {
          audio.pause();
        }

        audio.removeEventListener("ended", end_trial);
        audio.removeEventListener("ended", enable_buttons);
        audio.removeEventListener('ended', on_audio_ended);
        audio.removeEventListener('ended', reveal_mouse);

        // gather the data to store for the trial
        var trial_data = {
          rt: response.rt, // Use the RT recorded at the time of response
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

        // clear the display
        display_element.innerHTML = "";

        // move on to the next trial
        this.jsPsych.finishTrial(trial_data);
      };

      // function to handle responses by the subject
      const after_response = (choice) => {
        // measure rt
        var endTime = performance.now();
        var rt = round(endTime - startTime, 3);
        if (context !== null) {
          endTime = context.currentTime;
          // For WebAudio API, RT is calculated relative to the start of the audio context, not the trial start performance.now()
          // We will stick with performance.now() for consistency across audio methods.
        }
        response.button = choice;
        response.rt = rt;

        // disable all the buttons after a response
        disable_buttons();

        if (trial.response_ends_trial) {
          end_trial();
        }
      };
      
      const button_response = (e) => {
        var choice = e.currentTarget.getAttribute("data-choice");
        after_response(choice);
      };

      const disable_buttons = () => {
        var btns = document.querySelectorAll(".jspsych-audio-betty-response-button");
        btns.forEach((btn) => {
          btn.removeEventListener("click", button_response);
          var button_element = btn.querySelector('button');
          if(button_element) button_element.disabled = true;
        });
      };

      const enable_buttons = () => {
        var btns = document.querySelectorAll(".jspsych-audio-betty-response-button");
        btns.forEach((btn) => {
          btn.addEventListener("click", button_response);
          var button_element = btn.querySelector('button');
          if(button_element) button_element.disabled = false;
        });
      };

      // setupTrial function to be called when audio is loaded
      const setupTrial = () => {
        // set up end event if trial needs it
        if (trial.trial_ends_after_audio) {
          audio.addEventListener("ended", end_trial);
        }

        // enable buttons after audio ends if necessary
        if (!trial.response_allowed_while_playing && !trial.trial_ends_after_audio) {
          audio.addEventListener("ended", enable_buttons);
        }

        // hide cursor during audio if indicated
        if (trial.hide_mouse_during_audio) {
            document.documentElement.style.cursor = 'none';
            audio.addEventListener('ended', reveal_mouse);
        }

        //display buttons
        var buttons = [];
        if (Array.isArray(trial.button_html)) {
          if (trial.button_html.length == trial.choices.length) {
            buttons = trial.button_html;
          } else {
            console.error("Error in audio-button-response plugin. The length of the button_html array does not equal the length of the choices array");
          }
        } else {
          for (var i = 0; i < trial.choices.length; i++) {
            buttons.push(trial.button_html);
          }
        }
        
        // This HTML is hard-coded for two choices.
        var left_img = buttons[0].replace(/%choice%/g, trial.choices[0]);
        var right_img = buttons[1].replace(/%choice%/g, trial.choices[1]);
        var html = `
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

        //show prompt if there is one
        if (trial.prompt !== null) {
          html += trial.prompt;
        }

        display_element.innerHTML = html;

        if (trial.response_allowed_while_playing) {
          enable_buttons();
        } else {
          disable_buttons();
        }

        // record audio offset timestamp
        audio.addEventListener("ended", on_audio_ended);
        
        // start time
        startTime = performance.now();

        // start audio
        if (context !== null) {
          // record onset time
          audioStartTime = round((performance.now() - startTime) / 1000, 3);
          context.resume(); // Ensure context is running
          audio.start(context.currentTime);
        } else {
          // record onset time
          audioStartTime = round((performance.now() - startTime) / 1000, 3);
          audio.play();
        }

        // end trial if time limit is set
        if (trial.trial_duration !== null) {
          this.jsPsych.pluginAPI.setTimeout(() => {
            end_trial();
          }, trial.trial_duration);
        }
      }; // end setupTrial

      // load audio file
      this.jsPsych.pluginAPI
        .getAudioBuffer(trial.stimulus)
        .then((buffer) => {
          if (context !== null) {
            audio = context.createBufferSource();
            audio.buffer = buffer;
            audio.connect(context.destination);
          } else {
            audio = buffer;
            audio.currentTime = 0;
          }
          setupTrial();
        })
        .catch((err) => {
          console.error(`Failed to load audio file "${trial.stimulus}". Try checking the file path. We recommend using the preload plugin to load audio files.`);
          console.error(err);
        });
    }
  }
  AudioBettyResponsePlugin.info = info;

  return AudioBettyResponsePlugin;

})(jsPsychModule);
