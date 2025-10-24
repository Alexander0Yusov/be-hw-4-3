//если специфических кодов будет много лучше разнести их в соответствующие модули

export enum DomainExceptionCode {
  // 🔧 Общие ошибки
  BadRequest = 400, // Невалидные данные
  Unauthorized = 401, // Неавторизован
  Forbidden = 403, // Нет прав
  NotFound = 404, // Не найдено
  TooManyRequests = 429, // Лимит запросов
  InternalServerError = 500, // Внутренняя ошибка сервера

  // 🔐 Ошибки авторизации
  EmailNotConfirmed = 401, // Email не подтверждён
  ConfirmationCodeExpired = 401, // Код подтверждения истёк
  PasswordRecoveryCodeExpired = 401, // Код восстановления истёк

  // 🧼 Валидация
  ValidationError = 400, // Ошибка валидации
}
