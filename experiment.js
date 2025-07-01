// TEMPORARY
const exp_length = 100;
var num_trials = 0;

const jsPsych = initJsPsych({
    show_progress_bar: false,
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

// function to parse experimental design

var all_data=[];

function parseData(data,language,group) {
    var parsed_data = [];
    var lines = data.split(/\r\n|\n/);
     var headings = lines[0].split(',');

    for (var i = 1; i < lines.length; i++) {
        var line_pieces = lines[i].split(',');
        if (line_pieces.length != headings.length) {
	    console.log('mismatch',line_pieces.length,headings.length,line_pieces,headings);
            break;
	}
        var line_data = {};
        for (var j = 0; j < headings.length; j++) {
            var line_col_data = line_pieces[j];
	    //console.log(line_col_data);
            //Convert the column data to integer or boolean (if possible)
            if (line_col_data != '' && !isNaN(line_col_data))
                line_col_data = parseInt(line_col_data);
            line_data[headings[j]] = line_col_data;
        }

	const dashlang='_' + language;
//	console.log(line_data.group,dashlang);
        if (line_data.group == group &&
	    line_data.audio.includes(dashlang)) {
            parsed_data.push(line_data);
//	    console.log('thisone');
	}
    }
    
    for (var i = 0; i < parsed_data.length; i++) {
	var trial=parsed_data[i];
	var target_side = (jsPsych.randomization.sampleBernoulli(0.5) ? 'R' : 'L');
	all_data.push({
	    "left": 'img/stimuli/' + ( target_side == 'L' ? trial.target_image : trial.pair_image),
	    "right": 'img/stimuli/' + ( target_side == 'R' ? trial.target_image : trial.pair_image),
	    "target_side": target_side,
	    "audio": 'audio/stimuli/' + trial.audio.replace(".wav",".ogg"),
	    "stimulus_type": trial.stimulus_type,
	    "condition": trial.condition,
	    "sentence_template": trial.sentence_template,
	    "target_onset": trial.target_onset,
	    "group": trial.group,
	    "speaker": trial.speaker,
	    "language": lang
	});
    }
    
}


//Fetch the stimuli data from the randomly selected csv file
$.ajax({
    type: "GET",
    url: './experimental_trials.csv',
    dataType: "text",
    success: function (data) {
	console.log('SUCCESS');
        parseData(data, 'sk', 'groupA');
    },
    async: false
});
console.log(all_data);

// CREATE PRELOAD LIST

var image_files = [];
for (var i = 0; i < all_data.length; i++) {
    image_files.push(all_data[i].left);
    image_files.push(all_data[i].right);
}

var audio_files = [];
for (var i = 0; i < all_data.length; i++) {
        audio_files.push(all_data[i].audio);
}

var preload = {
    type: jsPsychPreload,
    audio: audio_files,
    images: image_files,
    show_progress_bar: true,
    message: S.loading
}


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
    // on_finish: () => {
    // 	jsPsych.progressBar.progress = 2/exp_length;
    // }
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
    // on_start: () => {
    // 	jsPsych.progressBar.progress = 0;
    // }
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


//INITIAL CALIBRATION AND VALIDATION

var CALIBRATION_MAX;

//Define initial calibration instructions
const calibration_first_time = {
    type: jsPsychHtmlButtonResponse,
    stimulus: S.calibration_first_time,
    choices: [S.click_begin],
    post_trial_gap: 1000,
    on_finish: () => {
	CALIBRATION_MAX=1;
    }
};

// for recalibrations
const calibration_recalibrate = {
    type: jsPsychHtmlButtonResponse,
    stimulus: S.calibration_recalibrate,
    choices: [S.click_begin],
    post_trial_gap: 1000,
    on_finish: () => {
	CALIBRATION_MAX=2;
    }
};


//Define head positioning trial
const position_head = {
    type: jsPsychWebgazerInitCamera,
    instructions: S.position_head_instructions
};

//Define component trials to the initial c/v procedure
const calibration_instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: S.calibration_instructions,
    choices: [S.click_begin],
    post_trial_gap: 1000
};

const calibration = {
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

const validation_instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: S.validation_instructions,
    choices: [S.click_begin],
    post_trial_gap: 500
};

const validation = {
    type: jsPsychWebgazerValidate,
    //validation_points: [[-400,0], [400,0]], //if center-offset-pixels is used to set point coordinates
    validation_points: [[20, 50], [80, 50]], //if percent of screen w/h is used to set point coordinates
    point_size: 30,
    //validation_point_coordinates: 'center-offset-pixels',
    validation_point_coordinates: 'percent',
    roi_radius: 250,
    time_to_saccade: 500, //1000 is the default value; change?
    validation_duration: 3000,
    show_validation_data: true, //set false for the actual experiment run?
    on_finish: function (data) {
        if (data.samples_per_sec < 5) {
            data.calibration_quality = "BADCAL";
        } else if (data.percent_in_roi[0] < 50 || data.percent_in_roi[1] < 50) {
            data.calibration_quality = "BADCAL";
        } else {
            data.calibration_quality = "ok";
        };
    }
};

var calibration_tries = 0;

const validation_feedback = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function() {
	var quality = jsPsych.data.get().last().select('calibration_quality').values[0];
	calibration_tries++;
	console.log(quality);
	if (calibration_tries ==  CALIBRATION_MAX && quality == 'BADCAL') {
	    return S.validation_feedback_badcal;
	} else if (quality == 'BADCAL') {
	    console.log(calibration_tries);
	    return S.repeat_calibration_instructions;
	} else {
	    return S.validation_feedback_goodcal;
	}
    },
    choices: [S.continue],
    on_finish: function(data) {
	if (data.stimulus == S.validation_feedback_goodcal) {
	    data.subpar = false;
	} else {
	    data.subpar = true;
	}
    }
};

