import { setDefaultOptions } from 'date-fns';

function localizeDateFns(locale: string) {
  console.log('locale: ', locale);
  if (locale === 'fr-FR') {
    const { fr } = require('date-fns/locale');
    setDefaultOptions({ locale: fr });

    return;
  }

  const { enUS } = require('date-fns/locale');
  setDefaultOptions({ locale: enUS });
}

export {
  localizeDateFns,
};
