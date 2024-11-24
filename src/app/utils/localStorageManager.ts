export const setValueToLocalStorage = <T>(value: T, key: string) => {
    localStorage.setItem(key, JSON.stringify({value}));
}

export const getValueToLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key))?.value;
}