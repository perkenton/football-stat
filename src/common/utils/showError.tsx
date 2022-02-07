import { message } from 'antd';
import { AxiosError } from 'axios';

function getErrorMessage(status: number) {
  switch (status) {
    case 400:
      return 'Неверный запрос.';
    case 404:
      return 'Не найдено.';
    case 429:
      return 'Слишком частые запросы. Увы, для приложения используется бесплатный доступ к данным. Попробуйте позже.'
    default:
      return 'Ошибка. Попробуйте перезагрузить страницу.'
  }
}

function showError(errorRes: AxiosError) {
  message.error({
    content: `${getErrorMessage(errorRes.request.status)}`,
    duration: 7,
    style: { maxWidth: '300px', margin: '0 auto' },
  });
}

export default showError;