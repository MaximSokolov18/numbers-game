type ValidResult = {
    error?: string,
    isValid: boolean,
};

export const validInput = (newInputValue: Array<string>, prevInputValue?: string): ValidResult => {
    const validResult: ValidResult = {
        isValid: false,
    };

    if (newInputValue.length < 4) {
        validResult.error = 'Input should contain 4 numbers';
        return validResult;
    }

    if (new Set(newInputValue).size != 4) {
        validResult.error = 'All numbers should be unique';
        return validResult;
    }

    if (prevInputValue === newInputValue.join('')) {
        validResult.error = 'It was your prev attempts';
        return validResult;
    }

    validResult.isValid = true;
    return validResult;
};
