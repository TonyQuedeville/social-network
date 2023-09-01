/*
	Projet Zone01 : Social network
	Tony Quedeville 
	14/07/2023
	Converti une date "aaaa-mm-jj" au format "jj-mm-aaaa"
  installation : // npm install moment moment-timezone
*/

import moment from 'moment';
//import 'moment-timezone';

export default function FrenchFormatDateConvert(dateString) {
  if (dateString) {
    const date = moment.utc(dateString);

    const formattedDate = date.format(date.hours() !== 0 ? 'DD-MM-YYYY HH:mm:ss' : 'DD-MM-YYYY');
    return formattedDate;
  } else {
    const now = moment();
    const formattedNow = now.format('DD-MM-YYYY HH:mm:ss');
    return formattedNow;
  }
}
