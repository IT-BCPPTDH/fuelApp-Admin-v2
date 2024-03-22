export const getURLPath=()=>{
    const currentURL = window.location.href;
    const urlParts = currentURL.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    return lastPart
}

export const generateID=()=>{
    const now = new Date()
    return now.getTime()
}


export const generateIDByDate = () => {
    const date = new Date()
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${day}-${month}-${year}`;
  }