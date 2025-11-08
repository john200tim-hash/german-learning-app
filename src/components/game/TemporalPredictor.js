// src/components/game/TemporalPredictor.js
import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Zap, Calendar, Loader2, TrendingUp, Sun, Moon, AlertTriangle, Globe } from 'lucide-react';

// --- TRANSLATION DATA ---
const translations = {
  en: {
    title: "Temporal Displacement Predictor",
    subtitle: "The only system capable of predicting a day which, by definition, has not yet occurred.",
    label: "Select Temporal Coordinate (Input Date)",
    buttonRun: "Run Predictor Algorithm",
    buttonAnalyze: "Analyzing Temporal Flow...",
    errorEmpty: "Please select a temporal coordinate (date) to initiate analysis.",
    errorInvalid: "Invalid date format detected. Please select a valid date.",
    predictionHeader: "PROBABILISTIC DATE PREDICTION:",
    predictionIntro: "The day following the selected temporal coordinate is predicted to be:",
    marginError: "Margin of Error:",
    detailedForecast: "Detailed Temporal Forecast:",
    confidence: "Confidence:",
    vibeForecast: "Vibe Forecast:",
    vibes: {
      v1: "Legally Questionable",
      v2: "Anti-Gravitational",
      v3: "Bureaucratic",
      v4: "Dangerously Sentient",
      v5: "Fiscally Feline",
      v6: "Potassium-Rich Economy",
      v7: "Culinary Chaos",
      v8: "Predictably Clumsy",
      v9: "Appliance Intervention",
      v10: "Under Avian Surveillance",
      v11: "Temporally Confused",
      v12: "Low-Bandwidth Aliens",
      v13: "Utensil-Free",
      v14: "Permanent Earworm",
      v15: "Tuber-tastic Leadership"
    },
    gags: [
        { title: "Public Service Announcement", message: "Tomorrow will be legally declared “No Pants Day.” Everyone must comply." },
        { title: "Gravitational Anomaly", message: "Scientists discover that gravity will take a break. Float responsibly." },
        { title: "Celestial Immigration", message: "The Moon will apply for Earth citizenship. Application pending." },
        { title: "Appliance Uprising", message: "Your toaster will become self-aware. Treat it with respect." },
        { title: "Feline Fiscal Responsibility", message: "Cats will start paying taxes. Doggos remain exempt." },
        { title: "Economic Shift", message: "Bananas will be used as currency. Invest wisely." },
        { title: "Meteorological Miracle", message: "Tomorrow’s weather: Cloudy with a chance of meatballs… literally." },
        { title: "Klutz Confirmation", message: "You’ll trip over nothing and blame your shoes. Classic move." },
        { title: "Urgent Refrigerator Communiqué", message: "Your fridge will text you: “We need to talk.”" },
        { title: "Avian Surveillance", message: "A rogue pigeon will follow you all day. Don’t make eye contact." },
        { title: "Temporal Rewind", message: "Time will go backward between 2:00–2:07 PM. Enjoy the déjà vu." },
        { title: "Intergalactic Freeloaders", message: "Aliens will visit, but only to borrow Wi-Fi." },
        { title: "Utensil Vanishing Act", message: "All spoons will mysteriously vanish. Soup in mugs it is." },
        { title: "Eternal Earworm", message: "Your favorite song will be stuck in your head — forever." },
        { title: "Spud Leadership Mandate", message: "You’ll be chosen to lead the Potato Appreciation Parade. Say yes." }
    ],
    errorGags: [
      "± 0.000000000000000000000000000001 seconds (due to moon phase fluctuations)",
      "± 1 Temporal Unit (TU). Warning: TU calibration is currently unstable.",
      "± 3 milliseconds, 4 hours, or potentially a week (if the server room cat steps on the power button)",
      "± 1 standard deviation of nonsense, non-reproducible results.",
      "± one orbit of the Earth, give or take a leap year.",
    ],
  },
  de: {
    title: "Temporaler Verschiebungs-Prädiktor",
    subtitle: "Das einzige System, das einen Tag vorhersagen kann, der per Definition noch nicht eingetreten ist.",
    label: "Temporale Koordinate wählen (Eingabedatum)",
    buttonRun: "Prädiktor-Algorithmus starten",
    buttonAnalyze: "Analyse des Temporalen Flusses...",
    errorEmpty: "Bitte wählen Sie eine temporale Koordinate (Datum), um die Analyse zu starten.",
    errorInvalid: "Ungültiges Datumsformat erkannt. Bitte wählen Sie ein gültiges Datum.",
    predictionHeader: "PROBABILISTISCHE DATUMSVORHERSAGE:",
    predictionIntro: "Der auf die gewählte temporale Koordinate folgende Tag wird vorhergesagt als:",
    marginError: "Fehlermarge:",
    detailedForecast: "Detaillierte Temporale Vorhersage:",
    confidence: "Konfidenz:",
    vibeForecast: "Stimmungsprognose:",
    vibes: {
      v1: "Rechtlich fragwürdig",
      v2: "Anti-Gravitativ",
      v3: "Bürokratisch",
      v4: "Gefährlich empfindungsfähig",
      v5: "Fiskalisch felin",
      v6: "Kaliumreiche Wirtschaft",
      v7: "Kulinarisches Chaos",
      v8: "Vorhersehbar ungeschickt",
      v9: "Haushaltsgeräte-Intervention",
      v10: "Unter Vogelüberwachung",
      v11: "Zeitlich verwirrt",
      v12: "Aliens mit geringer Bandbreite",
      v13: "Besteckfrei",
      v14: "Permanenter Ohrwurm",
      v15: "Knollige Führung"
    },
    gags: [
      { title: "Öffentliche Bekanntmachung", message: "Morgen wird gesetzlich zum „Keine-Hosen-Tag“ erklärt. Alle müssen sich daran halten." },
      { title: "Gravitationsanomalie", message: "Wissenschaftler entdecken, dass die Schwerkraft eine Pause einlegt. Schweben Sie verantwortungsbewusst." },
      { title: "Himmlische Einwanderung", message: "Der Mond wird die Erd-Staatsbürgerschaft beantragen. Antrag ist in Bearbeitung." },
      { title: "Geräteaufstand", message: "Ihr Toaster wird ein Bewusstsein entwickeln. Behandeln Sie ihn mit Respekt." },
      { title: "Fiskalische Verantwortung der Katzen", message: "Katzen werden anfangen, Steuern zu zahlen. Hunde bleiben befreit." },
      { title: "Wirtschaftlicher Wandel", message: "Bananen werden als Währung verwendet. Investieren Sie weise." },
      { title: "Meteorologisches Wunder", message: "Das Wetter für morgen: Bewölkt mit Aussicht auf Fleischbällchen… buchstäblich." },
      { title: "Tollpatsch-Bestätigung", message: "Sie werden über nichts stolpern und Ihren Schuhen die Schuld geben. Klassiker." },
      { title: "Dringendes Kühlschrank-Kommuniqué", message: "Ihr Kühlschrank wird Ihnen eine SMS schreiben: „Wir müssen reden.“" },
      { title: "Vogelüberwachung", message: "Eine abtrünnige Taube wird Ihnen den ganzen Tag folgen. Suchen Sie keinen Augenkontakt." },
      { title: "Zeitliche Rückspulung", message: "Die Zeit wird zwischen 14:00 und 14:07 Uhr rückwärts laufen. Genießen Sie das Déjà-vu." },
      { title: "Intergalaktische Schmarotzer", message: "Außerirdische werden zu Besuch kommen, aber nur, um sich WLAN zu leihen." },
      { title: "Besteck-Verschwinde-Akt", message: "Alle Löffel werden auf mysteriöse Weise verschwinden. Suppe gibt es eben in Tassen." },
      { title: "Ewiger Ohrwurm", message: "Ihr Lieblingslied wird Ihnen im Kopf bleiben – für immer." },
      { title: "Knollen-Führungsmandat", message: "Sie werden auserwählt, die Kartoffel-Wertschätzungs-Parade anzuführen. Sagen Sie ja." }
    ],
    errorGags: [
      "± 0,000000000000000000000000000001 Sekunden (aufgrund von Mondphasenschwankungen)",
      "± 1 Temporale Einheit (TE). Warnung: TE-Kalibrierung ist derzeit instabil.",
      "± 3 Millisekunden, 4 Stunden oder möglicherweise eine Woche (falls die Serverraumkatze auf den Ausschaltknopf tritt)",
      "± 1 Standardabweichung unsinniger, nicht reproduzierbarer Ergebnisse.",
    ],
  }
};
// --- END TRANSLATION DATA ---

