// Getter around a Settings model object. It is useful as the model might not
// hold all the data (or even be defined) and we want to use the browser
// context as a placeholder (eg: for the locale)

import type { Settings } from "@prisma/client";

function getUserCurrency(userSettings: Settings | null): string {
  if (userSettings && userSettings.currency) {
    return userSettings.currency;
  }

  return 'EUR';
}

function getUserLocale(userSettings: Settings | null): string {
  if (userSettings && userSettings.locale) {
    return userSettings.locale;
  }

  // TODO: replace with the browser locale
  return 'fr-FR';
}

export {
  getUserCurrency,
  getUserLocale
};
