/* Converti une date "aaaa-mm-jj" au format "jj-mm-aaaa" */
export default function FrenchFormatDateConvert(dateString) {
    const [year, month, day] = dateString.split('-');
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}
