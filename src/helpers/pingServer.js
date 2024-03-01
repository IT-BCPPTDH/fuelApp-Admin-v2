import Transaksi from "../services/inputCoalHauling";

export const pingServer = async () => {
    try {
        return await Transaksi.pingServer();
       } catch (error) {
        return false 
       }
}

export const pingInterval =  () => {
    return  setInterval(async ()=>{
       return await pingServer()
    }, 50000);
}

export const clearInterval = (fn) =>{
    clearInterval(fn)
}
