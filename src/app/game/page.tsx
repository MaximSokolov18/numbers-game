"use client";

import React, {FormEvent, ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import Confetti from 'react-confetti';
import {clsx} from 'clsx';

import {NumberInput} from './components/number-input';
import {AttemptsTable} from './components/attempts-table';
import {ChangeConfig, NumbersController} from './modules/numbers-controller';
import {getValueToLocalStorage, setValueToLocalStorage} from '../utils';
import {validInput} from './utils';
import {ChangeStatus} from '@/app/game/modules/numbers-controller/numbers-controller';

type HiddenNumbers = Array<number>;
type ResultOfAttempt = {
    guessed: number,
    correctPlaces: number,
    inputNumber: string,
}

const NUMBERS_GAME_HIDDEN_NUMBERS = 'NUMBERS_GAME_HIDDEN_NUMBERS';
const hiddenNumbersDefault = (getValueToLocalStorage(NUMBERS_GAME_HIDDEN_NUMBERS) ?? []) as HiddenNumbers;
const NUMBERS_GAME_ATTEMPTS = 'NUMBERS_GAME_ATTEMPTS';
const DEFAULT_INPUT_VALUES = Array(4).fill('');

export default function Game() {
    const [hiddenNumbers, setHiddenNumbers] = useState<HiddenNumbers>(hiddenNumbersDefault);
    const [inputValues, setInputValues] = useState<Array<string>>(DEFAULT_INPUT_VALUES);
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
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onChangeInput = useCallback((e: FormEvent<HTMLInputElement>, index: number) => {
        const newInputValue = e.currentTarget.value;

        setInputValues(currValues => currValues.map((v, i) => i === index ? newInputValue : v));
    }, []);
    const onBlurInput = useCallback((e: FormEvent<HTMLInputElement>, index: number) => {
        const newInputValue = e.currentTarget.value;
        const newValues = inputValues.map((v, i) => i === index ? newInputValue : v)

        const validResult = validInput(newValues, prevInputValue);
        if (!validResult.isValid) {
            setError(validResult.error);
            return;
        }

        setInputValues(newValues);
        setError('');
    }, [prevInputValue, inputValues])

    const checkNumber = useCallback(() => {
        const validResult = validInput(inputValues, prevInputValue);
        if (!validResult.isValid) {
            setError(validResult.error);
            return;
        }

        const newAttempt = {
            guessed: 0,
            correctPlaces: 0,
            inputNumber: '',
        };

        inputValues.forEach((number, index) => {
            const indexInHiddenNumber = hiddenNumbers?.indexOf(+number);

            const isGuessedNumber = indexInHiddenNumber !== -1;
            const isCorrectPlace = indexInHiddenNumber === index;

            newAttempt.guessed += isGuessedNumber ? 1 : 0;
            newAttempt.correctPlaces += isCorrectPlace ? 1 : 0;
        });

        newAttempt.inputNumber = inputValues.join('');

        const newResultOfAttempts = resultOfAttempts.concat(newAttempt);
        setResultOfAttempts(newResultOfAttempts);
        setValueToLocalStorage<Array<ResultOfAttempt>>(newResultOfAttempts, NUMBERS_GAME_ATTEMPTS);

        setInputValues(DEFAULT_INPUT_VALUES);
    }, [inputValues, hiddenNumbers, resultOfAttempts, prevInputValue]);

    const onRestart = useCallback(() => {
        setInputValues(DEFAULT_INPUT_VALUES);
        setResultOfAttempts([]);
        setValueToLocalStorage<Array<ResultOfAttempt>>([], NUMBERS_GAME_ATTEMPTS);

        setRandomHiddenNumbers();
    }, [setRandomHiddenNumbers]);

    const isNumberGuessed = prevInputValue === hiddenNumbers.join('');

    const onChangeNumberController = useCallback(({lastValue, changeStatus}: ChangeConfig) => {
        const newInputValues = [...inputValues];

        if (changeStatus === ChangeStatus.REMOVE) {
            const indexOfNumber = newInputValues.indexOf(lastValue);
            newInputValues[indexOfNumber] = '';
        }

        if (changeStatus === ChangeStatus.ADD) {
            const indexOfEmpty = newInputValues.indexOf('');
            newInputValues[indexOfEmpty] = lastValue;
        }

        setInputValues(newInputValues);
    }, [inputValues]);

    return (
        <div className="flex flex-col gap-4">
            {isNumberGuessed ? <Confetti/> : null}
            <NumberInput
                onChange={onChangeInput}
                values={inputValues}
                onBlur={onBlurInput}
                error={error}
                maxLength={4}
            />
            <div className="flex gap-4 mb-12">
                <button
                    className={clsx('border border-black rounded-md px-4 py-2 w-max', {
                        'border-zinc-500 text-zinc-500': isNumberGuessed
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
                    {resultOfAttempts?.map(({guessed, correctPlaces, inputNumber}, index) => (
                        <tr key={index} className="even:bg-gray-100 odd:bg-white">
                            <td className="pl-2">{index + 1}</td>
                            <td className="pl-2">{inputNumber}</td>
                            <td className="pl-2">{guessed}/4</td>
                            <td className="pl-2">{correctPlaces}/4</td>
                        </tr>
                    )) as ReactNode[]}
                </AttemptsTable>
            </div>
            <NumbersController maxLength={4} allValues={inputValues} onChange={onChangeNumberController}/>
        </div>
    );
};
