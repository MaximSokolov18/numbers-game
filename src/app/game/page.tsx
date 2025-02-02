"use client";

import React, {ReactNode, useEffect, useState} from 'react';
import Confetti from 'react-confetti';
import {clsx} from 'clsx';

import {NumberInput} from './components/number-input';
import {AttemptsTable} from './components/attempts-table';
import {ChangeConfig, NumbersController} from './modules/numbers-controller';
import {ArrayNumbers, getRandomNumbers, getValueFromLocalStorage, setValueToLocalStorage} from '../utils';
import {validInput} from './utils';
import {ChangeStatus} from '@/app/game/modules/numbers-controller/numbers-controller';

type ResultOfAttempt = {
    guessed: number,
    correctPlaces: number,
    inputNumber: string,
}

const NUMBERS_GAME_HIDDEN_NUMBERS = 'NUMBERS_GAME_HIDDEN_NUMBERS';
const hiddenNumbersDefault = (getValueFromLocalStorage(NUMBERS_GAME_HIDDEN_NUMBERS) ?? []) as ArrayNumbers;
const NUMBERS_GAME_ATTEMPTS = 'NUMBERS_GAME_ATTEMPTS';
const DEFAULT_INPUT_VALUES = Array(4).fill('');

export default function Game() {
    const [hiddenNumbers, setHiddenNumbers] = useState<ArrayNumbers>(hiddenNumbersDefault);
    const [inputValues, setInputValues] = useState<Array<string>>(DEFAULT_INPUT_VALUES);
    const [resultOfAttempts, setResultOfAttempts] = useState<Array<ResultOfAttempt>>([]);
    const [error, setError] = useState<string>();

    const prevInputValue = resultOfAttempts?.at(-1)?.inputNumber;

    const setRandomHiddenNumbers = () => {
        const digits = getRandomNumbers();

        setHiddenNumbers(digits);
        setValueToLocalStorage<ArrayNumbers>(digits, NUMBERS_GAME_HIDDEN_NUMBERS);
    };

    useEffect(() => {
        setResultOfAttempts((getValueFromLocalStorage(NUMBERS_GAME_ATTEMPTS) ?? []) as Array<ResultOfAttempt>)

        if (!hiddenNumbers?.length) {
            setRandomHiddenNumbers();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const checkNumber = () => {
        const validResult = validInput(inputValues.filter(v => v), prevInputValue);
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
        setError('');
    };

    const onRestart = () => {
        setInputValues(DEFAULT_INPUT_VALUES);
        setResultOfAttempts([]);
        setValueToLocalStorage<Array<ResultOfAttempt>>([], NUMBERS_GAME_ATTEMPTS);
        setError('');

        setRandomHiddenNumbers();
    };

    const isNumberGuessed = prevInputValue === hiddenNumbers.join('');

    const onChangeNumberController = ({lastValue, changeStatus}: ChangeConfig) => {
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
    };

    return (
        <div className="flex flex-col gap-4">
            {isNumberGuessed ? <Confetti/> : null}
            <NumberInput values={inputValues} error={error}/>
            <div className="flex justify-center">
                <AttemptsTable>
                    {resultOfAttempts?.map(({guessed, correctPlaces, inputNumber}, index) => (
                        <tr key={index} className="even:bg-gray-100 odd:bg-white dark:even:bg-orange-200 dark:odd:bg-orange-300">
                            <td className="pl-2">{index + 1}</td>
                            <td className="pl-2">{inputNumber}</td>
                            <td className="pl-2">{guessed}/4</td>
                            <td className="pl-2">{correctPlaces}/4</td>
                        </tr>
                    )) as ReactNode[]}
                </AttemptsTable>
            </div>
            <div className="flex justify-center gap-4">
                <button
                    className={clsx('border border-black rounded-md px-4 py-2 w-max dark:border-amber-600 dark:text-amber-600', {
                        'border-zinc-500 text-zinc-500 dark:border-amber-600/50 dark:text-amber-600/50': isNumberGuessed
                    })}
                    onClick={checkNumber}
                    disabled={isNumberGuessed}>
                    Check number
                </button>
                <button
                    className="border border-black rounded-md px-4 py-2 w-max dark:border-amber-600 dark:text-amber-600"
                    onClick={onRestart}>
                    Restart
                </button>
            </div>
            <NumbersController maxLength={4} allValues={inputValues} onChange={onChangeNumberController}/>
        </div>
    );
};
