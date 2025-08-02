# Интернет-магазин "Веб-ларек"

Интернет-магазин "Веб-ларек", в котором можно посмотреть каталог товаров, добавить их в корзину и оформить заказ.

## Стек технологий
- HTML  
- SCSS  
- TypeScript  
- Webpack  

## Выполненные задачи
- Разработала документацию (описала типы данных, методы и парадигму MVP)  
- Реализовала оформление заказа и его отправку на сервер  

## Демо
Доступно по адресу: [https://lovhurma.github.io/](https://lovhurma.github.io/)  

## Установка и запуск  
Для установки и запуска проекта необходимо выполнить команды:  

```bash
npm install
npm run start
```
Или:

```bash
yarn
yarn start
```
## Сборка проекта

```bash
npm run build
```
Или:
```bash
yarn build
```
## Типы данных

```bash
export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

export type TConstructorIngredient = TIngredient & {
  id: string;
};

export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TUser = {
  email: string;
  name: string;
};

export type TTabMode = 'bun' | 'sauce' | 'main';
  ```

  ## Архитектура приложения

  Кодовая база приложения организована по принципу MVP (Model-View-Presenter) и разделена на три ключевых слоя:

Слой представления (View)
Отвечает за визуализацию данных и взаимодействие с пользователем.

Слой данных (Model)
Управляет хранением, обработкой и состоянием данных.

Презентер (Presenter)
Координирует взаимодействие между View и Model, обрабатывая логику приложения.

Пример workflow
Для связи между слоями применен событийно-ориентированный подход. Рассмотрим сценарий:

Действие пользователя:

Пользователь кликает на карточку.

Класс Card (View) фиксирует действие и генерирует событие card:select.

Обработка в презентере:

Презентер ловит событие card:select.

Вызывает метод setPreview у модели данных, чтобы обновить состояние.

Обновление модели:

Меняет значение поля preview.

Генерирует событие preview:change.

Реакция представления:

Презентер обрабатывает preview:change.

Инициирует перерисовку CardPreview (View), передавая актуальные данные из модели.

Таким образом, каждый слой остается изолированным, а коммуникация между ними происходит через четко определенные события.
