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

	vision: `I have <b>normal vision</b> or <b>corrected to normal</b> vision (e.g., with glasses or contact lenses).`,
	language: `Do you have any language or hearing disorder?`,
	yes: `yes`,
	no: `no`,
	
	
	// Browser check messages
	browser_check_chrome: "<p>You must use Chrome as your browser to complete this experiment.</p>",
	browser_check_webcam: "<p>You need a webcam to complete this experiment.</p>",
	browser_check_audio: "<p>Your browser must be able to play audio to complete this experiment.</p>",
	
	// Consent check message
	consent_check_alert: "If you wish to participate, you must check the box next to the statement 'I agree to participate in this study.'",
	consent_button: "start",
	
	// Fullscreen message
	fullscreen_message: `<p>We will now switch to fullscreen mode, after which you will be able to read detailed instructions for the experiment.</p>`,

	// Welcome instructions
	welcome_heading_1: "Important",
	welcome_text_2: "Please note down the ID <strong>{short_id}</strong> which you can use to correspond with us about the experiment",
	welcome_heading_2: "Welcome",
        cover_story: `<p>The aim of this study is to test the extent to which you can correctly follow up instructions from different kinds of speakers. We made recordings of 20 speakers including both native and non-native LANG speakers. That is, we recorded people who learned LANG as their first language after birth and people who acquired LANG later in life as a foreign language. These speakers were presented with pictures just like the ones you are about to see and engaged in a conversational task. The speakers' task was to give instructions to their conversational partner to click on one of the two objects on the screen.</p>
<p>In this experiment, you will be listening to one of the native or non-native LANG speakers. Your task is to listen to the speaker and follow the instructions they provide by clicking on the object that they will mention. During this task, we will also be recording your eye movements, using your webcam.</p>`,


	welcome_heading_3: "Setup",
	welcome_text_3: `<p>This is an eye tracking experiment.</p>
                         <p>To help us get good quality data, we'd appreciate it if you could ensure that you are free from distractions for the next 15 minutes.</p>
                        <p>First, we will check your audio, and show you how the experiment works..</p>
                        <p>Then we will <em>calibrate</em> your eye movements, teaching our software to predict where on the screen you are looking.</p>`,

	// Volume adjustment
	volume_adjust_prompt: "please adjust your volume to a comfortable level, before continuing",

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
            <img src="{img}" align="center" width="60%">
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
<p>OK, that's the best we can do. The experiment will now continue as before.<br/>Click on the plus to start each trial.</p>`,
	validation_feedback_goodcal: `<p>Success! The experiment will now continue as before.</p>
                                      <p>Click on the plus to start each trial.</p>`,
	
	// Instructions
	instructions: `<p style="text-align: center;"><b>INSTRUCTIONS</b></p>
            <p>In each trial in this experiment, you will first see a plus in the center of the screen. <br/><b>Click on the plus to continue.</b><br/>You will see two pictures, and hear a sentence.<br><b>Click on the picture that best matches that sentence.</b></p>
            <p>You can blink normally, but try not to move your head!</p>
            <p>&nbsp;</p>
            <p><b>Ready?</b></p>`,

	after_instructions: `<p>You've now finished the eyetracking part of the experiment. Thank you, and relax!</p>
          <p>We have a couple of questions for you to finish up with.</p>`,


	strongly_agree: 'strongly agree',
	strongly_disagree: 'strongly disagree',

	q_preamble: "<h3>About the person you just heard in the experiment</h3>",

	q1: 'This person sounded natural',
	q2: 'This person had an accent',
	q3: 'This person sounded fluent',
	q4: 'In daily life, I often interact with non-native speakers of LANG (i.e., with speakers who leanred LANG as a foreign language',

	q5: 'Can you guess the native language of the speaker you just heard (i.e., what is the language they learnt first?)',
	q6: 'Is there anything else you noticed about the person you listened to, or that you would like to tell us about the experiment in general?',

	qpp: '<h3>About You</h3>',
	qp1: 'What is your age in years?',
	qp2: 'What is your gender (e.g., male, female, nonbinary)?',
	qp3: 'What is/are the languages you first spoke?',
	qp4: 'Please list any other languages you speak fluently',


	debrief: `<p><b>Thank you for your participation in our study.</b></p>
<p>This study investigates how listeners process speech disfluencies, like "uh" or pauses, from native and non-native speakers. Previous research shows that when a native speaker hesitates, listeners often expect them to say a less common word. This effect, however, vanishes when listening to a non-native speaker.</p>

<p>Our goal was to see if these findings hold true for Slovak and German listeners. While you were told you would hear one of 20 different speakers, you actually listened to one of only two speakers: one native and one non-native. We tracked your eye movements to see how you anticipated words when hearing disfluent speech. By comparing the results from Slovakia and Germany—countries with different levels of exposure to non-native speakers—we can explore how our everyday interactions shape language processing.</p>

<p>All data we have collected is anonymous and cannot be traced back to you. If you are happy to proceed, please click the "SUBMIT RESPONSES" button below. If you wish to withdraw, you can simply close your browser, and your data will be deleted. Should you have any questions, please contact Haerim Lee (<a href="mailto:h.lee-49@sms.ed.ac.uk">h.lee-49@sms.ed.ac.uk</a>), Júlia Stasová (<a href="mailto:j.stasova@sms.ed.ac.uk">j.stasova@sms.ed.ac.uk</a>), or Professor Martin Corley (<a href="mailto:martin.corley@ed.ac.uk">martin.corley@ed.ac.uk</a>).</p>`,

	end1: `CLICK HERE TO SUBMIT DATA AND END EXPERIMENT`,
	end2: `CLICK TO SUBMIT DATA AND RETURN TO PROLIFIC` 

    },
    
    // German translations
    de: {
        // Title of the page
        title: "Eye-tracking Sprachstudie",

        // generic buttons
        continue: "Weiter",
        click_begin: "Klicken Sie, um zu beginnen",

        loading: `<p>Das Experiment wird geladen...</p>`,

        // Browser check messages
        browser_check_chrome: "<p>Sie müssen Chrome als Ihren Browser verwenden, um dieses Experiment durchzuführen.</p>",
        browser_check_webcam: "<p>Sie benötigen eine Webcam, um dieses Experiment durchzuführen.</p>",
        browser_check_audio: "<p>Ihr Browser muss Audio abspielen können, um dieses Experiment durchzuführen.</p>",

        // Consent check message
        consent_check_alert: "Wenn Sie teilnehmen möchten, müssen Sie das Kästchen neben der Aussage 'Ich stimme der Teilnahme an dieser Studie zu' ankreuzen.",
        consent_button: "Starten",

	vision: `Ich habe <b>normale Sehkraft</b> oder <b>normal korrigierte Sehkraft</b> (z.B. mit einer Brille oder Kontraktlinsen).`,
	language: `Haben Sie eine Sprach- oder Hörstörung?`,
	yes: `Ja`,
	no: `Nein`,


        // Fullscreen message
        fullscreen_message: `<p>Wir werden nun ins Vollbildmodus wechseln, danach können Sie die detaillierten Anweisungen für das Experiment lesen.</p>`,

        // Welcome instructions
        welcome_heading_1: "Wichtig",
        welcome_text_2: "Bitte notieren Sie sich Ihre anonyme ID <strong>{short_id}</strong>, womit Sie mit uns über das Experiment korrespondieren können",
        welcome_heading_2: "Willkommen",
        cover_story: `<p>Ziel dieser Studie ist es, zu untersuchen, inwieweit Anweisungen von verschiedenen Arten von Sprecher*innen korrekt befolgt werden können. Wir haben Aufnahmen von 20 Personen gemacht, darunter Deutsch muttersprachliche als auch nicht-muttersprachliche Sprecher*innen. Das heißt, dass wir Personen aufgenommen haben, die Deutsch entweder als Muttersprache, oder erst später im Leben als Fremdsprache gelernt haben. Diese Sprecher*innen sahen verschiedene Bilder, die Sie gleich auch sehen werden, und nahmen an einer Gesprächsaufgabe teil. Dessen Aufgabe war es, ihrem Gesprächspartner Anweisungen zu geben, auf eines von jeweils zwei Objekten auf dem Bildschirm zu klicken.</p>
<p>In diesem Experiment werden Sie solche Anweisungen von einem dieser muttersprachlichen oder nicht-muttersprachlichen Sprecher*innen hören. Ihre Aufgabe ist es, den Anweisungen aufmerksam zu folgen und auf das Objekt zu klicken, das erwähnt wird. Während dieser Aufgabe zeichnen wir Ihre Augenbewegungen für unsere Auswertung auf.</p>`,

        welcome_heading_3: "Eye-tracking Einrichtung",
        welcome_text_3: `<p>Dies ist ein Eye-Tracking-Experiment.</p>
                         <p>Um uns zu helfen, qualitativ hochwertige Daten zu erhalten, würden wir es begrüßen, wenn Sie sicherstellen könnten, dass Sie für die nächsten 15 Minuten frei von Ablenkungen sind.</p>
                        <p>Zuerst werden wir Ihre Tonwiedergabe überprüfen und Ihnen zeigen, wie das Experiment funktioniert.</p>
                        <p>Dann werden wir Ihre Augenbewegungen <em>kalibrieren</em>, indem wir unserer Software es beibringen, vorherzusagen, wohin Sie auf dem Bildschirm schauen.</p>`,

        // Volume adjustment
        volume_adjust_prompt: "Bitte stellen Sie Ihre Lautstärke auf ein angenehmes Niveau ein, bevor Sie fortfahren",

        calibration_first_time: `<p>Jetzt werden wir Ihre Augenbewegungen mit Ihrer Webcam kalibrieren.</p>
                                 <p>Zuerst werden wir die Webcam einrichten und Ihnen helfen, Ihren Kopf in eine gute Position zu bringen.</p>
                                 <p>Sobald wir das getan haben, werden wir Sie bitten, eine Reihe von Punkten auf dem Bildschirm anzusehen und darauf zu klicken.</p>
                                 <p>Soweit es für Sie angenehm ist, versuchen Sie bitte, Ihren Kopf während der Kalibrierung, Validierung und des Experiments ziemlich still zu halten.</p>`,

        calibration_recalibrate: `<p>Wir müssen Ihre Augenbewegungen jetzt neu kalibrieren.</p>
                                  <p>Wie zuvor werden wir die Webcam einrichten, bevor Sie auf eine Reihe von Punkten klicken.</p>`,

        // Head positioning
        position_head_instructions: `<p>(Es kann einige Sekunden dauern, bis das Video angezeigt wird)</p>
            <p>Stellen Sie sicher, dass Ihr Gesicht gut beleuchtet ist (vielleicht von oben).</p>
            <p>Zentrieren Sie Ihr Gesicht im Kasten und schauen Sie direkt in die Kamera.</p>
            <p>Positionieren Sie Ihren Kopf so, dass die Webcam eine gute Sicht auf Ihre Augen hat.<br/>
            <strong>Passen Sie Ihre Sitzposition so an, dass es bequem ist, diese Position beizubehalten.</strong></p><p>Wenn Sie Ihr Gesicht bequem im Kasten zentriert halten können und der Kasten grün ist, können Sie klicken, um fortzufahren.</p>`,

        pre_calibration: `
            <p>Großartig! Jetzt müssen wir den Eyetracker einrichten. Während des gesamten Experiments:</p>
            <img src="{img}" align="center" width="60%">
        `,
        
        // First Calibration
        calibration_instructions: `
            <p><b>Kalibrierung</b></p>
            <p>Um die Kalibrierung durchzuführen, müssen Sie auf eine Reihe von Punkten klicken.</p>
            <p>Halten Sie Ihren Kopf still und klicken Sie auf jeden Punkt, sobald er erscheint. Schauen Sie auf den Punkt, während Sie darauf klicken.</p>
            `,

        // Repeat Calibration
        repeat_calibration_instructions: `
            <p>Hmmm, die Kalibrierung war nicht sehr genau. Versuchen wir es noch einmal.</p>
            <p>Wir werden zuerst die Webcam wieder einrichten.<br/>Halten Sie dann Ihren Kopf still und klicken Sie auf jeden Punkt, sobald er erscheint. Schauen Sie auf den Punkt, während Sie darauf klicken.</p>`,

        // Validation
        validation_instructions: `
            <p>Jetzt müssen wir überprüfen, wie genau das Eye-Tracking ist.</p>
            <p>Halten Sie Ihren Kopf still und bewegen Sie nur Ihre Augen, um auf die Punkte zu schauen, sobald sie erscheinen.</p>
            <p><b>Sie müssen nicht auf die Punkte klicken.</b> Bewegen Sie einfach Ihre Augen, um auf die Punkte zu schauen.</p>
            `,

        // Validation_feedback
        validation_feedback_badcal: `
<p>OK, das ist das Beste, das wir schaffen können. Das Experiment wird nun wie zuvor fortgesetzt.<br/>Klicken Sie auf das Kreuz, um jede Versuchsrunde zu starten.</p>`,
        validation_feedback_goodcal: `<p>Erfolg! Das Experiment wird nun wie zuvor fortgesetzt.</p>
                                      <p>Klicken Sie auf das Kreuz, um jede Versuchsrunde zu starten.</p>`,
        
        // Instructions
        instructions: `<p style="text-align: center;"><b>ANWEISUNGEN</b></p>
            <p>In jeder Runde dieses Experiments sehen Sie zuerst ein Kreuz in der Mitte des Bildschirms. <br/><b>Klicken Sie auf das Kreuz, um fortzufahren.</b><br/>Sie werden zwei Bilder sehen und einen Satz hören.<br><b>Klicken Sie auf das Bild, das am besten zu diesem Satz passt.</b></p>
            <p>Sie können wie normal blinzeln, aber versuchen Sie, Ihren Kopf nicht zu bewegen!</p>
            <p>&nbsp;</p>
            <p><b>Bereit?</b></p>`,

        after_instructions: `<p>Sie haben den Eye-Tracking-Teil des Experiments nun abgeschlossen. Vielen Dank! Sie können sich jetzt entspannen.</p>
          <p>Wir haben noch ein paar Fragen zum Abschluss.</p>`,

        strongly_agree: 'stimme voll und ganz zu',
        strongly_disagree: 'stimme überhaupt nicht zu',

        q_preamble: "<h3>Über die Person, die Sie gerade im Experiment gehört haben</h3>",

        q1: 'Diese Person klang natürlich',
        q2: 'Diese Person hatte einen Akzent',
        q3: 'Diese Person klang flüssig',
        q4: 'Im Alltag interagiere ich häufig mit Personen die Deutsch als Fremdsprache gelernt haben.',

        q5: 'Können Sie erraten, was die Muttersprache der Person ist, die Sie gerade gehört haben (d.h. welche Sprache sie nach der Geburt zuerst gelernt hat)?',
        q6: 'Ist Ihnen sonst noch etwas an der Person aufgefallen, der Sie zugehört haben? Oder möchten Sie uns sonst etwas Allgemeines über das Experiment mitteilen?',

        qpp: '<h3>Über Sie</h3>',
        qp1: 'Wie alt sind Sie in Jahren?',
        qp2: 'Mit welchem Geschlecht identifizieren Sie sich (z.B. männlich, weiblich, nicht-binär, divers)?',
        qp3: 'Was ist Ihre Muttersprache?',
        qp4: 'Bitte listen Sie alle weiteren Sprachen auf, die Sie fließend sprechen',

        debrief: `<p><b>Vielen Dank für Ihre Teilnahme an unserer Studie.</b></p>
<p>Diese Studie untersucht, wie Zuhörer*innen Sprechunflüssigkeiten wie "ähm" oder Pausen von muttersprachlichen und nicht-muttersprachlichen Sprechern verarbeiten. Frühere Forschungen zeigen, dass Zuhörer, wenn ein muttersprachlicher Sprecher zögert, oft erwarten, dass er ein weniger gebräuchliches Wort sagen wird, als ein häufiger verwendetes Wort. Dieser Effekt verschwindet jedoch, wenn man einem nicht-muttersprachlichen Sprecher zuhört.</p>
<p>Unser Ziel war es zu erkunden, ob diese Ergebnisse auch für slowakische und deutsche Zuhörer gelten. Obwohl Ihnen gesagt wurde, dass Sie einen von 20 verschiedenen Sprechern hören würden, haben Sie tatsächlich nur einem von zwei Sprechern zugehört: entweder einem muttersprachlichen oder einem nicht-muttersprachlichen Sprecher. Wir haben Ihre Augenbewegungen verfolgt, um zu sehen, welche Wörter Sie bei unflüssiger Sprache erwarten würden. Durch den Vergleich der Ergebnisse aus der Slowakei und Deutschland – Ländern mit unterschiedlicher Aussetzung zu nicht-muttersprachlichen Sprecher*innen von Slowakisch oder Deutsch – können wir untersuchen, wie unsere alltäglichen Interaktionen die Sprachverarbeitung formen.</p>
<p>Alle von uns gesammelten Daten sind anonym und können nicht auf Sie zurückgeführt werden. Wenn Sie damit einverstanden sind, und fortfahren möchten, klicken Sie bitte unten auf die Schaltfläche "ANTWORTEN SENDEN". Wenn Sie Ihre Teilnahme zurückziehen möchten, können Sie einfach Ihren Browser schließen, und Ihre Daten werden gelöscht. Sollten Sie Fragen haben, kontaktieren Sie bitte Haerim Lee (<a href="mailto:h.lee-49@sms.ed.ac.uk">h.lee-49@sms.ed.ac.uk</a>), Júlia Stasová (<a href="mailto:j.stasova@sms.ed.ac.uk">j.stasova@sms.ed.ac.uk</a>) oder Prof. Martin Corley (<a href="mailto:martin.corley@ed.ac.uk">martin.corley@ed.ac.uk</a>).</p>`,

        end1: `HIER KLICKEN, UM DATEN ZU SENDEN UND DAS EXPERIMENT ZU BEENDEN`,
        end2: `KLICKEN, UM DATEN ZU SENDEN UND ZU PROLIFIC ZURÜCKZUKEHREN`
    },

    
    // Slovak translations
    sk: {
        // Title of the page
        title: "Klikanie na obrázky",

        // generic buttons
        continue: "pokračovať",
        click_begin: "kliknite a začnite",

        loading: `<p>experiment sa načítava...</p>`,

	vision: `Mám <b>normálny</b> zrak alebo <b>korigovaný</b> na normálny zrak (napr. s okuliarmi alebo kontaktnými šošovkami).`,
	language: `Máte nejakú poruchu reči alebo sluchu?`,
	yes: `áno`,
	no: `nie`,


        // Browser check messages
        browser_check_chrome: "<p>Na dokončenie tohto experimentu musíte použiť prehliadač Google Chrome.</p>",
        browser_check_webcam: "<p>Na dokončenie tohto experimentu potrebujete webkameru.</p>",
        browser_check_audio: "<p>Aby ste mohli dokončiť tento experiment, Váš prehliadač musí byť schopný prehrávať zvuk.</p>",

        // Consent check message
        consent_check_alert: "Ak sa chcete zúčastniť tejto štúdie, musíte zaškrtnúť políčko vedľa vyhlásenia 'Súhlasím s účasťou na tejto štúdii.'",
        consent_button: "štart",

        // Fullscreen message
        fullscreen_message: `<p>Teraz prepneme do režimu celej obrazovky, a potom si budete môcť prečítať podrobné inštrukcie k experimentu.</p>`,

        // Welcome instructions
        welcome_heading_1: "Dôležité",
        welcome_text_2: "Poznačte si, prosím, ID <strong>{short_id}</strong>, ktoré môžete použiť na korešpondenciu s nami ohľadom experimentu",
        welcome_heading_2: "Vitajte",
        cover_story: `<p>Cieľom tejto štúdie je zistiť, do akej miery dokážete správne nasledovať inštrukcie od rôznych typov rečníkov. Nahrali sme 20 osôb, ktoré rozprávajú slovenčinou buď ako materinským alebo ako nematerinským (cudzím) jazykom. To znamená, že sme nahrávali ľudí, ktorí sa naučili slovenčinu ako svoj prvý jazyk po narodení, a ľudí, ktorí sa naučili slovenčinu až neskôr v živote ako cudzí jazyk. Títo ľudia sa zúčastnili konverzačnej úlohy, v ktorej sme im ukázali rovnaké obrázky, aké uvidíte o chvíľu aj vy. Ich úlohou bolo dať svojmu konverzačnému partnerovi pokyn, aby klikol na jeden z dvoch objektov na obrazovke.</p>
<p>V tomto experimente budete počúvať jednu z osôb, ktorá rozpráva slovenčinou buď ako materinským alebo ako nematerinským (cudzím) jazykom. Vašou úlohou je túto osobu pozorne počúvať, nasledovať inštrukcie a kliknúť na objekt, ktorý spomenie. Počas tejto úlohy budeme zároveň zaznamenávať pohyby Vašich očí pomocou Vašej webkamery. 

</p>`,

        welcome_heading_3: "Nastavenie",
        welcome_text_3: `<p>Toto je experiment, v ktorom budeme sledovať pohyb Vašich očí.</p>
                         <p>Aby sme získali kvalitné dáta, ocenili by sme, ak by ste si na nasledujúcich 15 minút zabezpečili, že budete sedieť v tichom prostredí bez rušivých vplyvov.</p>
                        <p>Najprv skontrolujeme Váš zvuk a ukážeme Vám, ako experiment funguje.</p>
                        <p>Potom <em>skalibrujeme</em> pohyby Vašich očí, čím naučíme náš softvér predpovedať, kam sa na obrazovke pozeráte.</p>`,

        // Volume adjustment
        volume_adjust_prompt: "pred pokračovaním si, prosím, nastavte hlasitosť tak, aby ste zreteľne počuli tento zvuk",

        calibration_first_time: `<p>Teraz skalibrujeme pohyby Vašich očí pomocou Vašej webkamery.</p>
                                 <p>Najprv nastavíme webkameru a pomôžeme Vám uložiť si hlavu do správnej a pohodlnej polohy.</p>
                                 <p>Keď to urobíme, požiadame Vás, aby ste sa pozreli na sériu bodiek na obrazovke a klikli na ne.</p>
                                 <p>Pokiaľ je to pre Vás pohodlné, mali by ste sa snažiť udržať si hlavu v rovnakej polohe a príliš ňou nehýbať počas kalibrácie, validácie a experimentu.</p>`,

        calibration_recalibrate: `<p>Teraz potrebujeme prekalibrovať pohyby Vašich očí.</p>
                                  <p>Tak, ako predtým, najprv nastavíme Vašu webkameru, a potom budete klikať na sériu bodiek.</p>`,

        // Head positioning
        position_head_instructions: `<p>(Zobrazenie videa môže trvať niekoľko sekúnd)</p>
            <p>Uistite sa, že Vaša tvár je dobre osvetlená (napríklad svetlom zhora).</p>
            <p>Vycentrujte svoju tvár do rámčeku a pozerajte sa priamo do kamery.</p>
            <p>Umiestnite si hlavu tak, aby mala webkamera dobrý výhľad na Vaše oči.<br/>
            <strong>Nájdite si pohodlnú polohu na sedenie tak, aby ste v tejto polohe vydržali počas experimentu.</strong></p><p>Keď dokážete pohodlne udržať tvár vycentrovanú v rámčeku a rámček svieti na zeleno, môžete kliknúť na tlačidlo pre pokračovanie.</p>`,

        pre_calibration: `
            <p>Super! Teraz nastavíme sledovanie pohybu Vašich očí. Počas celého experimentu:</p>
            <img src="{img}" align="center" width="60%">
        `,
        
        // First Calibration
        calibration_instructions: `
            <p><b>Kalibrácia</b></p>
            <p>Pre vykonanie kalibrácie musíte kliknúť na sériu bodiek.</p>
            <p>Držte hlavu rovno a snažte sa ňou nehýbať. Kliknite na každú bodku, keď sa objaví. Pozerajte sa na bodku, keď na ňu klikáte.</p>
            `,

        // Repeat Calibration
        repeat_calibration_instructions: `
            <p>Hmm, kalibrácia nebola veľmi presná. Skúsme to znova.</p>
            <p>Najprv znova nastavíme Vašu webkameru.<br/>Potom držte hlavu nehybne a kliknite na každú bodku, keď sa objaví. Pozerajte sa na bodku, keď na ňu klikáte.</p>`,

        // Validation
        validation_instructions: `
            <p>Teraz musíme skontrolovať presnosť sledovania pohybu očí.</p>
            <p>Držte hlavu nehybne a pohybujte očami tak, aby ste zamerali pohľad na každú bodku, ktorá sa objaví.</p>
            <p><b>Nemusíte klikať na bodky.</b> Stačí, keď budete pohybovať očami a pozerať sa na ne.</p>
            `,

        // Validation_feedback
        validation_feedback_badcal: `
<p>OK, toto je to najlepšie, čo môžeme dosiahnuť. Experiment bude teraz pokračovať tak, ako predtým.<br/>Kliknite na plus pre začatie každého kola.</p>`,
        validation_feedback_goodcal: `<p>Super! Experiment bude teraz pokračovať tak, ako predtým.</p>
                                      <p>Kliknite na plus pre začatie každého kola.</p>`,
        
        // Instructions
        instructions: `<p style="text-align: center;"><b>INŠTRUKCIE</b></p>
            <p>V každom kole tohto experimentu najprv uvidíte plus v strede obrazovky. <br/><b>Kliknite na plus pre pokračovanie.</b><br/>Uvidíte dva obrázky a budete počuť vetu.<br><b>Kliknite na obrázok, ktorý najlepšie zodpovedá tejto vete.</b></p>
            <p>Môžete normálne žmurkať, ale snažte sa nehýbať hlavou!</p>
            <p>&nbsp;</p>
            <p><b>Pripravení?</b></p>`,

        after_instructions: `<p>Práve ste dokončili časť experimentu so sledovaním očí. Ďakujeme, oddýchnite si!</p>
          <p>Na záver máme pre Vás ešte zopár otázok.</p>`,

        strongly_agree: 'rozhodne súhlasím',
        strongly_disagree: 'rozhodne nesúhlasím',

        q_preamble: "<h3>O osobe, ktorú ste práve počuli v experimente</h3>",

        q1: 'Táto osoba znela prirodzene',
        q2: 'Táto osoba mala prízvuk',
        q3: 'Táto osoba znela plynulo',
        q4: 'V každodennom živote často komunikujem s osobami, ktoré rozprávajú slovenčinou ako nematerinským jazykom (t.j., s osobami, ktoré sa naučili slovenčinu ako cudzí jazyk)',

        q5: 'Viete uhádnuť, aký je materinský jazyk osoby, ktorú ste práve počuli (t.j. aký jazyk sa naučil/a ako prvý?)',
        q6: 'Všimli ste si ešte niečo iné na osobe, ktorú ste počúvali? Prípadne, chceli by ste nám povedať niečo o našom experimente vo všeobecnosti?',

        qpp: '<h3>O Vás</h3>',
        qp1: 'Aký je Váš vek (v rokoch)?',
        qp2: 'Aké je Vaše pohlavie (napr. muž, žena, nebinárna osoba)?',
        qp3: 'Aký/é je/sú Váš/Vaše materinský/é jazyk/y?',
        qp4: 'Uveďte, prosím, všetky ďalšie jazyky, ktorými hovoríte plynulo',

        debrief: `<p><b>Ďakujeme Vám za účasť na našej štúdii.</b></p>
<p>V tejto štúdii skúmame, ako poslucháči spracúvajú rečové disfluencie, napríklad „ehm“ alebo pauzy, od osôb, ktoré rozprávajú slovenčinou ako materinským a nematerinským (cudzím) jazykom. Predchádzajúci výskum ukázal, že keď osoba, ktorá rozpráva materinským jazykom zaváha a je disfluentná, poslucháči často očakávajú, že povie slovo, ktoré je v jazyku menej bežné. Tento efekt sa však stráca, keď ľudia počúvajú niekoho, kto hovorí nematerinským (cudzím) jazykom.</p>
<p>Naším cieľom bolo zistiť, či tieto zistenia platia aj pre slovenských a nemeckých poslucháčov. Hoci sme Vám na začiatku povedali, že budete počuť jednu z 20 rôznych osôb, v skutočnosti ste počúvali iba jednu z dvoch osôb: buď osobu, ktorá rozpráva slovenčinou ako materinským jazykom, alebo osobu, ktorá rozpráva slovenčinou ako nematerinským (cudzím) jazykom. Sledovali sme pohyby Vašich očí, aby sme videli, ako ste predvídali slová pri počúvaní disfluentnej reči. Porovnaním výsledkov zo Slovenska a Nemecka – krajín, ktoré sa líšia v tom, ako často ich obyvatelia interagujú s osobami, ktoré rozprávajú nematerinským jazykom  – chceme preskúmať, ako naše každodenné interakcie formujú spracovanie jazyka.</p>
<p>Všetky dáta, ktoré sme zhromaždili, sú anonymné a nemožno ich spätne vystopovať k Vašej osobe. Ak súhlasíte s pokračovaním, kliknite, prosím, na tlačidlo „ODOSLAŤ ODPOVEDE“ nižšie. Ak si želáte odstúpiť zo štúdie, môžete jednoducho zavrieť prehliadač a Vaše dáta budú vymazané. V prípade akýchkoľvek otázok sa, prosím, obráťte na Haerim Lee (<a href="mailto:h.lee-49@sms.ed.ac.uk">h.lee-49@sms.ed.ac.uk</a>), Júliu Stasovú (<a href="mailto:j.stasova@sms.ed.ac.uk">j.stasova@sms.ed.ac.uk</a>) alebo profesora Martina Corleyho (<a href="mailto:martin.corley@ed.ac.uk">martin.corley@ed.ac.uk</a>).</p>`,

        end1: `KLIKNITE SEM PRE ODOSLANIE DÁT A UKONČENIE EXPERIMENTU`,
        end2: `KLIKNITE PRE ODOSLANIE DÁT A NÁVRAT NA PROLIFIC`
    },
};
