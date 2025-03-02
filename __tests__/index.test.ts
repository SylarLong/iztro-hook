import { renderHook, act } from '@testing-library/react-hooks';
import { useIztro } from '../src/index';

describe('Test useIztro hook', () => {
  it('useIztro() return undefined', () => {
    const { result } = renderHook(() =>
      useIztro({
        birthday: '2000-18-16',
        birthdayType: 'solar',
        birthTime: 2,
        gender: '女',
        fixLeap: true,
      }),
    );

    expect(result.current.astrolabe).toBeUndefined();
    expect(result.current.horoscope).toBeUndefined();
  });

  it('useIztro() solar', async () => {
    const { result } = renderHook(() =>
      useIztro({
        birthday: '2000-8-16',
        birthdayType: 'solar',
        birthTime: 2,
        gender: '女',
        fixLeap: true,
      }),
    );

    const { current } = result;

    expect(current.astrolabe).toHaveProperty('solarDate', '2000-8-16');
    expect(current.astrolabe).toHaveProperty('lunarDate', '二〇〇〇年七月十七');
    expect(current.astrolabe).toHaveProperty('chineseDate', '庚辰 甲申 丙午 庚寅');
    expect(current.astrolabe).toHaveProperty('time', '寅时');
    expect(current.astrolabe).toHaveProperty('sign', '狮子座');
    expect(current.astrolabe).toHaveProperty('zodiac', '龙');
    expect(current.astrolabe).toHaveProperty('earthlyBranchOfSoulPalace', '午');
    expect(current.astrolabe).toHaveProperty('earthlyBranchOfBodyPalace', '戌');
    expect(current.astrolabe).toHaveProperty('soul', '破军');
    expect(current.astrolabe).toHaveProperty('body', '文昌');
    expect(current.astrolabe).toHaveProperty('fiveElementsClass', '木三局');

    const horoscopeValue = current?.astrolabe?.horoscope('2023-8-19 3:12');

    expect(horoscopeValue).toHaveProperty('solarDate', '2023-8-19');
    expect(horoscopeValue?.decadal).toHaveProperty('index', 2);
    expect(horoscopeValue?.decadal).toHaveProperty('heavenlyStem', '庚');
    expect(horoscopeValue?.decadal).toHaveProperty('earthlyBranch', '辰');
    expect(horoscopeValue?.decadal).toHaveProperty('palaceNames', [
      '夫妻',
      '兄弟',
      '命宫',
      '父母',
      '福德',
      '田宅',
      '官禄',
      '仆役',
      '迁移',
      '疾厄',
      '财帛',
      '子女',
    ]);
    expect(horoscopeValue?.decadal).toHaveProperty('mutagen', ['太阳', '武曲', '太阴', '天同']);
    expect(horoscopeValue?.age).toHaveProperty('index', 9);
    expect(horoscopeValue?.age).toHaveProperty('nominalAge', 24);
    expect(horoscopeValue?.yearly).toHaveProperty('index', 1);
    expect(horoscopeValue?.yearly).toHaveProperty('heavenlyStem', '癸');
    expect(horoscopeValue?.yearly).toHaveProperty('earthlyBranch', '卯');
    expect(horoscopeValue?.yearly).toHaveProperty('palaceNames', [
      '兄弟',
      '命宫',
      '父母',
      '福德',
      '田宅',
      '官禄',
      '仆役',
      '迁移',
      '疾厄',
      '财帛',
      '子女',
      '夫妻',
    ]);
    expect(horoscopeValue?.yearly).toHaveProperty('mutagen', ['破军', '巨门', '太阴', '贪狼']);
    expect(horoscopeValue?.monthly).toHaveProperty('index', 3);
    expect(horoscopeValue?.monthly).toHaveProperty('heavenlyStem', '庚');
    expect(horoscopeValue?.monthly).toHaveProperty('earthlyBranch', '申');
    expect(horoscopeValue?.monthly).toHaveProperty('palaceNames', [
      '子女',
      '夫妻',
      '兄弟',
      '命宫',
      '父母',
      '福德',
      '田宅',
      '官禄',
      '仆役',
      '迁移',
      '疾厄',
      '财帛',
    ]);
    expect(horoscopeValue?.monthly).toHaveProperty('mutagen', ['太阳', '武曲', '太阴', '天同']);
    expect(horoscopeValue?.daily).toHaveProperty('index', 6);
    expect(horoscopeValue?.daily).toHaveProperty('heavenlyStem', '己');
    expect(horoscopeValue?.daily).toHaveProperty('earthlyBranch', '酉');
    expect(horoscopeValue?.daily).toHaveProperty('palaceNames', [
      '迁移',
      '疾厄',
      '财帛',
      '子女',
      '夫妻',
      '兄弟',
      '命宫',
      '父母',
      '福德',
      '田宅',
      '官禄',
      '仆役',
    ]);
    expect(horoscopeValue?.daily).toHaveProperty('mutagen', ['武曲', '贪狼', '天梁', '文曲']);
    expect(horoscopeValue?.hourly).toHaveProperty('index', 8);
    expect(horoscopeValue?.hourly).toHaveProperty('heavenlyStem', '丙');
    expect(horoscopeValue?.hourly).toHaveProperty('earthlyBranch', '寅');
    expect(horoscopeValue?.hourly).toHaveProperty('palaceNames', [
      '官禄',
      '仆役',
      '迁移',
      '疾厄',
      '财帛',
      '子女',
      '夫妻',
      '兄弟',
      '命宫',
      '父母',
      '福德',
      '田宅',
    ]);
    expect(horoscopeValue?.hourly).toHaveProperty('mutagen', ['天同', '天机', '文昌', '廉贞']);

    const { horoscope } = result.current;

    expect(horoscope?.age).toHaveProperty('index', 7);
    expect(horoscope?.age).toHaveProperty('nominalAge', 26);

    act(() => {
      result.current.setHoroscope('2034-10-19 3:12');
    });

    expect(result.current.horoscope?.age).toHaveProperty('index', 10);
    expect(result.current.horoscope?.age).toHaveProperty('nominalAge', 35);

    act(() => {
      result.current.setHoroscope('2025-10-19', 2);
    });

    expect(result.current.horoscope?.age).toHaveProperty('index', 7);
    expect(result.current.horoscope?.age).toHaveProperty('nominalAge', 26);
  });

  it('useIztro() lunar', async () => {
    const { result } = renderHook(() =>
      useIztro({
        birthday: '2000-7-17',
        birthdayType: 'lunar',
        birthTime: 2,
        gender: '女',
        fixLeap: true,
        isLeapMonth: true,
      }),
    );

    const { current } = result;

    expect(current.astrolabe).toHaveProperty('solarDate', '2000-8-16');
    expect(current.astrolabe).toHaveProperty('lunarDate', '二〇〇〇年七月十七');
    expect(current.astrolabe).toHaveProperty('chineseDate', '庚辰 甲申 丙午 庚寅');
    expect(current.astrolabe).toHaveProperty('time', '寅时');
    expect(current.astrolabe).toHaveProperty('sign', '狮子座');
    expect(current.astrolabe).toHaveProperty('zodiac', '龙');
    expect(current.astrolabe).toHaveProperty('earthlyBranchOfSoulPalace', '午');
    expect(current.astrolabe).toHaveProperty('earthlyBranchOfBodyPalace', '戌');
    expect(current.astrolabe).toHaveProperty('soul', '破军');
    expect(current.astrolabe).toHaveProperty('body', '文昌');
    expect(current.astrolabe).toHaveProperty('fiveElementsClass', '木三局');

    const horoscopeValue = current?.astrolabe?.horoscope('2023-8-19 3:12');

    expect(horoscopeValue).toHaveProperty('solarDate', '2023-8-19');
    expect(horoscopeValue?.decadal).toHaveProperty('index', 2);
    expect(horoscopeValue?.decadal).toHaveProperty('heavenlyStem', '庚');
    expect(horoscopeValue?.decadal).toHaveProperty('earthlyBranch', '辰');
    expect(horoscopeValue?.decadal).toHaveProperty('palaceNames', [
      '夫妻',
      '兄弟',
      '命宫',
      '父母',
      '福德',
      '田宅',
      '官禄',
      '仆役',
      '迁移',
      '疾厄',
      '财帛',
      '子女',
    ]);
    expect(horoscopeValue?.decadal).toHaveProperty('mutagen', ['太阳', '武曲', '太阴', '天同']);
    expect(horoscopeValue?.age).toHaveProperty('index', 9);
    expect(horoscopeValue?.age).toHaveProperty('nominalAge', 24);
    expect(horoscopeValue?.yearly).toHaveProperty('index', 1);
    expect(horoscopeValue?.yearly).toHaveProperty('heavenlyStem', '癸');
    expect(horoscopeValue?.yearly).toHaveProperty('earthlyBranch', '卯');
    expect(horoscopeValue?.yearly).toHaveProperty('palaceNames', [
      '兄弟',
      '命宫',
      '父母',
      '福德',
      '田宅',
      '官禄',
      '仆役',
      '迁移',
      '疾厄',
      '财帛',
      '子女',
      '夫妻',
    ]);
    expect(horoscopeValue?.yearly).toHaveProperty('mutagen', ['破军', '巨门', '太阴', '贪狼']);
    expect(horoscopeValue?.monthly).toHaveProperty('index', 3);
    expect(horoscopeValue?.monthly).toHaveProperty('heavenlyStem', '庚');
    expect(horoscopeValue?.monthly).toHaveProperty('earthlyBranch', '申');
    expect(horoscopeValue?.monthly).toHaveProperty('palaceNames', [
      '子女',
      '夫妻',
      '兄弟',
      '命宫',
      '父母',
      '福德',
      '田宅',
      '官禄',
      '仆役',
      '迁移',
      '疾厄',
      '财帛',
    ]);
    expect(horoscopeValue?.monthly).toHaveProperty('mutagen', ['太阳', '武曲', '太阴', '天同']);
    expect(horoscopeValue?.daily).toHaveProperty('index', 6);
    expect(horoscopeValue?.daily).toHaveProperty('heavenlyStem', '己');
    expect(horoscopeValue?.daily).toHaveProperty('earthlyBranch', '酉');
    expect(horoscopeValue?.daily).toHaveProperty('palaceNames', [
      '迁移',
      '疾厄',
      '财帛',
      '子女',
      '夫妻',
      '兄弟',
      '命宫',
      '父母',
      '福德',
      '田宅',
      '官禄',
      '仆役',
    ]);
    expect(horoscopeValue?.daily).toHaveProperty('mutagen', ['武曲', '贪狼', '天梁', '文曲']);
    expect(horoscopeValue?.hourly).toHaveProperty('index', 8);
    expect(horoscopeValue?.hourly).toHaveProperty('heavenlyStem', '丙');
    expect(horoscopeValue?.hourly).toHaveProperty('earthlyBranch', '寅');
    expect(horoscopeValue?.hourly).toHaveProperty('palaceNames', [
      '官禄',
      '仆役',
      '迁移',
      '疾厄',
      '财帛',
      '子女',
      '夫妻',
      '兄弟',
      '命宫',
      '父母',
      '福德',
      '田宅',
    ]);
    expect(horoscopeValue?.hourly).toHaveProperty('mutagen', ['天同', '天机', '文昌', '廉贞']);

    const { horoscope } = result.current;

    expect(horoscope?.age).toHaveProperty('index', 7);
    expect(horoscope?.age).toHaveProperty('nominalAge', 26);

    act(() => {
      result.current.setHoroscope('2034-10-19 3:12');
    });

    expect(result.current.horoscope?.age).toHaveProperty('index', 10);
    expect(result.current.horoscope?.age).toHaveProperty('nominalAge', 35);

    act(() => {
      result.current.setHoroscope('2025-10-19', 2);
    });

    expect(result.current.horoscope?.age).toHaveProperty('index', 7);
    expect(result.current.horoscope?.age).toHaveProperty('nominalAge', 26);
  });

  it('useIztro() with `normal` year divide', async () => {
    const { result } = renderHook(() =>
      useIztro({
        birthday: '1999-12-29',
        birthdayType: 'lunar',
        birthTime: 2,
        gender: '女',
        fixLeap: true,
        isLeapMonth: true,
        options: {
          yearDivide: 'normal',
        },
      }),
    );

    const { current } = result;

    expect(current.astrolabe).toHaveProperty('solarDate', '2000-2-4');
    expect(current.astrolabe).toHaveProperty('lunarDate', '一九九九年腊月廿九');
    expect(current.astrolabe).toHaveProperty('chineseDate', '己卯 丁丑 壬辰 壬寅');
    expect(current.astrolabe).toHaveProperty('time', '寅时');
    expect(current.astrolabe).toHaveProperty('zodiac', '兔');
    expect(current.astrolabe).toHaveProperty('earthlyBranchOfSoulPalace', '亥');
    expect(current.astrolabe).toHaveProperty('earthlyBranchOfBodyPalace', '卯');
    expect(current.astrolabe).toHaveProperty('soul', '巨门');
    expect(current.astrolabe).toHaveProperty('body', '天同');
    expect(current.astrolabe).toHaveProperty('fiveElementsClass', '火六局');
  });

  it('useIztro() with `exact` year divide', async () => {
    const { result } = renderHook(() =>
      useIztro({
        birthday: '1999-12-29',
        birthdayType: 'lunar',
        birthTime: 2,
        gender: '女',
        fixLeap: true,
        isLeapMonth: true,
        options: {
          yearDivide: 'exact',
        },
      }),
    );

    const { current } = result;

    expect(current.astrolabe).toHaveProperty('solarDate', '2000-2-4');
    expect(current.astrolabe).toHaveProperty('lunarDate', '一九九九年腊月廿九');
    expect(current.astrolabe).toHaveProperty('chineseDate', '庚辰 丁丑 壬辰 壬寅');
    expect(current.astrolabe).toHaveProperty('time', '寅时');
    expect(current.astrolabe).toHaveProperty('zodiac', '龙');
    expect(current.astrolabe).toHaveProperty('earthlyBranchOfSoulPalace', '亥');
    expect(current.astrolabe).toHaveProperty('earthlyBranchOfBodyPalace', '卯');
    expect(current.astrolabe).toHaveProperty('soul', '巨门');
    expect(current.astrolabe).toHaveProperty('body', '文昌');
    expect(current.astrolabe).toHaveProperty('fiveElementsClass', '土五局');
  });

  it('useIztro() with `birthday` age divide', async () => {
    const { result } = renderHook(() =>
      useIztro({
        birthday: '2000-7-17',
        birthdayType: 'lunar',
        birthTime: 2,
        gender: '女',
        fixLeap: true,
        isLeapMonth: true,
        options: {
          ageDivide: 'birthday',
        },
      }),
    );

    const { horoscope } = result.current;

    expect(horoscope?.age).toHaveProperty('index', 8);
    expect(horoscope?.age).toHaveProperty('nominalAge', 25);

    act(() => {
      result.current.setHoroscope('2034-10-19 3:12');
    });

    expect(result.current.horoscope?.age).toHaveProperty('index', 10);
    expect(result.current.horoscope?.age).toHaveProperty('nominalAge', 35);
  });
});
