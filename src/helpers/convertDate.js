export const forSocket = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
}

export const dateToString = (date) => {
  let dt = date.split('-')
  const year = dt[1].substring(0, 4);
  const month = dt[1].substring(4, 6) - 1;
  const day = dt[1].substring(6, 8);
  const dateObject = new Date(year, month, day);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = dateObject.toLocaleDateString('id-ID', options);

  return formattedDate;
}

export const indonesianDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${day}-${month}-${year}`;
}

