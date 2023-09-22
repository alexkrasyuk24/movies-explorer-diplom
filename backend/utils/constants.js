// Ключ для разработки и отладки приложения
const SICRET_KEY_SERVER_DEV = 'dev-secret';

// Ругулярное выражение
const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

// Статус создания нового ресурса
const CREATED_CODE = 201;

// Адрес для подключению к базе данных монго в каталог bitfilmsdb
const URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  SICRET_KEY_SERVER_DEV,
  URL_REGEX,
  CREATED_CODE,
  URL,
};
