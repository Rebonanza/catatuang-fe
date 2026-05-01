export const LanguageCode = {
  EN: 'en',
  ID: 'id',
} as const;

export type Language = (typeof LanguageCode)[keyof typeof LanguageCode];

export const LANGUAGE_OPTIONS = [
  { code: LanguageCode.ID, label: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: LanguageCode.EN, label: 'English', flag: '🇺🇸' },
] as const;

export const DEFAULT_LANGUAGE: Language = LanguageCode.ID;
