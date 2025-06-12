const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false,
    on_finish: function() {
	//window.location = "https://app.prolific.co/submissions/complete?cc=CPHGKUII"
    }
});

// pick up PROLIFIC INFO
const subject_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
const study_id = jsPsych.data.getURLVariable('STUDY_ID');
const session_id = jsPsych.data.getURLVariable('SESSION_ID');

// set language of experiment
const lang = jsPsych.data.getURLVariable('LANG') || 'en';
const S = translations[lang]; // a shorthand for selected language's strings

document.title = S.title;


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
    url: 'consent.html',
    cont_btn: S.consent_button,
    check_fn: check_consent
};



// UTILITY FUNCTIONS AND SETUP
// ===========================

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


// These two functions are defined here so that they can be used for
// preloading audio as well as for generating stimuli

function context_stimulus(context){
    return("sound/" + context + ".wav");
}

function target_stimulus(target){
    let prefix=target.slice(0,2);
    let vot=target.slice(2,3);
    return("sound/" + prefix + "/" + prefix + "_F0_" + vot + "_VOT_" + vot + ".wav");
}


function make_preload_list(){
    let preload_list=[];
    for (c of factors.phrase) {
	let fn=context_stimulus(c);
	preload_list.push(fn);
    }
    for (t of factors.target) {
	let fn=target_stimulus(t);
	preload_list.push(fn);
    }
    return (preload_list);
}
    
// EXPERIMENTAL DESIGN
// ===================

const practice = [
	{ phrase: "FC1", target: "DT1" },
	{ phrase: "FC3", target: "DT8" }
];


// const factors = {
//     phrase: ["SC1","SC2","SC3","SC4","FC1","FC2","FC3","FC4"],
//     target: ["GK1","GK2","GK3","GK4","GK5","GK6","GK7","GK8",
//  	     "KG1","KG2","KG3","KG4","KG5","KG6","KG7","KG8"]
// }

// for testing
const factors = {
    phrase: ["DC1","FC1",],
    target: ["GK3","GK7",
	     "KG4","KG5"]
}

const fullDesign = jsPsych.randomization.factorial(factors,1);

const exp_length = fullDesign.length + practice.length + 3;

const preload = {
    type: jsPsychPreload,
    audio: () => make_preload_list(),
    error_message: `<h1>${S.preload_error_heading}</h1><p>${S.preload_error_message}</p><p>${S.preload_error_contact} <a href="mailto:Martin.Corley@ed.ac.uk">Martin.Corley@ed.ac.uk</a>.</p>`
}

const get_device = {
    type: jsPsychSurveyMultiChoice,
    preamble: S.audio_device_preamble,
    questions: [
	{
	    prompt: S.audio_device_prompt,
	    name: "audio_device",
	    options: S.audio_device_options,
	    required: true,
	    horizontal: true
	}
    ]
}

const full_screen =  {
    type: jsPsychFullscreen,
    message: S.fullscreen_message,
    fullscreen_mode: true,
    on_finish: () => {
	jsPsych.progressBar.progress = 2/exp_length;
    }
};

const off_screen = {
    type: jsPsychFullscreen,
    fullscreen_mode: false
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

const adjust_volume = {
    type: jsPsychAudioButtonResponse,
    stimulus: "sound/adjust_volume.wav",
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

const instructions1 = {
    type: jsPsychInstructions,
    pages: [
        `<h1>${S.instructions1_heading}</h1><p>${S.instructions1_text_1}</p><p>${S.instructions1_text_2}</p><div style="align: center; padding: 10px 0; font-size: 36px; color: orange">${S.instructions1_example}</div><p>${S.instructions1_text_3}</p>`,
        `<p>${S.instructions1_text_4}</p><p>${S.instructions1_text_5}</p>`,
        `<p>${S.instructions1_text_6}</p><p>${S.instructions1_text_7}</p>`
    ],
    show_clickable_nav: true
};

const instructions2 = {
    type: jsPsychInstructions,
    pages: [
        `<h2>${S.instructions2_heading}</h2><p>${S.instructions2_text_1}</p><p>${S.instructions2_text_2}</p><p>${S.instructions2_text_3}</p>`
    ],
    show_clickable_nav: true
};

const instructions3 = {
    type: jsPsychInstructions,
    pages: [
        `<h2>${S.instructions3_heading}</h2><p>${S.instructions3_text_1}</p><p>${S.instructions3_text_2}</p>`
    ],
    show_clickable_nav: true
};

const qp1 = {
    type: jsPsychSurveyText,
    preamble: S.questionnaire_preamble,
    questions: [
        { prompt: S.q_age, columns: 3, required: true, name: 'subject_age' },
        { prompt: S.q_country, required: true, name: 'subject_country' },
        { prompt: S.q_native_lang, required: true, name: 'subject_native_lang' },
        { prompt: S.q_other_lang, name: 'subject_other_lang' },
        { prompt: S.q_gender, name: 'subject_gender' }
    ]
};


const context_audio = {
    type: jsPsychAudioKeyboardResponse,
    stimulus: () => context_stimulus(jsPsych.timelineVariable('phrase',true)),
    choices: "NO_KEYS",
    trial_ends_after_audio: true,
}

const stimulus_audio = {
    type: jsPsychAudioButtonResponse,
    stimulus: () => target_stimulus(jsPsych.timelineVariable('target',true)),
    choices: () => {
	let target=jsPsych.timelineVariable('target',true);
	let prefix=target.slice(0,2);
	var choices;
	if (prefix === 'GK') {
	    choices=['GIFT','KIFT'];
	} else if (prefix === 'KG') {
	    choices=['GISS','KISS'];
	} else {
	    choices=['TEST','DEST'];
	}
	return(choices);
    },
    on_finish: () => {
	jsPsych.progressBar.progress = jsPsych.progressBar.progress + 1/exp_length;
    }
}

const prac_trials = {
    timeline: [context_audio, stimulus_audio],
    timeline_variables: practice
}   


const exp_trials = {
    timeline: [context_audio, stimulus_audio],
    timeline_variables: fullDesign
}

const save_data = {
    type: jsPsychCallFunction,
    func: function()
    {
	saveData("DATA_".concat(subject_id),jsPsych.data.get().csv())
    }
}

const debrief = {
    type: jsPsychHtmlButtonResponse,
    choices: [S.debrief_button],
    button_html: `<button style="display: inline-block; padding: 6px 12px; margin: 0px; font-weight: 400; font-family: 'Open Sans', 'Arial', sans-serif; cursor: pointer; line-height: 1.4; text-align: center; white-space: nowrap; vertical-align: middle; background-image: none; border: 1px solid transparent; border-radius: 4px; background-color:orange; color:white; font-size:24px">%choice%</button>`,
    stimulus: `<h2>${S.debrief_heading}</h2><p>${S.debrief_text_1}</p><p>${S.debrief_text_2}</p><p>${S.debrief_text_3}</p><p>${S.debrief_text_4} <a href="mailto:Martin.Corley@ed.ac.uk?subject=${S.contact_subject_line} ${short_id}">Martin Corley.</a></p>`,
    on_start: () => {
        jsPsych.progressBar.progress = 1;
    }
};

// The main experiment timeline
const experiment_timeline = {
    timeline: [preload,welcome, check_audio, get_device, full_screen, instructions1,prac_trials,instructions2,exp_trials,instructions3,qp1,save_data,off_screen,debrief]
}

  
jsPsych.run([experiment_timeline]);
