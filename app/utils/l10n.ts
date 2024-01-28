import { setDefaultOptions } from 'date-fns';

async function localizeDateFns(locale: string) {
  if (locale === 'fr-FR') {
    const { fr } = await import('date-fns/locale');
    setDefaultOptions({ locale: fr });

    return;
  }

  const { enUS } = await import('date-fns/locale');
  setDefaultOptions({ locale: enUS });
}

export {
  localizeDateFns,
};
