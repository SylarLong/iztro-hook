import { GenderName } from 'iztro/lib/i18n';

export type IztroInput = {
  birthday: string;
  birthTime: number;
  gender: GenderName;
  birthdayType: 'lunar' | 'solar';
  isLeapMonth?: boolean;
  fixLeap?: boolean;
};
