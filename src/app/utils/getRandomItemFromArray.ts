type GetRandomItemFromArray = <T>(items: Array<T>) => T;

export const getRandomItemFromArray: GetRandomItemFromArray = items => {
    return items[Math.floor(Math.random() * items.length)]
};
