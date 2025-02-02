
export type ArrayNumbers = Array<number>;
type GetRandomNumbers = (length?: number) => Array<number>;

export const getRandomNumbers: GetRandomNumbers = (length = 4) => {
    const digits: ArrayNumbers = [];

    while (digits.length < length) {
        const randomDigit = Math.floor(Math.random() * 10);

        if (!digits.includes(randomDigit)) {
            digits.push(randomDigit);
        }
    }

    return digits;
};
