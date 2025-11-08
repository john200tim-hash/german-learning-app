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

const TemporalPredictor = () => {
  const [inputDate, setInputDate] = useState('');
  const [predictedDay, setPredictedDay] = useState(null);
  const [nextActualDay, setNextActualDay] = useState(null); 
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [predictionDetails, setPredictionDetails] = useState(null);
  const [language, setLanguage] = useState('en');

  const t = translations[language];

  const getGagPrediction = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * t.gags.length);
    const selectedGag = t.gags[randomIndex];
    const vibeKey = `v${randomIndex + 1}`;
    const vibe = t.vibes[vibeKey] || t.vibes.v1;
    return {
      ...selectedGag,
      vibe: vibe,
      confidence: Math.floor(Math.random() * 50) + 50 + "." + Math.floor(Math.random() * 99) + "%",
    };
  }, [t]);

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

    dateObj.setDate(dateObj.getDate() + 1);
    const locale = language === 'de' ? 'de-DE' : 'en-US';
    const nextDayStr = dateObj.toLocaleDateString(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    setTimeout(() => {
      setIsAnalyzing(false);
      const result = getGagPrediction();
      setPredictedDay(result.message);
      setPredictionDetails(result);
      setNextActualDay(nextDayStr); 
    }, 2500);
  };

  const LanguageToggle = () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', border: '1px solid var(--card-border)', borderRadius: '0.5rem', overflow: 'hidden', backgroundColor: 'var(--bg-color)' }}>
        <button
          onClick={() => setLanguage('en')}
          style={{ 
            display: 'flex', alignItems: 'center', padding: '0.25rem 0.75rem', fontSize: '0.875rem', fontWeight: '500', transition: 'all 0.15s',
            background: 'none', border: 'none', cursor: 'pointer',
            ...(language === 'en' ? { backgroundColor: 'var(--active-tab-bg)', color: 'var(--active-tab-text, white)' } : { color: 'var(--text-color)' })
          }}
        >
          <Globe style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} /> EN
        </button>
        <button
          onClick={() => setLanguage('de')}
          style={{ 
            display: 'flex', alignItems: 'center', padding: '0.25rem 0.75rem', fontSize: '0.875rem', fontWeight: '500', transition: 'all 0.15s',
            background: 'none', border: 'none', cursor: 'pointer',
            ...(language === 'de' ? { backgroundColor: 'var(--active-tab-bg)', color: 'var(--active-tab-text, white)' } : { color: 'var(--text-color)' })
          }}
        >
          <Globe style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} /> DE
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: 'var(--card-bg)', color: 'var(--text-color)' }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

          .font-orbitron { font-family: 'Orbitron', sans-serif; }
          .loading-spin { animation: spin 1.5s linear infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }
          .date-input-container input[type="date"]::-webkit-calendar-picker-indicator {
            cursor: pointer; opacity: 0; position: absolute; left: 0; top: 0; width: 100%; height: 100%;
          }
        `}
      </style>

      <div style={{ width: '100%', maxWidth: '32rem', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: 'var(--box-shadow)', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', border: '1px solid var(--card-border)' }}>
        <LanguageToggle />
        
        <h1 className="font-orbitron" style={{ fontSize: '1.875rem', fontWeight: '700', textAlign: 'center', marginBottom: '0.5rem', color: 'var(--heading-color)' }}>
          <Zap style={{ display: 'inline-block', marginRight: '0.5rem', height: '1.75rem', width: '1.75rem' }} />
          {t.title}
        </h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--subtab-text)' }}>
          {t.subtitle}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="date-input-container" style={{ position: 'relative' }}>
            <label htmlFor="date-input" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-color)', marginBottom: '0.5rem' }}>
              {t.label}
            </label>
            <div style={{ position: 'relative' }}>
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
                  style={{ width: '100%', padding: '0.75rem', paddingLeft: '2.5rem', borderRadius: '0.5rem', border: '1px solid var(--card-border)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
                  required
                />
                <Calendar style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', height: '1.25rem', width: '1.25rem', color: 'var(--subtab-text)', pointerEvents: 'none' }} />
            </div>
          </div>

          {error && (
            <div style={{ padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', border: '1px solid #ef4444', color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
              <span style={{ fontWeight: '600' }}>Error:</span> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isAnalyzing || !inputDate}
            style={{ 
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: '700', fontSize: '1.125rem', transition: 'all 0.3s',
                backgroundColor: 'var(--active-tab-bg)', color: 'var(--active-tab-text, white)', border: 'none',
                cursor: (isAnalyzing || !inputDate) ? 'not-allowed' : 'pointer', opacity: (isAnalyzing || !inputDate) ? 0.5 : 1
            }}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="loading-spin" style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.5rem' }} />
                {t.buttonAnalyze}
              </>
            ) : (
              <>
                <Zap style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.5rem' }} />
                {t.buttonRun}
              </>
            )}
          </button>
        </form>

        {predictedDay && predictionDetails && nextActualDay && (
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <RefreshCw style={{ height: '2.5rem', width: '2.5rem', color: 'var(--active-tab-bg)' }} />
              <h2 className="font-orbitron" style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--active-tab-bg)' }}>{predictionDetails.title}</h2>
            </div>
            <div style={{ padding: '1.25rem', borderRadius: '0.5rem', border: '1px solid var(--active-tab-border)', backgroundColor: 'var(--bg-color)' }}>
              <p style={{ lineHeight: '1.6', color: 'var(--text-color)' }}>
                <span style={{ fontSize: '1.125rem', fontWeight: '700', display: 'block', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', color: 'var(--heading-color)' }}>
                  <AlertTriangle style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.5rem' }}/>
                  {t.predictionHeader}
                </span>
                {t.predictionIntro}
                <span className="font-orbitron" style={{ display: 'block', fontSize: '1.875rem', fontWeight: '800', marginTop: '0.25rem', marginBottom: '0.5rem', color: 'var(--active-tab-bg)' }}>
                    {nextActualDay}
                </span>
                <span style={{ display: 'block', fontSize: '0.875rem', fontStyle: 'italic', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                    {t.marginError} {getRandomError()}
                </span>
              </p>
            </div>
            <div style={{ padding: '1.25rem', borderRadius: '0.5rem', border: '1px solid var(--card-border)', backgroundColor: 'var(--bg-color)' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--subtab-text)' }}>
                    <span style={{ fontWeight: '600', display: 'block', marginBottom: '0.25rem', color: 'var(--text-color)' }}>{t.detailedForecast}</span>
                    {predictedDay}
                </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', paddingTop: '0.5rem', color: 'var(--text-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <TrendingUp style={{ height: '1rem', width: '1rem', color: '#22c55e' }} />
                <span>{t.confidence} <span style={{ fontWeight: '600', color: '#22c55e' }}>{predictionDetails.confidence}</span></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Sun style={{ height: '1rem', width: '1rem', color: '#f59e0b' }} />
                <Moon style={{ height: '1rem', width: '1rem', color: '#818cf8' }} />
                <span>{t.vibeForecast} <span style={{ fontWeight: '600', color: 'var(--text-color)' }}>{predictionDetails.vibe}</span></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemporalPredictor;
