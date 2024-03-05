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