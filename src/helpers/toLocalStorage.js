import msgpack from 'msgpack-lite';

export const toLocalStorage = (name,data) =>{
    // data = msgpack.encode(data)
    let n = JSON.stringify(data)
    localStorage.setItem(`${name}`,n)
}

export const getLocalStorage = (name) =>{
    let n = localStorage.getItem(`${name}`)
    n = JSON.parse(n)
    // n = msgpack.decode(n)
    return n
}
