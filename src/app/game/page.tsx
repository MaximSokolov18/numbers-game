"use client";

import React, {ChangeEventHandler, FormEvent, useCallback, useEffect, useMemo, useState} from 'react';
import Confetti from 'react-confetti'
import {clsx} from 'clsx';

import {getValueToLocalStorage, setValueToLocalStorage} from '../utils';
import {NumberInput} from './components/number-input';
import {AttemptsTable} from './components/attempts-table';
import {validInput} from './utils';

type HiddenNumbers = Array<number>;
type ResultOfAttempt = {
    guessed: number,
    correctPlaces: number,
    inputNumber: string,
}

const NUMBERS_GAME_HIDDEN_NUMBERS = 'NUMBERS_GAME_HIDDEN_NUMBERS';
const hiddenNumbersDefault = (getValueToLocalStorage(NUMBERS_GAME_HIDDEN_NUMBERS) ?? []) as HiddenNumbers;
const NUMBERS_GAME_ATTEMPTS = 'NUMBERS_GAME_ATTEMPTS';

export default function Game() {
    const [hiddenNumbers, setHiddenNumbers] = useState<HiddenNumbers>(hiddenNumbersDefault);
    const [inputValue, setInputValue] = useState<string>('');
    const [resultOfAttempts, setResultOfAttempts] = useState<Array<ResultOfAttempt>>([]);
    const [error, setError] = useState<string>();

    const prevInputValue = useMemo(() => resultOfAttempts?.at(-1)?.inputNumber, [resultOfAttempts]);

    const setRandomHiddenNumbers = useCallback(() => {
        const digits: HiddenNumbers = [];

        while (digits.length < 4) {
            const randomDigit = Math.floor(Math.random() * 10);

            if (!digits.includes(randomDigit)) {
                digits.push(randomDigit);
            }
        }

        setHiddenNumbers(digits);
        setValueToLocalStorage<HiddenNumbers>(digits, NUMBERS_GAME_HIDDEN_NUMBERS);
    }, []);

    useEffect(() => {
        setResultOfAttempts((getValueToLocalStorage(NUMBERS_GAME_ATTEMPTS) ?? []) as Array<ResultOfAttempt>)

        if (!hiddenNumbers?.length) {
            setRandomHiddenNumbers();
        }
    }, []);

    const onChangeInput = useCallback((e: FormEvent<HTMLInputElement>) => {setInputValue(e.currentTarget.value)}, []);
    const onBlurInput: ChangeEventHandler<HTMLInputElement> = useCallback((e: FormEvent<HTMLInputElement>) => {
        const currentInputValue = e.currentTarget.value;

        const validResult = validInput(currentInputValue, prevInputValue);
        if (!validResult.isValid) {
            setError(validResult.error);
            return;
        }

        setInputValue(currentInputValue);
        setError('');
    }, [prevInputValue])

    const checkNumber = useCallback(() => {
        const validResult = validInput(inputValue, prevInputValue);
        if (!validResult.isValid) {
            setError(validResult.error);
            return;
        }

        const newAttempt = {
            guessed: 0,
            correctPlaces: 0,
            inputNumber: '',
        };

        inputValue.split('').forEach((number, index) => {
            const indexInHiddenNumber = hiddenNumbers?.indexOf(+number);

            const isGuessedNumber = indexInHiddenNumber !== -1;
            const isCorrectPlace = indexInHiddenNumber === index;

            newAttempt.guessed += isGuessedNumber ? 1 : 0;
            newAttempt.correctPlaces += isCorrectPlace ? 1 : 0;
        });

        newAttempt.inputNumber = inputValue;

        const newResultOfAttempts = resultOfAttempts.concat(newAttempt);
        setResultOfAttempts(newResultOfAttempts);
        setValueToLocalStorage<Array<ResultOfAttempt>>(newResultOfAttempts, NUMBERS_GAME_ATTEMPTS);

        setInputValue('');
    }, [inputValue, hiddenNumbers, resultOfAttempts, prevInputValue]);

    const onRestart = useCallback(() => {
        setInputValue('');
        setResultOfAttempts([]);
        setValueToLocalStorage<Array<ResultOfAttempt>>([], NUMBERS_GAME_ATTEMPTS);

        setRandomHiddenNumbers();
    }, []);

    const isNumberGuessed = prevInputValue === hiddenNumbers.join('');

    return (
        <div className="flex flex-col gap-4">
            {isNumberGuessed ? <Confetti/> : null}
            <NumberInput
                onChange={onChangeInput}
                value={inputValue}
                onBlur={onBlurInput}
                error={error}
            />
            <div className="flex gap-4 mb-12">
                <button
                    className={clsx('border border-black rounded-md px-4 py-2 w-max', {
                        'border-b-zinc-500 text-zinc-500': isNumberGuessed
                    })}
                    onClick={checkNumber}
                    disabled={isNumberGuessed}>
                    Check number
                </button>
                <button
                    className="border border-black rounded-md px-4 py-2 w-max"
                    onClick={onRestart}>
                    Restart
                </button>
            </div>
            <div className="flex justify-center">
                <AttemptsTable>
                    {resultOfAttempts?.map(({guessed, correctPlaces, inputNumber, numberOfAttempt}, index) => (
                        <tr key={index} className="even:bg-gray-100 odd:bg-white">
                            <td className="pl-2">{index + 1}</td>
                            <td className="pl-2">{inputNumber}</td>
                            <td className="pl-2">{guessed}/4</td>
                            <td className="pl-2">{correctPlaces}/4</td>
                        </tr>
                    )) as Element[]}
                </AttemptsTable>
            </div>
        </div>
    );
};
