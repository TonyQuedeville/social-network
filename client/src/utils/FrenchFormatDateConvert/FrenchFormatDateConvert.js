/* Converti une date "aaaa-mm-jj" au format "jj-mm-aaaa" */

import moment from 'moment'; // npm install moment moment-timezone
//import 'moment-timezone';

export default function FrenchFormatDateConvert(dateString) {
  const date = moment.utc(dateString);

  const formattedDate = date.format(date.hours() !== 0 ? 'DD-MM-YYYY HH:mm:ss' : 'DD-MM-YYYY');
  return formattedDate;
}
