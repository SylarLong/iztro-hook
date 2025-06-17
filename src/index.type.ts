import { Config, Language } from 'iztro/lib/data/types';
import { GenderName } from 'iztro/lib/i18n';

export type IztroInput = {
  birthday: string;
  birthTime: number;
  gender: GenderName;
  birthdayType: 'lunar' | 'solar';
  isLeapMonth?: boolean;
  fixLeap?: boolean;
  lang?: Language;
  astroType?: 'heaven' | 'earth' | 'human';
  options?: Config;
};
