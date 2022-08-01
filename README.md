NEXTJS, Redux Toolkit Query template

## Warning section ⚠
useDapp может генерировать большое количество запросов к ноде. Большое количество запросов модет привести к скоропостижному падению ноды. В данном шаблоне указана задержка в 20 секунд для запросов, которые идут в фоне, при подключении библиотеки. Но помимо них могут быть и другие, которые возникают при использовании библиотеки (обращение к методам контракта, подписки). 

**ПО этой причине при использовании useDapp нужно обязательно проверять не уходит ли десяток запросов каждую секунду!**

## Установка

```Shell
npx create-next-app <project-name> --example https://github.com/Neca-development/nextjs-rtkquery-template

```

## Файловая структура
- **.husky**
- **.vscode**
- **public**
    - **assets** | Папка с ассетами
      - **fonts** | Шрифты
      - **icons** | Все svg
      - **images** | Изображения
      - `favicon.ico` 
- **src**
  - **blockchain** | Папка с логикой работы с блокчейном
    - **hooks** | Хуки содержащии логику работы с блокчейном
    - **utils** | Функции для работы с блокчейцном
    - **constants** | Константы связанные с блокчейн логикой
  - **common** | Папка с инсрументами приложения используемыми везде
    - **configs**
    - **constants** | Папка с константами (тип файлов - `.constant.ts`)
    - **hooks** | Хуки использующиеся везде (тип файлов - `.hook.ts`)
      - **layout-hooks** | Хуки взаимодействующие с DOM
      - `use-app-dispatch.hook.ts` | Хук для удобного использования dispatch
    - **hoc** | Все общие хоки тут (тип файлов - `.hoc.ts`)
    - **types** | (тип файлов - `.interface.ts`)
    - **providers** | Провайдеры контекста которые логичнее вынести в общие здесь (тип файлов - `.provider.ts`)
    - **utils** | Функции облегчающие жизнь компонентам, выносим сюда повторяющийся код и переиспользуем (тип файлов - `.ts`)
  - **components** | (тип файлов - `.component.ts`, стилей - `.module.scss`)
  - **meta** | Компонент с метаданными приложения, обязательно добавлять на каждую страницу
    - **shared** | Компоненты используемые по всему приложению
      - **icon**
        - `icon.component.jsx` | переиспользуемый компонент иконки
        - `icon-types.constant.js` | импорт всех svg здесь
    - `app.router.tsx` | компонент react router
  - **layouts** | все возможные layouts приложения (тип файлов - `.layout.ts`)
  - **pages** | Папка со всеми страницами приложения
    - **photos** (тип файлов - `.page.ts`, `.module.scss`)
      - `[id].page.tsx`| пример динамических маршрутов
      - `photos.module.scss` | стили для страницы и ее подкомпонентов
      - **hooks** | Папка с хуками используемыми
      - **components** | Папка для хранения компонентов из которых состоит страница (тип файлов - `.component.ts`)
  - **store** | Папка с логикой редакса 
    - **photos** | Пример части редакса (тип файлов - `.actions.ts`, `.slice.ts`, `.interface.ts`)
      - **models** | Папка для хранения моделей части стора и типизации ответов апи rtk query
        - `photo.model.ts` | Пример модели
        - `photos-response.model.ts` | Пример типизации ответа
      - `photos.slice.ts` | Хранилище части редакса
      - `photos.api.ts` | `rtk query` logic
    - `base-query.ts` | базовый query для `rtk query`, их может быть несколько, в таком случае создаем папку queries
    - `store.hook.ts` | содержит хуки для взаимодействия с редаксом
    - `store.ts` | создание стора редакс
    - **utils** | вспомогательные функции для взаимодействия с логикой redux
  - **styles** | папка с глобальными стилями
    `global.scss` | все из папки `styles` импортируем сюда
  - `App.tsx` | высший компонент
  - `index.tsx` | точка входа в приложение

## Библиотеки

В данном темплейте большое внимание уделено следующим библиотекам

1. [nextjs](https://nextjs.org/docs/getting-started)
2. [redux toolkit + query](https://redux-toolkit.js.org/introduction/getting-started)
3. [eslint](https://eslint.org/docs/latest/rules/)
4. 
5. sass
6. [typescript](https://www.typescriptlang.org/docs/handbook/intro.html)
7. [usedapp](https://usedapp-docs.netlify.app/docs)
8. [husky](https://typicode.github.io/husky/#/)
9. [next-seo](https://github.com/garmeeh/next-seo)

## Наименование
!!! a Данные соглашения были прняты для максимального сходства проектов на `React` и `Next`

### 1. cebab-case, dot notaion
  - слова разделяются дефисом
  - все маленькие буквы
  - **названия файла**`.`**тип файла**`.`**(ts | scss)** и другие... (например file.interface.ts)
### 2. Типы
  1. Хоки начинать с приставки `with-` c типом `.hoc.ts`
  2. Хуки начинать с приставки `use-` c типом `.hook.ts`
  3. Константы - `.constant.ts`
  4. Services - `.service.ts`
  5. Utils - `.ts`
  6. Slices - `.slice.ts`
  7. Actions - `.actions.ts`
  8. Styles - `.module.scss`
  9. Pages - `index.page.tsx`
  10. Layouts - `.layout.tsx`
  11. RTK query api - `.api.ts`
  12. Models - `.model.ts`

### 3. Страницы  
  1. Имена папок страниц - `cebab case`
  2. В каждой папке со страницей должен присутстовать файл `index.page.ts` в котором находится сам компонент страницы => *пример* `pages/about/index.page.ts` 

## Conventions 
1. Никаких относительных импортов!!! то есть не должно быть такого `'../../../'`. Все делаем через настроенные **alias**, при необходимости можно добавить новые alias в проект
2. Для идентичности проектов `React` и `Next` пришлось выбрать варант наименования страниц где в каждой папке со страницей лежит файл `index.page.ts`
3. Для коммитов установлены конвенции сообщества, это простые правила которые приведут историю гита в порядок [commit conventions](https://www.conventionalcommits.org/en/v1.0.0/)

## Redux

Каждая часть глобалбного стора должна быть разделена по слайсам
Not all data must be in global state!

### Redux Toolkit

## Comming soon ...
1. cypress
2. jest
3. screenshoot testing

## Если есть желание улучшить конфиг

1. запустите `git clone https://github.com/Neca-development/nextjs-rtkquery-template.git`


