import en from './en.json';
import id from './id.json';
import { LanguageCode } from '@/constants/language.constant';
import type { Language } from '@/constants/language.constant';

export type LandingTranslation = typeof en;

const translations: Record<Language, LandingTranslation> = {
  [LanguageCode.EN]: en,
  [LanguageCode.ID]: id,
};

export function getTranslation(lang: Language): LandingTranslation {
  return translations[lang];
}