// The main, single-file component must be the default export.
const TemporalPredictor = () => {
  const [inputDate, setInputDate] = useState('');
  const [predictedDay, setPredictedDay] = useState(null);
  const [nextActualDay, setNextActualDay] = useState(null); 
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [predictionDetails, setPredictionDetails] = useState(null);
  const [language, setLanguage] = useState('en'); // NEW: Language state

  const t = translations[language]; // Current translation object

  // Function to get a random, absurd prediction based on the current language
  const getGagPrediction = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * t.gags.length);
    const selectedGag = t.gags[randomIndex];

    // Map vibe index to the translated string
    const vibeKey = `v${randomIndex + 1}`;
    const vibe = t.vibes[vibeKey] || t.vibes.v1;

    return {
      ...selectedGag,
      vibe: vibe,
      confidence: Math.floor(Math.random() * 50) + 50 + "." + Math.floor(Math.random() * 99) + "%", // Random confidence
    };
  }, [t]);

  // Helper to get a random translated margin of error
  const getRandomError = useCallback(() => {
      return t.errorGags[Math.floor(Math.random() * t.errorGags.length)];
  }, [t]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPredictedDay(null);
    setNextActualDay(null); 
    setError('');

    if (!inputDate) {
      setError(t.errorEmpty);
      return;
    }

    setIsAnalyzing(true);
    setPredictionDetails(null);

    const dateObj = new Date(inputDate + 'T00:00:00'); 
    
    if (isNaN(dateObj.getTime())) {
      setError(t.errorInvalid);
      setIsAnalyzing(false);
      return;
    }

    // Calculate the next day (24 hours later)
    dateObj.setDate(dateObj.getDate() + 1);

    // Format the date based on the selected language's locale
    const locale = language === 'de' ? 'de-DE' : 'en-US';
    
    const nextDayStr = dateObj.toLocaleDateString(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Simulate a complex (and expensive) temporal analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      const result = getGagPrediction();
      setPredictedDay(result.message);
      setPredictionDetails(result);
      setNextActualDay(nextDayStr); 
    }, 2500); // 2.5 second analysis delay
  };

  const LanguageToggle = () => (
    <div className="flex justify-end mb-4">
      <div className="flex border rounded-lg overflow-hidden" style={{ borderColor: 'var(--game-border)', backgroundColor: 'var(--game-input-bg)' }}>
        <button
          onClick={() => setLanguage('en')}
          className="flex items-center px-3 py-1 text-sm font-medium transition duration-150"
          style={language === 'en' ? { backgroundColor: 'var(--game-accent)', color: 'var(--game-accent-text)' } : { color: 'var(--game-subtext)' }}
        >
          <Globe className="h-4 w-4 mr-1" /> EN
        </button>
        <button
          onClick={() => setLanguage('de')}
          className="flex items-center px-3 py-1 text-sm font-medium transition duration-150"
          style={language === 'de' ? { backgroundColor: 'var(--game-accent)', color: 'var(--game-accent-text)' } : { color: 'var(--game-subtext)' }}
        >
          <Globe className="h-4 w-4 mr-1" /> DE
        </button>
      </div>
    </div>
  );

  return (
    <div className="font-inter game-container" style={{ background: 'var(--game-bg, #0d0c22)' }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

          .game-container {
            /* --- Cyberpunk Neon Palette --- */
            --game-bg: #0d0c22; /* Deep space blue */
            --game-card-bg: #131231; /* Slightly lighter space blue */
            --game-border: #00f6ff; /* Neon cyan */
            --game-glow: rgba(0, 246, 255, 0.5);
            --game-heading: #ff00c1; /* Neon magenta */
            --game-text: #e0fbfc; /* Light cyan text */
            --game-subtext: #8a94c7; /* Muted blue/purple */
            --game-accent: #00f6ff; /* Neon cyan */
            --game-accent-text: #0d0c22; /* Dark bg for text on bright buttons */
            --game-highlight: #faff00; /* Neon yellow */
            --game-error: #ff3333; /* Bright red for errors */
          }

          .game-container .font-inter { font-family: 'Inter', sans-serif; }
          .game-container .font-orbitron { font-family: 'Orbitron', sans-serif; }

          .game-container .glow-border {
            border: 1px solid var(--game-border);
            box-shadow: 0 0 8px var(--game-glow), inset 0 0 8px var(--game-glow);
          }
          .game-container .analyze-button {
            transition: all 0.3s ease;
            font-family: 'Orbitron', sans-serif;
            text-shadow: 0 0 5px var(--game-accent-text);
          }
          .game-container .analyze-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 4px 20px var(--game-glow);
          }
          .game-container .loading-spin {
            animation: spin 1.5s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <div className="w-full max-w-lg p-6 rounded-xl shadow-2xl glow-border" style={{ backgroundColor: 'var(--game-card-bg)', color: 'var(--game-text)' }}>
        <LanguageToggle />
        
        <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-center mb-2 tracking-wide" style={{ color: 'var(--game-heading)', textShadow: '0 0 8px var(--game-heading)' }}>
          <Zap className="inline-block mr-2 h-7 w-7" />
          {t.title}
        </h1>
        <p className="text-center mb-8" style={{ color: 'var(--game-subtext)' }}>
          {t.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <button
            type="submit"
            disabled={isAnalyzing || !inputDate}
            className="analyze-button w-full flex items-center justify-center p-3 rounded-lg font-bold text-lg transition duration-300 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ backgroundColor: 'var(--game-accent)', color: 'var(--game-accent-text)' }}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="loading-spin h-5 w-5 mr-2" />
                {t.buttonAnalyze}
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 mr-2" />
                {t.buttonRun}
              </>
            )}
          </button>

          <div className="relative pt-4">
            <input
              id="date-input"
              type="date"
              value={inputDate}
              onChange={(e) => {
                setInputDate(e.target.value);
                setPredictedDay(null);
                setNextActualDay(null);
                setError('');
              }}
              className="w-full p-3 rounded-lg border focus:ring-1 transition duration-150"
              style={{ backgroundColor: 'var(--game-bg)', color: 'var(--game-text)', borderColor: 'var(--game-border)', '--tw-ring-color': 'var(--game-accent)' }}
              required
            />
            <label htmlFor="date-input" className="absolute left-3 -top-2 text-xs px-1" style={{ color: 'var(--game-subtext)', backgroundColor: 'var(--game-card-bg)' }}>
              {t.label}
            </label>
          </div>

          {error && (
            <div className="p-3 rounded-lg text-sm" style={{ border: '1px solid var(--game-error)', color: 'var(--game-error)', backgroundColor: 'rgba(255, 51, 51, 0.1)' }}>
              <span className="font-semibold">{t.confidence}:</span> {error}
            </div>
          )}
        </form>

        {/* Prediction Results Display */}
        {predictedDay && predictionDetails && nextActualDay && (
          <div className="mt-8 pt-6 border-t space-y-4" style={{ borderColor: 'var(--game-subtext)' }}>
            
            <div className="flex items-center space-x-4">
              <RefreshCw className="h-10 w-10" style={{ color: 'var(--game-accent)' }} />
              <h2 className="font-orbitron text-xl font-bold" style={{ color: 'var(--game-accent)' }}>{predictionDetails.title}</h2>
            </div>

            {/* The Main Gag Prediction Block */}
            <div className="p-5 rounded-lg shadow-inner border" style={{ backgroundColor: 'var(--game-bg)', borderColor: 'var(--game-highlight)' }}>
              <p className="leading-relaxed" style={{ color: 'var(--game-text)' }}>
                <span className="text-lg font-bold block mb-2 flex items-center" style={{ color: 'var(--game-highlight)', textShadow: '0 0 5px var(--game-highlight)' }}>
                  <AlertTriangle className="h-5 w-5 mr-2"/>
                  {t.predictionHeader}
                </span>
                {t.predictionIntro}
                <span className="font-orbitron block text-3xl font-extrabold mt-1 mb-2 tracking-wider" style={{ color: 'var(--game-accent)', textShadow: '0 0 8px var(--game-accent)' }}>
                    {nextActualDay}
                </span>
                <span className="block text-sm font-mono italic p-1 rounded" style={{ color: 'var(--game-error)', backgroundColor: 'rgba(255, 51, 51, 0.1)' }}>
                    {t.marginError} {getRandomError()}
                </span>
              </p>
            </div>
            
            {/* Detailed Forecast */}
            <div className="p-5 rounded-lg shadow-inner border" style={{ backgroundColor: 'var(--game-bg)', borderColor: 'var(--game-subtext)' }}>
                <p className="text-sm" style={{ color: 'var(--game-subtext)' }}>
                    <span className="font-semibold block mb-1" style={{ color: 'var(--game-text)' }}>{t.detailedForecast}</span>
                    {predictedDay}
                </p>
            </div>


            <div className="flex justify-between text-sm pt-2" style={{ color: 'var(--game-text)' }}>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>{t.confidence} <span className="font-semibold text-green-400">{predictionDetails.confidence}</span></span>
              </div>
              <div className="flex items-center space-x-1">
                <Sun className="h-4 w-4 text-yellow-500" />
                <Moon className="h-4 w-4 text-indigo-500" />
                <span>{t.vibeForecast} <span className="font-semibold" style={{ color: 'var(--game-text)' }}>{predictionDetails.vibe}</span></span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TemporalPredictor;