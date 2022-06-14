# Notify-system
Система представляет собой два node.js приложения, реализующие требования в **SPECIFICATION.md**

## Архитектура приложений
Приложения написаны на JS ES6+ с применением fastify.js, для хранения данных применяется postgresql

### Структура директорий приложения
```
rest-api/
├── resources
│   └── entity
│       ├── en.controller.js
│       ├── en.model.js
│       ├── en.repository.js
│       ├── en.router.js
│       ├── en.service.js
│       └── en.validator.js
├── app.js
├── config.js
└── server.js
```

### Описание
* **en.router.js** -> работа с запросом и ответом, передает управление контроллеру.
* **en.service.js** -> бизнес-логика.
* **en.controller.js** -> связывает роутер и сервис (бизнес-логику), отвечает за формирование ответа от сервера (код ответа, тело и т.д.).
* **en.model.js** -> модель сущности.
* **en.repository.js** -> работа с хранилищем данных.
* **en.validator.js** -> валидация тела/параметров запроса.
---
* **app.js** -> функция фабрика для сборки приложения.
* **server.js** -> функция запуска собранного приложения + отлов не пойманых эксепшенов.

## Установка и запуск
Необходимо склонировать репозиторий. Приложения требуют СУБД PostgreSQL.
Далее требуется создать пользователей и базы данных для сервисов и прописать их в .env файлы.
Далее необходимо выполнить скпипты для создания таблиц
```
node --experimental-specifier-resolution=node vk-api-stub/src/scripts/create_table_players.js
node --experimental-specifier-resolution=node vk-api-stub/src/scripts/filldata.js

node --experimental-specifier-resolution=node notify-service/src/scripts/db-create-notifications.js
node --experimental-specifier-resolution=node notify-service/src/scripts/db-create-players.js
node --experimental-specifier-resolution=node notify-service/src/scripts/db-fill.js
```

Далее происходит запуск сервисов из соотвествующих директорий при помощи команды:
```
node --experimental-specifier-resolution=node src/server.js
```
