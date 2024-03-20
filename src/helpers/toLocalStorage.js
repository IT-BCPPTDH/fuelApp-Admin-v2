// import msgpack from 'msgpack-lite';

export const toLocalStorage = (name,data) =>{
    // data = msgpack.encode(data)
    let n = JSON.stringify(data)
    localStorage.setItem(`${name}`,n)
}

export const getLocalStorage =  (name) =>{
    let n = localStorage.getItem(`${name}`)
    n = JSON.parse(n)
    // n = msgpack.decode(n)
    return n
}

export const sortArray = (array, sortDirection = 'asc') => {
    if (array && Array.isArray(array)) {
        array.sort((a, b) => {
            if (sortDirection === 'asc') {
                return a.localeCompare(b); // Sort ascending
            } else {
                return b.localeCompare(a); // Sort descending
            }
        });
    }
    return array;
}