const calibration_loop = {
    timeline: [position_head,
	       calibration,
	       validation_instructions,
	       validation,
	       validation_feedback],
    on_timeline_start: () => {
	calibration_tries=0;
    },
    loop_function: function(data) {
	let recalibrate = jsPsych.data.get().last().select('subpar').values[0];
	if (recalibrate === true && calibration_tries < CALIBRATION_MAX) {
	    console.log("try recalibration");   
	    jsPsych.extensions.webgazer.resetCalibration();
	    return true;
	} else {
	    calibration_tries = 0;
	    return false;
	}
    }
}

//// --- NOT USED define a trial for failed calibration

const failed_init = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<p>Calibration Failure</p>`,
    choices: ['OK']
};

// conditionally call failed_init if calibration failed
const check_calibration = {
    timeline: [failed_init],
    conditional_function: function () {
	var data = jsPsych.data.get().last(1).values()[0];
	if (data.subpar == true) {
	    return true;
	} else {
	    return false;
	}
    }
};

//// --- NOT USED above here

const recalibration = {
    timeline: [calibration_recalibrate,calibration_loop],
    conditional_function: function () {
	if (num_trials % 13 == 12) {
	    return true;
	} else {
	    return false;
	}
    }
};


// EXPERIMENT PROPER
// =================

var instructions = {
        type: jsPsychHtmlButtonResponse,
        css_classes: ['instructions'],
        stimulus: S.instructions,
        choices: [S.click_begin]
    };

const fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: "NO_KEYS",
  trial_duration: 1000,
};

// Define the images array outside the trial object
const images = [
    'img/toothbrush.jpg',
    'img/bench.jpg'
];

const stimulus = {
    type: jsPsychAudioButtonResponse,
    stimulus: jsPsych.timelineVariable('audio'),
    
    // Use simple string identifiers for choices
    choices: () => { return [jsPsych.evaluateTimelineVariable('left'),jsPsych.evaluateTimelineVariable('right')]; },
    prompt: "",
    button_html: (choice, choice_index) => {
	console.log(choice,choice_index);
	let button_style=`
          position: absolute;
          width: 30vw;
          height: auto;
          top: 50%;
          transform: translate(-50%, -50%);
          background: transparent;
          border: none;
          padding: 0;
          `;
	if (choice_index === 0) {
	    button_style += 'left: 20%;';
	} else {
	    button_style += 'left: 80%;';
	}
	return `<img style ="${button_style}" src="${choice}" />`;
     }
//	`<img style="cursor: pointer; margin: 10px;" src="${choice}" />`
};

const stimulus_timeline = {
    timeline: [fixation,stimulus],
    timeline_variables: all_data,
    sample: {
	type: 'without-replacement',
	size: 3
    }
};



// EXPERIMENT TIMELINE
// ===================

/* NB commented out for testing */

const experiment_timeline = {
    timeline: [browser_check,
	       consent,
	       //preload,
	       //welcome,
	       //check_audio,
	       full_screen,
	       //calibration_first_time,
	       //calibration_loop,
	       instructions,
	       stimulus_timeline
	      ]
};





jsPsych.run([experiment_timeline]);
