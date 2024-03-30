  export const getShift = () =>{
    const now = new Date()
    const currentHour = now.getHours()

    let shift = ''

    if (currentHour >= 6 && currentHour < 18) {
      shift = 'Day'
    } else {
      shift = 'Night'
    }

    return shift
  }

  export const hasValuesInNestedArray = (arr) => {
  
    if (Array.isArray(arr[0]) && arr[0].length > 0) {
        const nestedArr = arr[0];
        for (let i = 0; i < 4; i++) {
            if (!nestedArr[i]) {
                return false;
            }
        }
        return true;
    }
    return false;
}