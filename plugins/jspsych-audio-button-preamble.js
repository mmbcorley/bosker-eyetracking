var _globalName_ = (function (jspsych) {
  "use strict";

  const info = {
    name: "audio-button-preamble",
    description: "A jsPsych plugin for clicking a button to trigger an audio file.",
    parameters: {
      stimulus: {
        type: jspsych.ParameterType.AUDIO,
        pretty_name: "Stimulus",
        default: undefined,
        description: "The audio to be played.",
      },
      choices: {
        type: jspsych.ParameterType.STRING,
        pretty_name: "Choices",
        default: undefined,
        array: true,
        description: "The button labels.",
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
    },
    data: {
      rt: {
        type: jspsych.ParameterType.INT,
        description: "The reaction time to click the button to start the audio."
      },
      stimulus: {
        type: jspsych.ParameterType.STRING,
        description: "The audio stimulus file."
      },
      response: {
        type: jspsych.ParameterType.INT,
        description: "The index of the button that was pressed."
      }
    }
  };

  /**
   * **audio-button-preamble**
   *
   * Plays an audio file after a button click.
   *
   * @author Kristin Diep, Serge Minor
   */
  class AudioButtonPreamblePlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    trial(display_element, trial) {
      // setup stimulus
      const context = this.jsPsych.pluginAPI.audioContext();
      var audio;

      // store response
      var response = {
        rt: null,
        button: null,
      };

      // record webaudio context start time
      var startTime;

      const get_stimuli_name = (audio_path) => {
        if(typeof audio_path !== 'string') return null;
        const path_pieces = audio_path.split("/");
        return path_pieces[path_pieces.length - 1];
      };

      // function to end trial when it is time
      const end_trial = () => {
        // kill any remaining setTimeout handlers
        this.jsPsych.pluginAPI.clearAllTimeouts();

        // stop the audio file if it is playing
        if (context !== null) {
          // audio.stop() is deprecated, but necessary for older browsers
          // modern browsers will stop audio when the context is closed
        } else {
          audio.pause();
        }
        audio.removeEventListener("ended", end_trial);

        // gather the data to store for the trial
        var trial_data = {
          rt: response.rt,
          stimulus: get_stimuli_name(trial.stimulus),
          response: response.button,
        };

        // clear the display
        display_element.innerHTML = "";

        // move on to the next trial
        this.jsPsych.finishTrial(trial_data);
      };

      const button_response = (e) => {
        var choice = e.currentTarget.getAttribute("data-choice"); // don't use dataset for jsdom compatibility
        after_response(choice);
      };

      const disable_buttons = () => {
        var btns = document.querySelectorAll(".jspsych-audio-button-response-button");
        btns.forEach((btn) => {
          btn.removeEventListener("click", button_response);
          var button_element = btn.querySelector('button');
          if(button_element) button_element.disabled = true;
        });
      };

      const enable_buttons = () => {
        var btns = document.querySelectorAll(".jspsych-audio-button-response-button");
        btns.forEach((btn) => {
          btn.addEventListener("click", button_response);
           var button_element = btn.querySelector('button');
           if(button_element) button_element.disabled = false;
        });
      };
      
      // function to handle responses by the subject
      const after_response = (choice) => {
        // measure rt for button press
        var endTime = performance.now();
        var rt = Math.round(endTime - startTime);
        response.rt = rt;
        response.button = parseInt(choice);

        // disable the buttons after a response
        disable_buttons();

        // play audio
        if (context !== null) {
          context.resume();
          audio.start(context.currentTime);
        } else {
          audio.play();
        }
        
        // end trial if time limit is set
        if (trial.trial_duration !== null) {
            this.jsPsych.pluginAPI.setTimeout(() => {
                end_trial();
            }, trial.trial_duration);
        }
      };

      const setupTrial = () => {
        // end trial when audio finishes
        audio.addEventListener("ended", end_trial);

        //display buttons
        var buttons = [];
        if (Array.isArray(trial.button_html)) {
          if (trial.button_html.length == trial.choices.length) {
            buttons = trial.button_html;
          } else {
            console.error(
              "Error in audio-button-response plugin. The length of the button_html array does not equal the length of the choices array"
            );
          }
        } else {
          for (let i = 0; i < trial.choices.length; i++) {
            buttons.push(trial.button_html);
          }
        }

        var html = '<div id="jspsych-audio-button-response-btngroup">';
        for (var i = 0; i < trial.choices.length; i++) {
          var str = buttons[i].replace(/%choice%/g, trial.choices[i]);
          html +=
            `<div class="jspsych-audio-button-response-button" style="cursor: pointer; display: inline-block; margin:${trial.margin_vertical} ${trial.margin_horizontal}" id="jspsych-audio-button-response-button-${i}" data-choice="${i}">${str}</div>`;
        }
        html += "</div>";

        //show prompt if there is one
        if (trial.prompt !== null) {
          html += trial.prompt;
        }

        display_element.innerHTML = html;

        // start time
        startTime = performance.now();

        enable_buttons();
      }; // end setupTrial function

      // load audio file
      this.jsPsych.pluginAPI.getAudioBuffer(trial.stimulus)
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
          end_trial();
        });
    }
  }
  AudioButtonPreamblePlugin.info = info;

  return AudioButtonPreamblePlugin;

})(jsPsychModule);
