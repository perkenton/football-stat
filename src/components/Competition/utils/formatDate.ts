import moment from 'moment';
import 'moment/locale/ru';

export default function formatDate(date: string) {
  return moment.utc(date).format('DD MMM YYYY');
}