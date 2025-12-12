/**
 * Language Context - Manages app language (English/German)
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Language } from '../types';
import { config } from '../config';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    'app.title': 'Latest News',
    'app.loading': 'Loading latest news...',
    'app.error': 'Failed to load news',
    'app.tryAgain': 'Try Again',
    'app.noNews': 'No news available at the moment.',
    'news.showMore': 'Show More',
    'news.showLess': 'Show Less',
    'news.readMore': 'Read more about:',
    'language.english': 'English',
    'language.german': 'German',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',
    'search.placeholder': 'Search news...',
    'filter.all': 'All Categories',
    'offline.message':
      'You are currently offline. Some features may not be available.',
    'online.message': 'Online',
  },
  de: {
    'app.title': 'Neueste Nachrichten',
    'app.loading': 'Lade neueste Nachrichten...',
    'app.error': 'Nachrichten konnten nicht geladen werden',
    'app.tryAgain': 'Erneut versuchen',
    'app.noNews': 'Derzeit sind keine Nachrichten verfügbar.',
    'news.showMore': 'Mehr anzeigen',
    'news.showLess': 'Weniger anzeigen',
    'news.readMore': 'Mehr lesen über:',
    'language.english': 'Englisch',
    'language.german': 'Deutsch',
    'theme.light': 'Hell',
    'theme.dark': 'Dunkel',
    'theme.system': 'System',
    'search.placeholder': 'Nachrichten suchen...',
    'filter.all': 'Alle Kategorien',
    'offline.message':
      'Sie sind derzeit offline. Einige Funktionen sind möglicherweise nicht verfügbar.',
    'online.message': 'Online',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || config.app.defaultLanguage;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
