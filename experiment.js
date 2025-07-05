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


// WHICH CONDITION ARE WE RUNNING?
// "lang" is set by a "LANG" url parameter (de or sk, or en for testing)
const lang = jsPsych.data.getURLVariable('LANG') || 'en';
// we choose groupA through groupD with equal probability
const group = jsPsych.randomization.sampleWithoutReplacement(['groupA','groupB','groupC','groupD'],1)[0];
// 50% probability of native or non-native
const speaker = (jsPsych.randomization.sampleBernoulli(.5) ? 'native' : 'non-native');
console.log(`language ${lang}; speaker ${speaker}; group ${group}`);


// pick up PROLIFIC INFO
const subject_id = jsPsych.data.getURLVariable('PROLIFIC_PID') || 'LOCAL';
const study_id = jsPsych.data.getURLVariable('STUDY_ID') || 'LOCAL';
const session_id = jsPsych.data.getURLVariable('SESSION_ID') || 'LOCAL';

// set language of experiment
const S = translations[lang]; // a shorthand for selected language's strings

document.title = S.title;

// EARLY SETUP AND UTILITY FUNCTIONS
// =================================

// function to parse experimental design

var all_data=[];
var prac_data=[];

function parseData(data,language,speaker,group) {
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
        if ((line_data.group == group || line_data.group == 'practice') &&
	    line_data.speaker == speaker &&
	    line_data.audio.includes(dashlang)) {
            parsed_data.push(line_data);
//	    console.log('thisone');
	}
    }
    
    for (var i = 0; i < parsed_data.length; i++) {
	var trial=parsed_data[i];
	var target_side = (jsPsych.randomization.sampleBernoulli(0.5) ? 'R' : 'L');
	if (trial.group == 'practice') {
	    prac_data.push({
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
		"language": lang,
		"audio_duration": trial.audio_duration
	    });
	} else {
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
		"language": lang,
		"audio_duration": trial.audio_duration
	    });
	}
    }
    
}


$.ajax({
    type: "GET",
    url: './experimental_trials2.csv',
    dataType: "text",
    success: function (data) {
	console.log('SUCCESS');
        parseData(data, 'de', speaker, group);
    },
    async: false
});
console.log(prac_data);
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
    message: S.loading,
    show_detailed_errors: true
}

// NOT USED

// function to save data (works in conjunction with write_data.php)
// function saveData(name, data){
//     let xhr = new XMLHttpRequest();
//     xhr.open('POST', 'write_data.php'); // 'write_data.php' is the
// 					// path to the php file
// 					// described above.
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send(JSON.stringify({filename: name, filedata: data}));
// }

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
    check_fn: check_consent,
    record_data: false
};


const welcome = {
    type: jsPsychInstructions,
    pages: [`<h1>${S.welcome_heading_1}</h1><p>${S.welcome_text_2.replace('{short_id}', short_id)}</p>`,
	    `<h1>${S.welcome_heading_2}</h1>${S.cover_story}`,
        `<h1>${S.welcome_heading_3}</h1>${S.welcome_text_3}`
	   ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_next: S.continue,
    allow_keys: false
    // we'll record data here, so we can check whether people
    // actually read the instructions
};


/* provide a random array of choices for volume check */
const audioStim = "audio/sound_check.ogg";


const adjust_volume = {
    type: jsPsychAudioButtonResponse,
    stimulus: audioStim,
    choices: [S.continue],
    margin_vertical: "12px",
    response_ends_trial: false,
    trial_ends_after_audio: true,
    response_allowed_while_playing: true,
    prompt: S.volume_adjust_prompt,
    record_data: false
}

const check_audio = {
    timeline: [adjust_volume],
    loop_function: () => {
	const last_trial_data = jsPsych.data.get().last(1).values()[0];
	if (last_trial_data.response === null) {
	    return true;
	} else {
	    return false;
	}
    },
    record_data: false
}

const audio_setup = {
    timeline: [adjust_volume,check_audio]
}

const after_instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: S.after_instructions,
    choices: [S.continue],
    record_data: false
};

///QUESTIONNAIRE

const likert_scale = [
    S.strongly_disagree,
    '','','','','','','',
    S.strongly_agree
]

var likert_qs = {
    type: jsPsychSurveyLikert,
    questions: [
	{prompt: S.q1, name: "q_natural", labels: likert_scale},
	{prompt: S.q2, name: "q_accent", labels: likert_scale},
	{prompt: S.q3, name: "q_fluent", labels: likert_scale},
	{prompt: S.q4, name: "q_interact", labels: likert_scale},
    ],
    preamble: S.q_preamble
};

const text_qs = {
    type: jsPsychSurveyText,
    preamble: S.q_preamble,
    questions: [
	{prompt: S.q5,
	 name: 'q_speaker_guess',
	},
	{prompt: S.q6,
	 name: 'q_comments',
	 rows: 4
	}
    ]
};
    
