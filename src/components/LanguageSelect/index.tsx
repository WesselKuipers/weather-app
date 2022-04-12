import { Select, Image } from '@mantine/core';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelectItem } from '@/components';
import NL from '@/assets/NL.svg';
import GB from '@/assets/GB.svg';

const languageFlags = {
  nl: NL,
  en: GB,
};

/**
 * Language picker that can be used to switch between the supported languages.
 *
 * Any changes are saved in the local storage using i18next.
 */
export function LanguageSelect(): ReactElement {
  const { i18n } = useTranslation();

  return (
    <Select
      itemComponent={LanguageSelectItem}
      aria-label="Select language"
      value={i18n.language}
      onChange={(lang) => i18n.changeLanguage(lang!)}
      icon={
        <Image
          height={16}
          alt={i18n.language}
          src={languageFlags[i18n.language as keyof typeof languageFlags] || languageFlags.en}
        />
      }
      data={[
        {
          image: languageFlags.en,
          label: 'English',
          value: 'en',
        },
        {
          image: languageFlags.nl,
          label: 'Nederlands',
          value: 'nl',
        },
      ]}
    />
  );
}
