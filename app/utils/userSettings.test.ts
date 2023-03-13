import type { Settings } from "@prisma/client";

import { getUserCurrency, getUserLocale } from './userSettings';

function dummySettings(currency: string, locale: string): Settings {
  return ({
    currency,
    locale,
    userId: 'user-id',
    id: 'id',
  });
}

test('getUserCurrency returns the currency in the settings', () => {
  expect(getUserCurrency(dummySettings('EUR', 'fr-FR'))).toBe('EUR');
  expect(getUserCurrency(dummySettings('USD', 'fr-FR'))).toBe('USD');
  expect(getUserCurrency(dummySettings('FOO', 'fr-FR'))).toBe('FOO');
});

test('getUserCurrency returns a default currency when settings are not defined', () => {
  expect(getUserCurrency(null)).toBe('EUR');
});

test('getUserLocale returns the locale in the settings', () => {
  expect(getUserLocale(dummySettings('EUR', 'fr-FR'))).toBe('fr-FR');
  expect(getUserLocale(dummySettings('EUR', 'en-US'))).toBe('en-US');
  expect(getUserLocale(dummySettings('EUR', 'random'))).toBe('random');
});

test('getUserLocale returns a default locale when settings are not defined', () => {
  expect(getUserLocale(null)).toBe('fr-FR');
});
