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
    instructions:
    `<p>(The video feed may take a few seconds to appear)</p>
            <p>Position your head so that the webcam has a good view of your eyes.</p>
            <p>Center your face in the box and look directly towards the camera.</p>
            <p>When your face is centered in the box and the box is green, you can click to continue.</p>`
};




// EXPERIMENT TIMELINE
// ===================

const experiment_timeline = {
    timeline: [//browser_check,
	//        consent,
	//        welcome,
	// check_audio,
    position_head]
}

jsPsych.run([experiment_timeline]);
