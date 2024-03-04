export const getURLPath=()=>{
    const currentURL = window.location.href;
    const urlParts = currentURL.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    return lastPart
}