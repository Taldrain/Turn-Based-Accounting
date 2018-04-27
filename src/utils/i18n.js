//
// internationalization file
//
// used to fetch the langFile, using the locale, and translate a string
//
import 'whatwg-fetch';

const langObject = {
  locale: undefined,
  obj: {},
};

//
// fetch the langFile
//
// use current langFile if the locales match
// TODO: check if fetch's catch is enough
function fetchLangFile(locale) {
  if (langObject.locale === locale) {
    return new Promise(resolve => resolve(langObject.obj));
  }

  // eslint-disable-next-line no-undef
  return fetch(`/lang/${locale}.json`)
    .then(res => res.json())
    .then((langFile) => {
      langObject.locale = locale;
      langObject.obj = langFile;
      return langObject.obj;
    });
}

//
// use the string to translate as a key in langFile object
//
// - if langFile[key] match: returns it
// - if key contains at least one '.' we're splitting the key and
//    we're trying to access langFile[keySplitted[0]][keySplitted[1]][...]
// - otherwhise return value
//
function findKey(value, langFile) {
  if (langFile[value] !== undefined) {
    return langFile[value];
  }

  if (value.indexOf('.') > -1) {
    const valueSplitted = value.split('.');
    let currentObj = langFile;

    while (valueSplitted.length > 0) {
      if (typeof currentObj !== 'object' || currentObj[valueSplitted[0]] === undefined) {
        return value;
      }
      currentObj = currentObj[valueSplitted.shift()];
    }
    return currentObj;
  }

  return value;
}


// translate 'value' in the 'locale' language
//
// retrieve the langFile and find the correct translation using value as a key
function translate(value, locale) {
  if (locale !== undefined) {
    return fetchLangFile(locale)
      .then(langFile => findKey(value, langFile))
      .catch(() => new Promise(resolve => resolve(value)));
  }

  return new Promise(resolve => resolve(value));
}

export {
  fetchLangFile,
  translate,
};
