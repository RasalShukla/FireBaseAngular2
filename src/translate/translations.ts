import { OpaqueToken } from '@angular/core';

// import translations
import {  LANG_EN_TRANS } from './lang-en-US';
import {  LANG_FR_TRANS } from './lang-fr-FR';


// translation token
export const TRANSLATIONS = new OpaqueToken('translations');

// all traslations
 const dictionary  = {
	"en-US": LANG_EN_TRANS,
	"fr-FR": LANG_FR_TRANS,
	
};

// providers
export const TRANSLATION_PROVIDERS = [
	{ provide: TRANSLATIONS, useValue: dictionary },
];