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