const qp1 = {
	type: jsPsychSurveyText,
	preamble: S.qpp, /* FIXME */
	questions: [
	    {prompt: S.qp1,
	     columns: 3,
	     name: 'subject_age',
	    },
	    {prompt: S.qp3,
	     name: 'subject_native_lang',
	    },
	    {prompt: S.qp4,
	     name: 'subject_other_lang',
	    },
	    {prompt: S.qp2,
	     name: 'subject_gender',
	    }
	]
};


//INITIAL CALIBRATION AND VALIDATION

var cal_img;
var CALIBRATION_MAX;

const pre_calibration = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `${S.pre_calibration.replace('{img}', lang == 'sk' ? 'img/et_sk.jpg' : 'img/et_de.jpg')}`,
    choices: [S.continue]
};

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
	if (num_trials % 3 == 2) {
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
    choices: [S.click_begin],
    record_data: false
};

const fixation = {
    type: jsPsychHtmlButtonResponse,
    stimulus: '',
    choices: ["start_trial"],
    button_html: () => `<div style="font-size:60px;">+</div>`,
    button_layout: 'flex',
    response_ends_trial: true,
    record_data: false
};


// A function to get the choices for the current trial
const getChoices = () => {
    return [jsPsych.evaluateTimelineVariable('left'), jsPsych.evaluateTimelineVariable('right')];
};

// Your custom function to generate the HTML for each button
const createButtonHtml = (choice, choice_index) => {
    let button_style = `
        position: absolute;
        width: 30vw;
        height: auto;
        top: 50%;
        transform: translate(-50%, -50%);
        background: transparent;
        border: none;
        padding: 0;
    `;
    let image_id = '';
    if (choice_index === 0) {
        button_style += ' left: 20%;';
        image_id = 'img_left';
    } else {
        button_style += ' left: 80%;';
        image_id = 'img_right';
    }
    // Note: We return a simple <img> tag. The plugin wraps it in a <button>.
    return `<img id="${image_id}" style="${button_style}" src="${choice}"  onclick="this.classList.toggle('clicked-style')"/>`;
};

// --- TRIAL A: Enforces the minimum viewing time ---
const part_a = {
    type: jsPsychAudioButtonResponse,
    stimulus: jsPsych.timelineVariable('audio'),
    choices: getChoices,
    button_html: createButtonHtml,
    prompt: "",
    
    // --- Key Logic ---
    // The trial runs for a fixed duration
    trial_duration: jsPsych.timelineVariable('audio_duration'),
    // A response does NOT end the trial early
    response_ends_trial: false,

    // Add data to identify this part of the trial
    data: {
        trial_part: 'part_a',
	stimulus_type: jsPsych.timelineVariable('stimulus_type'),
	target_side: jsPsych.timelineVariable('target_side'),
	audio: jsPsych.timelineVariable('audio'),
	condition: jsPsych.timelineVariable('condition'),
	speaker: jsPsych.timelineVariable('speaker'),
	language: lang,
	target_onset: jsPsych.timelineVariable('target_onset')
    }
};

// --- TRIAL B: Waits for a late response (if needed) ---
const part_b = {
    type: jsPsychHtmlButtonResponse, // Audio has finished, so we just need buttons
    stimulus: '', // No new stimulus needed
    choices: getChoices,
    button_html: createButtonHtml, // Re-use the same button style

    // Add data to identify this part of the trial
    data: {
        trial_part: 'part_b'
    }
};

// --- Conditional Logic for Trial B ---
// This timeline object will only run if the condition is met
const conditional_part_b = {
    timeline: [part_b],
    conditional_function: () => {
        // Get the data from the immediately preceding trial (part_a)
        const last_trial_data = jsPsych.data.get().last(1).values()[0];
        
        // If the response from part_a is null, it means the user didn't respond in time.
        // In that case, we need to run part_b to wait for their response.
        if (last_trial_data.response === null) {
            return true; // Run the part_b timeline
        } else {
            return false; // Skip the part_b timeline
        }
    }
};


const practice_timeline = {
    timeline: [fixation,part_a,conditional_part_b],
    timeline_variables: prac_data
}

const one_stimulus = {
    timeline: [part_a,conditional_part_b],
    post_trial_gap: 500,

///// EYETRACKING GOES HERE

}

const stimulus_timeline = {
    timeline: [fixation,one_stimulus,recalibration],
    timeline_variables: all_data,
    sample: {
	type: 'without-replacement',
	size: 5
    },
    on_finish: function(data) {
	num_trials++;
    }
};



// EXPERIMENT TIMELINE
// ===================

/* NB commented out for testing */

const experiment_timeline = {
    timeline: [browser_check,
	       consent,
	       preload,
	       welcome,
	       audio_setup,
	       full_screen,
	       instructions,
	       practice_timeline,
	       // pre_calibration,
	       // calibration_first_time,
	       // calibration_loop,
	       // stimulus_timeline,
	       after_instructions,
	       likert_qs,
	       text_qs,
	       qp1,
	       off_screen,
	       //debrief
	      ]
};





jsPsych.run([experiment_timeline]);
