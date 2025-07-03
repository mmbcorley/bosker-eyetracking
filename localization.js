/**
 * Localization file for the experiment.
 *
 * Contains all user-facing strings in different languages.
 * To add a new language, copy the 'en' object, change its key to the new language code (e.g., 'es' for Spanish),
 * and translate all the string values.
 */

/* The experiment can be tested at https://www.corleylab.ppls.ed.ac.uk/bosker-eyetracking/ */

const translations = {
    // English translations
    en: {
	// Title of the page
	title: "Image Clicking",

	// generic buttons
	continue: "continue",
	click_begin: "click to begin",
	
	loading: `<p>the experiment is loading...</p>`,
	
	
	// Browser check messages
	browser_check_chrome: "<p>You must use Chrome as your browser to complete this experiment.</p>",
	browser_check_webcam: "<p>You need a webcam to complete this experiment.</p>",
	browser_check_audio: "<p>Your browser must be able to play audio to complete this experiment.</p>",
	
	// Consent check message
	consent_check_alert: "If you wish to participate, you must check the box next to the statement 'I agree to participate in this study.'",
	consent_button: "start",
	
	// Audio device question
	audio_device_preamble: `<p>Thanks for pressing "Q".</p><p>One quick question which may help us analyse the data:</p>`,
	audio_device_prompt: "How are you listening to audio?",
	audio_device_options: ['Headphones', 'Earbuds', 'Speakers'],

	// Fullscreen message
	fullscreen_message: `<p>We will now switch to fullscreen mode, after which you will be able to read detailed instructions for the experiment.</p>`,

	// Welcome instructions
	welcome_heading_1: "Important",
	welcome_text_2: "Please note down the ID <strong>{short_id}</strong> which you can use to correspond with us about the experiment",
	welcome_heading_2: "Welcome",
	welcome_text_3: `<p>This is an eye tracking experiment.</p>
                         <p>To help us get good quality data, we'd appreciate it if you could ensure that you are free from distractions for the next 15 minutes.</p>
                        <p>First, we will check your audio, and show you how the experiment works..</p>
                        <p>Then we will <em>calibrate</em> your eye movements, teaching our software to predict where on the screen you are looking.</p>`,
	welcome_text_4: "<p>On the following page we will check that you can hear the audio for this experiment clearly.</p><p>Please follow the spoken instructions that you will hear to continue.</p>",

	// Volume adjustment
	volume_adjust_prompt: "please adjust your volume and follow the audio instruction",

	calibration_first_time: `<p>Now we will calibrate your eye movements, using your webcam.</p>
                                 <p>First we will set up the webcam and help you get your head into a good position.</p>
                                 <p>Once we have done that, we will ask you to look at and click on a series of dots on the screen.</p>
                                 Insofar as it is comfortable for you, you should try and keep your head fairly still during calibration, validation, and the experiment.</p>`,


	calibration_recalibrate: `<p>We need to recalibrate your eye movements now.</p>
                                  <p>As before, we will set up the webcam before you click on a series of dots.</p>`,

	// Head positioning
	position_head_instructions: `<p>(The video feed may take a few seconds to appear)</p>
            
            <p>Ensure that your face is well-lit (perhaps from above).</p>
            <p>Centre your face in the box and look directly towards the camera.</p>
            <p>Position your head so that the webcam has a good view of your eyes.<br/>
            <strong>Adjust your seating so that it is comfortable to maintain this position.</strong></p><p>When you can comfortably keep your face centred in the box and the box is green, you can click to continue.</p>`,

	pre_calibration: `
            <p>Great! Now we need to set the eytracker up.  Throughout the experiment:</p>
            <img align="center" width=90vw src={img}>
        `,
            

	
	// First Calibration
	calibration_instructions: `
            <p><b>Calibration</b></p>
            <p>To do the calibration, you need to click a series of dots.</p>
            <p>Keep your head still, and click on each dot as it appears. Look at the dot as you click it.</p>
            `,

	// Repeat Calibration
	repeat_calibration_instructions: `
            <p>Hmmm, the calibration wasn't very accurate.  Let's try again.</p>
            <p>We'll set up the webcam again first.<br/>Then keep your head still, and click on each dot as it appears. Look at the dot as you click it.</p>`,

	// Validation
	validation_instructions: `
            <p>Now we need to check how accurate the eye tracking is. </p>
            <p>Keep your head still, and move your eyes to focus on each dot as it appears.</p>
            <p><b>You do not need to click on the dots.</b> Just move your eyes to look at the dots.</p>
            `,

	// Validation_feedback
	validation_feedback_badcal: `
<p>Unfortunately we didn't get a great calibration.<br/>Let's press on anyway.</p>`,
	validation_feedback_goodcal: `<p>Success!</p>`,
	
	// Instructions
	instructions: `<p style="text-align: center;"><b>INSTRUCTIONS</b></p>
            <p>In each trial in this experiment, you will first see a plus in the center of the screen. <br/><b>Click on the plus to continue.</b><br/>You will see two pictures, and hear a sentence.<br><b>Click on the picture that best matches that sentence.</b></p>
            <p>You can blink normally, but try not to move your head!</p>
            <p>&nbsp;</p>
            <p><b>Ready?</b></p>`,

	// Questionnaire
	questionnaire_preamble: "<h2>About You</h2>",
	q_age: "What is your age in years?&nbsp;*",
	q_country: "Which country do you normally live in?&nbsp;*",
	q_native_lang: "What is/are the languages you first spoke?&nbsp;*",
	q_other_lang: "Please list any other languages you speak fluently",
	q_gender: "What is your gender (e.g., male, female, nonbinary)?",

	// Debriefing
	debrief_button: "CLICK TO RETURN TO PROLIFIC AND COMPLETE STUDY",
	debrief_heading: "The experiment has now concluded.",
	debrief_text_1: `This experiment was all about attention and speaker disfluency ("uncomfortable pauses"). We believe that when a speaker is disfluent, listeners automatically pay more attention to what they are saying (perhaps because they know something's "gone wrong"). In this experiment, that means that as a listner you should have been less likely to accept some of the carefully-manipulated words (like "giss") as a real word ("kiss") following a silence.`,
	debrief_text_2: "We'll report our findings at <a href=\"https://osf.io/rvp48/\">osf.io/rvp48/</a>.",
	debrief_text_3: "Thanks for your help! If you know anyone else who's taking part, we'd appreciate it if you didn't explain the purpose to them before they've done the experiment, as it might affect the results.",
	debrief_text_4: "If you have any questions, please contact",
	contact_subject_line: "Disfluency Experiment"
    },

    // German translations (placeholder)
    de: {
	title: "Worterkennung",
	consent_check_alert: "Wenn Sie teilnehmen möchten, müssen Sie das Kästchen neben der Aussage 'Ich stimme der Teilnahme an dieser Studie zu' ankreuzen.",
	// ... all other strings translated to German
    },

    // French translations (placeholder)
    fr: {
	title: "Reconnaissance de mots",
	consent_check_alert: "Si vous souhaitez participer, vous devez cocher la case à côté de la déclaration 'J'accepte de participer à cette étude.'",
	// ... all other strings translated to French
    },
};
