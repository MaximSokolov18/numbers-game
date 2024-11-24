type ValidResult = {
    error?: string,
    isValid: boolean,
};

export const validInput = (newInputValue: string, prevInputValue?: string): ValidResult => {
    const validResult: ValidResult = {
        isValid: false,
    };

    const inputNumbers = newInputValue.split('');

    if (inputNumbers.length < 4) {
        validResult.error = 'Input should contain 4 numbers';
        return validResult;
    }

    if (new Set(inputNumbers).size != 4) {
        validResult.error = 'All numbers should be unique';
        return validResult;
    }

    if (prevInputValue === newInputValue) {
        validResult.error = 'It was your prev attempts';
        return validResult;
    }

    validResult.isValid = true;
    return validResult;
};
