# iztro-hook

基于 [`iztro`](https://github.com/SylarLong/iztro) 实现的 `react hook`。
用于获取紫微斗数星盘数据，运限数据（大小限，流年，流月，流日，流时等）。详细功能请查看 [iztro开发文档](https://docs.iztro.com)

## 安装 (installation)

```
npm install iztro iztro-hook -S
```

## 参数 (parameters)

```
export type IztroInput = {
  birthday: string;
  birthTime: number;
  gender: GenderName;
  birthdayType: 'lunar' | 'solar';
  isLeapMonth?: boolean;
  fixLeap?: boolean;
};
```

- `GenderName` 的定义在 [iztro 开发文档 -> GenderName](https://docs.iztro.com/type-definition.html#gendername) 里。

## hook 定义 (hook defination)

```
type useIztro = (input: IztroInput) => {
  astrolabe: FunctionalAstrolabe | undefined;
  horoscope: Horoscope | undefined;
  setHoroscope: (date: string | Date, hour?: number) => void;
}
```

- `FunctionalAstrolabe` 的定义在 [iztro 开发文档 -> FunctionalAstrolabe](https://docs.iztro.com/posts/astrolabe.html#functionalastrolabe) 里。
- `Horoscope` 的定义在 [iztro 开发文档 -> Horoscope](https://docs.iztro.com/type-definition.html#horoscope) 里。

## 使用 (how to use?)

该 `hook` 只能在 `react` 组件中使用，如果你的项目不是使用 `react` 框架开发的，请使用 [`iztro`](https://github.com/SylarLong/iztro) 自行封装。

```ts

import React from 'react';
import { useIztro } from 'iztro-hook';

export default App() {
  const { astrolabe, horoscope, setHoroscope } = useIztro({
    birthday: '2000-18-16',
    birthdayType: 'solar',
    birthTime: 2,
    gender: '女',
    fixLeap: true,
  });


  return (
    <>在此绑定数据进行渲染</>
  );
}

```

>如果你想了解更多关于紫微斗数的知识或者本开源库的信息，可以查看 [iztro](https://github.com/SylarLong/iztro)。如果好用记得给我一个⭐️鼓励哦～