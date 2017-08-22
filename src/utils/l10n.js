//
// Localization file
//
// retrieve the locale and send it to the store
//
const Actions = require('../actions/index.js');
const i18n = require('./i18n.js');

const DEFAULT_LOCALE = 'en-US';

//
// Retrieve browser locale
//
function retrieveLocale() {
  if (window.navigator.languages) {
    return window.navigator.languages[0];
  }

  return window.navigator.language || window.navigator.browserLanguage ||
    window.navigator.systemLanguage || window.navigator.userLanguage;
}

//
// check if the locale is currently supported, otherwise use default locale
//
function checkLocale(locale) {
  let canonicalLocale = locale;

  if (window.Intl && window.Intl.getCanonicalLocales) {
    canonicalLocale = window.Intl.getCanonicalLocales(locale)[0];
  }

  switch (canonicalLocale) {
    case 'en-US':
    case 'fr-FR':
      return canonicalLocale;
    default:
      return DEFAULT_LOCALE;
  }
}

//
// Initialize the first locale and send it to the store
//
function start(store) {
  const locale = checkLocale(retrieveLocale());

  // init i18n by fetching the langfile as soon as possible
  // we could wait for a text to be translated to fetch the langfile
  // but since we will have multiple call to `fetchLangFile` (because we would
  // have multiple text to translate)
  //
  // another solution would be to detect multiple call to fetchLangFile and
  // execute only one http fetch
  i18n.fetchLangFile(locale);

  store.dispatch(Actions.updateLocale(locale));
}

function localeList() {
  return ['fr-FR'].concat(DEFAULT_LOCALE);
}

module.exports = {
  DEFAULT_LOCALE,
  localeList,
  start,
};
