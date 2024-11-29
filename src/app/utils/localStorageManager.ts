export const getValueToLocalStorage = (key: string) => {
    try {
        return JSON.parse(localStorage.getItem(key) ?? '{value: null}')?.value;
    } catch (e) {
        console.error(e);
        return null
    }
}

export const setValueToLocalStorage = <T>(value: T, key: string) => {
    localStorage.setItem(key, JSON.stringify({value}));
}
