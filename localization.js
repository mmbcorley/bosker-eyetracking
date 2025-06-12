/**
 * Localization file for the experiment.
 *
 * Contains all user-facing strings in different languages.
 * To add a new language, copy the 'en' object, change its key to the new language code (e.g., 'es' for Spanish),
 * and translate all the string values.
 */
const translations = {
    // English translations
    en: {
	// Title of the page
	title: "Recognising Words",

	// Browser check messages
	browser_check_chrome: "<p>You must use Chrome as your browser to complete this experiment.</p>",
	browser_check_webcam: "<p>You need a webcam to complete this experiment.</p>",
	browser_check_audio: "<p>Your browser must be able to play audio to complete this experiment.</p>",
	
	// Consent check message
	consent_check_alert: "If you wish to participate, you must check the box next to the statement 'I agree to participate in this study.'",
	consent_button: "start",

	// Preload error message
	preload_error_heading: "Error",
	preload_error_message: "Can't find the resources for this experiment.",
	preload_error_contact: "Please report this error to",

	// Audio device question
	audio_device_preamble: `<p>Thanks for pressing "Q".</p><p>One quick question which may help us analyse the data:</p>`,
	audio_device_prompt: "How are you listening to audio?",
	audio_device_options: ['Headphones', 'Earbuds', 'Speakers'],

	// Fullscreen message
	fullscreen_message: `<p>Thank you.</p><p>We will now switch to fullscreen mode, after which you will be able to read detailed instructions for the experiment.</p>`,

	// Welcome instructions
	welcome_heading_1: "Important",
	welcome_text_1: "To claim credit for this experiment, click on the <span style=\"color:orange\">orange button</span> on the final screen.",
	welcome_text_2: "Please note down the ID <strong>{short_id}</strong> which you can use to correspond with us about the experiment",
	welcome_heading_2: "Welcome",
	welcome_text_3: `<p>This is an eye tracking experiment.</p>
                         <p>To help us get good quality data, we'd appreciate it if you could ensure that you are free from distractions for the next 15 minutes, that you are sitting comfortably, and that your face is brightly and evenly lit (for example, by an overhead light).</p>
                        <p>&nbsp;</p>
                        <img height="180px" width="1000px" src="img/instruct1.png"><br/>
                        <p>&nbsp;</p>
                        <p>First, we will ask you a few short questions, and set up your audio and webcam.</p>
                        <p>Then we will <em>calibrate</em> your eye movements, teaching our software to predict where on the screen you are looking.</p>`,
	welcome_text_4: "<p>On the following page we will check that you can hear the audio for this experiment clearly.</p><p>Please follow the spoken instructions that you will hear to continue.</p>",

	// Volume adjustment
	volume_adjust_prompt: "please adjust your volume and follow the audio instruction",

	// Head positioning
	position_head_instructions: `<p>(The video feed may take a few seconds to appear)</p>
            <p>Position your head so that the webcam has a good view of your eyes.<br/>Adjust your seating so that it is comfortable to maintain this position.</p>
            <p>Ensure that your face is well-lit (perhaps from above).</p>
            <p>Centre your face in the box and look directly towards the camera.</p>
            <p>When you can comfortably keep your face is centred in the box and the box is green, you can click to continue.</p>`,

	
	// Instructions 1
	instructions1_heading: "Instructions",
	instructions1_text_1: "This is a very simple experiment:  It involves listening to some words, and telling us what you hear.",
	instructions1_text_2: "You might hear something like",
	instructions1_example: "the next word is dest",
	instructions1_text_3: "and then get asked whether you heard 'DEST' or 'TEST'",
	instructions1_text_4: "You'll see two buttons; just click on what you think you heard.",
	instructions1_text_5: "We're not trying to trick you, so if you're not sure, give it your best guess.",
	instructions1_text_6: "We'll start with a practice just so you know how everything works.",
	instructions1_text_7: "Click 'Next' when you're ready to listen to your first word.",
	
	// Instructions 2 (End of Practice)
	instructions2_heading: "End of Practice",
	instructions2_text_1: "Simple, eh? Now you know how everything works, we'll rattle through the experiment.",
	instructions2_text_2: "Remember: We're not trying to trick you!",
	instructions2_text_3: "There are quite a few words to listen to (we need them for the data analysis) so please stick with it.",

	// Instructions 3 (Nearly Finished)
	instructions3_heading: "Nearly Finished",
	instructions3_text_1: "That's the main part of the experiment finished.",
	instructions3_text_2: "Next, we'd like you to answer a couple of questions about yourself.",

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
