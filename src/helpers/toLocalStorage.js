export const toLocalStorage = (name,data) =>{
    let n = JSON.stringify(data)
    localStorage.setItem(`${name}`,n)
}

export const getLocalStorage = (name) =>{
    let n = localStorage.getItem(`${name}`)
    n = JSON.parse(n)
    return n
}
