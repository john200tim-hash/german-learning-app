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
      v1: "Slightly Anxious, Highly Caffeinated",
      v2: "Tues-Day Adjacent",
      v3: "Unquestionably Accurate",
      v4: "Low Signal-to-Noise Ratio"
    },
    gags: [
      {
        title: "Temporal Flow Analysis Complete: 98% Certainty",
        message: "The next day will feature a slight increase in existential dread, offset by a surprisingly good cup of coffee. Expect mild confusion around 3 PM.",
      },
      {
        title: "Chronological Override Detected: 65% Probability",
        message: "Prediction suggests the next day will feel like a Tuesday, regardless of what the calendar says. Time dilation is confirmed, but only on your side.",
      },
      {
        title: "Macro-Temporal Consensus Reached: 100% Guaranteed",
        message: "The predictive model confirms that the day following the input date will be an entirely new, different day. Further analysis is redundant.",
      },
      {
        title: "Predictive Model Overheating: Data Fragmented",
        message: "Due to high temporal entropy, the next day is predicted to be comprised entirely of loading screens and awkward small talk. Recommend immediate re-calibration.",
      },
    ],
    errorGags: [
      "± 0.000000000000000000000000000001 seconds (due to moon phase fluctuations)",
      "± 1 Temporal Unit (TU). Warning: TU calibration is currently unstable.",
      "± 3 milliseconds, 4 hours, or potentially a week (if the server room cat steps on the power button)",
      "± 1 standard deviation of nonsense, non-reproducible results.",
      "± one orbit of the Earth, give or take a leap year.",
      "± 100% chance the prediction is exactly 24 hours off.",
      "± the estimated time it takes for a photon to regret its life choices.",
      "± 1 degree Celsius fluctuation in the core processing unit's feelings."
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
      v1: "Leicht ängstlich, stark koffeiniert",
      v2: "Dienstags-Angrenzend",
      v3: "Unzweifelhaft Präzise",
      v4: "Niedriges Signal-Rausch-Verhältnis"
    },
    gags: [
      {
        title: "Analyse des Temporalen Flusses abgeschlossen: 98% Sicherheit",
        message: "Der nächste Tag wird eine leichte Zunahme an existenziellem Schrecken aufweisen, ausgeglichen durch eine überraschend gute Tasse Kaffee. Erwarten Sie leichte Verwirrung gegen 15 Uhr.",
      },
      {
        title: "Chronologische Übersteuerung erkannt: 65% Wahrscheinlichkeit",
        message: "Die Vorhersage legt nahe, dass sich der nächste Tag wie ein Dienstag anfühlen wird, unabhängig vom Kalender. Die Zeitdilatation ist bestätigt, aber nur auf Ihrer Seite.",
      },
      {
        title: "Makro-Temporaler Konsens erreicht: 100% garantiert",
        message: "Das Vorhersagemodell bestätigt, dass der Tag nach dem Eingabedatum ein völlig neuer, anderer Tag sein wird. Weitere Analysen sind überflüssig.",
      },
      {
        title: "Vorhersagemodell überhitzt: Daten fragmentiert",
        message: "Aufgrund hoher temporaler Entropie wird der nächste Tag voraussichtlich vollständig aus Ladebildschirmen und unbeholfener Konversation bestehen. Sofortige Neukalibrierung empfohlen.",
      },
    ],
    errorGags: [
      "± 0,000000000000000000000000000001 Sekunden (aufgrund von Mondphasenschwankungen)",
      "± 1 Temporale Einheit (TE). Warnung: TE-Kalibrierung ist derzeit instabil.",
      "± 3 Millisekunden, 4 Stunden oder möglicherweise eine Woche (falls die Serverraumkatze auf den Ausschaltknopf tritt)",
      "± 1 Standardabweichung unsinniger, nicht reproduzierbarer Ergebnisse.",
      "± eine Erdumrundung, plus/minus ein Schaltjahr.",
      "± 100%ige Chance, dass die Vorhersage genau 24 Stunden daneben liegt.",
      "± die geschätzte Zeit, die ein Photon braucht, um seine Lebensentscheidungen zu bereuen.",
      "± 1 Grad Celsius Schwankung in den Gefühlen der Kernprozessoreinheit."
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
      <div className="flex border border-gray-600 rounded-lg overflow-hidden bg-gray-700">
        <button
          onClick={() => setLanguage('en')}
          className={`flex items-center px-3 py-1 text-sm font-medium transition duration-150 ${
            language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-600'
          }`}
        >
          <Globe className="h-4 w-4 mr-1" /> EN
        </button>
        <button
          onClick={() => setLanguage('de')}
          className={`flex items-center px-3 py-1 text-sm font-medium transition duration-150 ${
            language === 'de' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-600'
          }`}
        >
          <Globe className="h-4 w-4 mr-1" /> DE
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-inter">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
          .font-inter { font-family: 'Inter', sans-serif; }
          .glow-border {
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); /* blue-500 glow */
          }
          .analyze-button {
            transition: all 0.3s ease;
          }
          .analyze-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
          }
          .loading-spin {
            animation: spin 1.5s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-xl shadow-2xl border border-blue-600/50 glow-border">
        <LanguageToggle />
        
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-400 mb-2 tracking-wide">
          <Zap className="inline-block mr-2 h-7 w-7" />
          {t.title}
        </h1>
        <p className="text-center text-gray-400 mb-8">
          {t.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="date-input" className="block text-sm font-medium text-gray-300 mb-2">
              {t.label}
            </label>
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
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150"
              required
            />
          </div>

          {error && (
            <div className="bg-red-900/40 border border-red-500 text-red-300 p-3 rounded-lg text-sm">
              <span className="font-semibold">{t.confidence}:</span> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isAnalyzing || !inputDate}
            className={`analyze-button w-full flex items-center justify-center p-3 rounded-lg font-semibold text-lg transition duration-300
              ${isAnalyzing || !inputDate
                ? 'bg-blue-800/50 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
              }`}
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
        </form>

        {/* Prediction Results Display */}
        {predictedDay && predictionDetails && nextActualDay && (
          <div className="mt-8 pt-6 border-t border-gray-700 space-y-4">
            
            <div className="flex items-center space-x-4">
              <RefreshCw className="h-10 w-10 text-blue-400" /> {/* Re-using a fixed icon for simplicity here */}
              <h2 className="text-xl font-bold text-blue-300">{predictionDetails.title}</h2>
            </div>

            {/* The Main Gag Prediction Block */}
            <div className="bg-gray-700 p-5 rounded-lg shadow-inner border border-blue-500/50">
              <p className="text-gray-200 leading-relaxed">
                <span className="text-lg font-bold text-yellow-300 block mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-400"/>
                  {t.predictionHeader}
                </span>
                {t.predictionIntro}
                <span className="block text-3xl font-extrabold text-white mt-1 mb-2 tracking-wider">
                    {nextActualDay}
                </span>
                <span className="block text-sm text-red-400 font-mono italic p-1 bg-gray-900 rounded">
                    {t.marginError} {getRandomError()}
                </span>
              </p>
            </div>
            
            {/* Detailed Forecast */}
            <div className="bg-gray-700 p-5 rounded-lg shadow-inner border border-gray-600">
                <p className="text-sm text-gray-400">
                    <span className="font-semibold text-blue-300 block mb-1">{t.detailedForecast}</span>
                    {predictedDay}
                </p>
            </div>


            <div className="flex justify-between text-sm text-gray-400 pt-2">
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>{t.confidence} <span className="font-semibold text-green-400">{predictionDetails.confidence}</span></span>
              </div>
              <div className="flex items-center space-x-1">
                <Sun className="h-4 w-4 text-yellow-500" />
                <Moon className="h-4 w-4 text-indigo-500" />
                <span>{t.vibeForecast} <span className="font-semibold text-white">{predictionDetails.vibe}</span></span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TemporalPredictor;