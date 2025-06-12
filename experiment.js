// TEMPORARY
const exp_length = 100;

const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false,
    extensions: [
          {type: jsPsychExtensionWebgazer}
    ],
    on_finish: function() {
	//window.location = "https://app.prolific.co/submissions/complete?cc=CPHGKUII"
    },
    override_safe_mode: true
});

// pick up PROLIFIC INFO
const subject_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
const study_id = jsPsych.data.getURLVariable('STUDY_ID');
const session_id = jsPsych.data.getURLVariable('SESSION_ID');

// set language of experiment
const lang = jsPsych.data.getURLVariable('LANG') || 'en';
const S = translations[lang]; // a shorthand for selected language's strings

document.title = S.title;

// EARLY SETUP AND UTILITY FUNCTIONS
// =================================

// function to save data (works in conjunction with write_data.php)
function saveData(name, data){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'write_data.php'); // 'write_data.php' is the
					// path to the php file
					// described above.
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({filename: name, filedata: data}));
}

// set up random ppt ID (4 char)
const short_id = jsPsych.randomization.randomID(4);

// add the ID variables to the dataset
jsPsych.data.addProperties({subject: subject_id,
			    session_id: session_id,
			    study_id: study_id,
			    shortID: short_id,
			    language: lang
			   });

// switch to fullscreen
const full_screen =  {
    type: jsPsychFullscreen,
    message: S.fullscreen_message,
    fullscreen_mode: true,
    on_finish: () => {
	jsPsych.progressBar.progress = 2/exp_length;
    }
};

// switch fullscreen off
const off_screen = {
    type: jsPsychFullscreen,
    fullscreen_mode: false
};

//Define browser check trial
var browser_check = {
    type: jsPsychBrowserCheck,
    inclusion_function: (data) => {
	return data.browser == 'chrome'
	    && data.webcam === true
	&& data.webaudio === true
    },
    exclusion_message: (data) => {
	if (data.browser !== 'chrome') {
	    return S.browser_check_chrome
	} else if (!data.webcam) {
	    return S.browser_check_webcam
	} else if (!data.webaudio) {
	    return S.browser_check_audio
	}
    }
};


function addLang(filename, lang) {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1 || lastDotIndex === 0) {
    return `${filename}_${lang}`;
  }

  const baseName = filename.substring(0, lastDotIndex);
  const extension = filename.substring(lastDotIndex);
  return `${baseName}_${lang}${extension}`;
}

// CONSENT
// =======

// consent form (uses approach on
// https://www.jspsych.org/plugins/jspsych-external-html/)
const check_consent = function(elem) {
    if (document.getElementById('consent_checkbox').checked) {
	return true;
    } else {
	alert(S.consent_check_alert);
	return false;
    }
    return false;
};

const consent = {
    type: jsPsychExternalHtml,
    url: addLang('consent.html',lang),
    cont_btn: S.consent_button,
    check_fn: check_consent
};


const welcome = {
    type: jsPsychInstructions,
    pages: [`<h1>${S.welcome_heading_1}</h1><p>${S.welcome_text_1}</p><p>${S.welcome_text_2.replace('{short_id}', short_id)}</p>`,
        `<h1>${S.welcome_heading_2}</h1>${S.welcome_text_3}`,
        `<p>${S.welcome_text_4}</p>`
	   ],
    show_clickable_nav: true,
    on_start: () => {
	jsPsych.progressBar.progress = 0;
    }
}


/* provide a random array of choices for volume check */
const volumeChoices = jsPsych.randomization.repeat(['T','H','X','Q','P','S','W','M'],1);
const volumeIndex = volumeChoices.findIndex(letter => letter === 'Q');
const audioStim = addLang("audio/adjust_volume.wav",lang);



const adjust_volume = {
    type: jsPsychAudioButtonResponse,
    stimulus: audioStim,
    choices: volumeChoices,
    margin_vertical: "12px",
    response_ends_trial: true,
    trial_ends_after_audio: true,
    response_allowed_while_playing: true,
    prompt: S.volume_adjust_prompt
}

const check_audio = {
    timeline: [adjust_volume],
    loop_function: function(data){
	if (data.values()[0].response==volumeIndex){
	    
	    return false;
	} else {
	    return true;
	}
    }
}

// NB., might be something wrong with looping above.


//Define head positioning trial
var position_head = {
    type: jsPsychWebgazerInitCamera,
    instructions: S.position_head_instructions
};


//INITIAL CALIBRATION AND VALIDATION

//Define component trials to the initial c/v procedure
var calibration_instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
            <p>Great! Now the eye tracker will be calibrated to translate the image of your eyes from the webcam to a location on your screen.</p>
            <p>To do this, you need to click a series of dots.</p>
            <p>Keep your head still, and click on each dot as it appears. Look at the dot as you click it.</p>
            `,
    choices: ['Click to begin'],
    post_trial_gap: 1000
};
timeline.push(calibration_instructions);

var calibration = {
    type: jsPsychWebgazerCalibrate,
    calibration_mode: 'click',
    //calibration_mode: 'view',
    point_size: 30,
    calibration_points: [[10, 10], [10, 50], [10, 90], [50, 10], [50, 50],
			 [50, 90], [90, 10], [90, 50], [90, 90], [30, 70],
			 [70, 30], [50, 30], [30, 50], [70, 50], [50, 70]],
    repetitions_per_point: 1,
    randomize_calibration_order: true,
};

var validation_instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
            <p>Now we need to check how accurate the eye tracking is. </p>
            <p>Keep your head still, and move your eyes to focus on each dot as it appears.</p>
            <p>You do not need to click on the dots. Just move your eyes to look at the dots.</p>
            `,
    choices: ['Click to begin'],
    post_trial_gap: 500
};

var validation = {
    type: jsPsychWebgazerValidate,
    //validation_points: [[-400,0], [400,0]], //if center-offset-pixels is used to set point coordinates
    validation_points: [[20, 50], [80, 50]], //if percent of screen w/h is used to set point coordinates
    point_size: 30,
    //validation_point_coordinates: 'center-offset-pixels',
    validation_point_coordinates: 'percent',
    time_to_saccade: 500, //1000 is the default value; change?
    validation_duration: 3000,
    show_validation_data: true, //set false for the actual experiment run?
    on_finish: function (data) {
        if (data.samples_per_sec < 5) {
            data.calibration_quality = "Bad";
        } else if (data.percent_in_roi[0] < 50 || data.percent_in_roi[1] < 50) {
            data.calibration_quality = "Bad";
        } else {
            data.calibration_quality = "Sufficient";
        };
    }
};

const candv = {
    timeline: [calibration_instructions,
	       calibration,
	       validation_instructions,
	       validation]
}


// EXPERIMENT TIMELINE
// ===================

const experiment_timeline = {
    timeline: [browser_check,
	        consent,
	        welcome,
	       //check_audio,
	       fullscreen,
	       position_head,
	       candv
	      ]
}





jsPsych.run([experiment_timeline]);
