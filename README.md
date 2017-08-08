# twitch-helper
React-redux-app с сервером на коа2. Взаимодействие с апи твича

## **MongoDB**
Перед запуском нужно запустить базу `sudo mongod --dbpath <путь к папке>`

## **Запуск**
`npm install`
`NODE_ENV=prod node server.js`
`npm start`

Можно в `package.json` запускать через babel, включив в команду npm start.

## **Последовательность действий и работы**
* Запуск node и react
* Авторизация -> регистрация.
* После ввода будет отправлено письмо на почту с ссылкой подтверждения(дейстивительна 24 часа, потом удалится)
* После подтверждения, создается постоянный юзер, временный удаляется
* Авторизация -> login
* После логина, создается сессия и гоняется туда сюда токен авторизации, подтверждающий текущую сессию пользователя, который каждый раз проверяется на сервере
* После авторизации доступен поиск видео - в поисковой строке нужно вбить название канала (по умолчанию задано `lck1`, можно просто нажать найти)
* Отправляются данные на сервер, сервер взаимодействует с апи твича:
 1) По имени узнает айди канала
 2) ПО айди канала достает все видео
* После этого подгружаются превью видео и ссылки на видео на страницу.
* При наведении на картинку(hover) отображатеся title видео, также взятый из апи
* Кликнув на картинку - переходишь на просмотр видео на твиче
