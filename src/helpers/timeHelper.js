export const calculateTotalTimeFromArray = timeArray => {
  const totalMinutes = timeArray.reduce((total, formattedTime) => {
    const [hours, minutes] = formattedTime.split('.').map(Number)
    return total + hours * 60 + minutes
  }, 0)

  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMinutes = totalMinutes % 60
  const formattedTotalTime = `${String(totalHours).padStart(2, '0')}.${String(
    remainingMinutes
  ).padStart(2, '0')}`

  return formattedTotalTime
}

export const calculateTotalTime = (startTime, endTime) => {
  const [startHours, startMinutes, startSeconds] = startTime
    .split('.')
    .map(Number)
  const [endHours, endMinutes, endSeconds] = endTime.split('.').map(Number)
  const totalStartSeconds =
    startHours * 3600 + startMinutes * 60 + startSeconds
  const totalEndSeconds = endHours * 3600 + endMinutes * 60 + endSeconds
  const timeDifferenceSeconds = totalEndSeconds - totalStartSeconds
  const hours = Math.floor(timeDifferenceSeconds / 3600)
  const minutes = Math.floor((timeDifferenceSeconds % 3600) / 60)
  const formattedTotalTime = `${String(hours).padStart(2, '0')}.${String(
    minutes
  ).padStart(2, '0')}`

  return formattedTotalTime
}

export const formatTime = input => {
  const parts = input.split('.')

  let hours = parseInt(parts[0], 10) || 0
  let minutes = parseInt(parts[1], 10) || 0

  if (minutes < 10 && parts[1] && parts[1].length === 1) {
    minutes *= 10
  }

  hours = Math.min(23, Math.max(0, hours))
  minutes = Math.min(59, Math.max(0, minutes))

  const formattedTime = `${String(hours).padStart(2, '0')}.${String(
    minutes
  ).padStart(2, '0')}.00`

  return formattedTime
}

export function calculateAndConvertDuration(startTime, endTime) {

  const start = new Date(`1970-01-01T${startTime.replace(/\./g, ':')}`);
  const end = new Date(`1970-01-01T${endTime.replace(/\./g, ':')}`);

  if (isNaN(start) || isNaN(end)) {
    console.error('Invalid date or time format');
    return {
      duration: NaN,
      convertDuration: "Invalid date or time format",
    };
  }

  const durationMinutes = (end - start) / (1000 * 60);

  if (isNaN(durationMinutes)) {
    console.error('Invalid duration calculation');
    return {
      duration: NaN,
      convertDuration: "Invalid duration calculation",
    };
  }

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  return {
    duration: durationMinutes,
    convertDuration: `${hours},${String(minutes).padStart(2, '0')}`
  };
}

export function convertToAMPM(time) {
  // eslint-disable-next-line no-unused-vars
  const [hours, minutes, seconds] = time.split('.').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = ((hours % 12) || 12).toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  // const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes} ${period}`;
}

export function calculateMidnightTime(startTime, endTime) {

  const [startHour, startMinute] = startTime.split('.').map(Number);
  const [endHour, endMinute] = endTime.split('.').map(Number);

  const totalStartMinutes = startHour * 60 + startMinute;
  const totalEndMinutes = (endHour === 0 ? 24 : endHour) * 60 + endMinute;

  let elapsedMinutes;
  if (totalEndMinutes < totalStartMinutes) {
    elapsedMinutes = (24 * 60 - totalStartMinutes) + totalEndMinutes;
  } else {
    elapsedMinutes = totalEndMinutes - totalStartMinutes;
  }

  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const remainingMinutes = elapsedMinutes % 60;

  const formattedHours = String(elapsedHours).padStart(2, '0');
  const formattedMinutes = String(remainingMinutes).padStart(2, '0');

  return `${formattedHours}.${formattedMinutes}`;
}

function checkNumber(num1, num2) {
  function convertToNumber(str) {
    const [integerPart, decimalPart, fractionalPart] = str.split(/[.,]/);
    const decimal = (decimalPart || '0') + (fractionalPart || '');
    return parseFloat(`${integerPart}.${decimal}`);
  }

  const number1 = convertToNumber(num1.replace('.', '').replace(',', '.'));
  const number2 = convertToNumber(num2.replace('.', '').replace(',', '.'));

  const largerNumber = Math.max(number1, number2);
  const smallerNumber = Math.min(number1, number2);
  return {
    largerNumber,
    smallerNumber
  }
}

export function checkValidHMAkhir(num1, num2) {

  const tNumber = checkNumber(num1, num2)

  return (tNumber.largerNumber > tNumber.smallerNumber) ? true : false

}

export function calculateDifference(num1, num2) {

  const tNumber = checkNumber(num1, num2)

  const difference = tNumber.largerNumber - tNumber.smallerNumber;
  const roundedDifference = Math.round(difference * 1000) / 1000;
  const formattedDifference = roundedDifference.toString().replace('.', ',');

  return formattedDifference;
}
