import { OpaqueToken } from '@angular/core';

// import translations
import { LANG_US_NAME, LANG_US_TRANS } from './lang-us';
import { LANG_VN_NAME, LANG_VN_TRANS } from './lang-vn';

// translation token
export const TRANSLATIONS = new OpaqueToken('translations');

// all traslations
const dictionary = {
    [LANG_US_NAME]: LANG_US_TRANS,
    [LANG_VN_NAME]: LANG_VN_TRANS,
};

// providers
export const TRANSLATION_PROVIDERS = [
    { provide: TRANSLATIONS, useValue: dictionary },
];