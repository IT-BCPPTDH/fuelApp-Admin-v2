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


export function convertDateFormat(inputDate) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const dateObject = new Date(inputDate);
  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = months[dateObject.getMonth()];
  const year = dateObject.getFullYear().toString().slice(-2);

  return `${day}-${month}-${year}`;
}

export function convertDateFormatTime(inputDate) {
  // Parse the input date string
  const date = new Date(inputDate);

  // Extract date components
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Format the date string
  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}


// export function convertDateFormatTime(inputDate) {
//   // Parse the input date string as UTC
//   const date = new Date(inputDate + ' UTC');

//   // Extract UTC date components
//   const day = String(date.getUTCDate()).padStart(2, '0');
//   const month = String(date.getUTCMonth() + 1).padStart(2, '0');
//   const year = date.getUTCFullYear();
//   const hours = String(date.getUTCHours()).padStart(2, '0');
//   const minutes = String(date.getUTCMinutes()).padStart(2, '0');
//   const seconds = String(date.getUTCSeconds()).padStart(2, '0');

//   // Format the date string
//   const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

//   return formattedDate;
// }
