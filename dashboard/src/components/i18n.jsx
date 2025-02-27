import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "../locals/en.json";
import frTranslation from "../locals/fr.json";
import esTranslation from "../locals/es.json";
import deTranslation from "../locals/de.json";
import ptTranslation from "../locals/pt.json";

// Define available languages
const availableLanguages = ["en", "fr", "es", "de", "pt"];

// Set up resources
const resources = {
  en: { translation: enTranslation },
  fr: { translation: frTranslation },
  es: { translation: esTranslation },
  de: { translation: deTranslation },
  pt: { translation: ptTranslation },
};

// Function to get language from URL
const getLanguageFromURL = () => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("culture") || "en"; // Default to English

    console.log("🌍 Detected language from URL:", lang); // ✅ Debugging

    return ["en", "fr", "es", "de", "pt"].includes(lang) ? lang : "en"; // Validate language
  }
  return "en"; // Default to English if no window
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getLanguageFromURL(), // Set language from URL
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });
// Function to dynamically change language
export const changeLanguage = (lng) => {
  if (availableLanguages.includes(lng)) {
    i18n.changeLanguage(lng);
    const params = new URLSearchParams(window.location.search);
    params.set("culture", lng);
    window.history.replaceState(null, "", `?${params.toString()}`);
  }
};

export default i18n;
