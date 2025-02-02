import React, {MouseEvent, useCallback,} from 'react';
import {clsx} from 'clsx';

const ALL_DIGITS_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export enum ChangeStatus {
    ADD ='ADD',
    REMOVE = 'REMOVE',
    NONE = 'NONE',
}

export type ChangeConfig = {
    lastValue: string,
    changeStatus: ChangeStatus,
};
type Props = {
    onChange: (changeConfig: ChangeConfig) => void,
    maxLength: number,
    allValues: Array<string>,
}

export const NumbersController = ({onChange, maxLength, allValues}: Props) => {
    const onClick = useCallback((e: MouseEvent) => {
        const numberElement = e.target as HTMLDivElement;
        const isValid = maxLength > allValues.filter(v => v).length

        if (numberElement.classList.contains('number')) {
            const lastValue = numberElement.textContent ?? '';
            const changeConfig: ChangeConfig = {
                lastValue,
                changeStatus: ChangeStatus.NONE,
            };

            if (allValues.includes(lastValue)) {
                changeConfig.changeStatus = ChangeStatus.REMOVE;
            }

            if (!allValues.includes(lastValue) && isValid) {
                changeConfig.changeStatus = ChangeStatus.ADD;
            }

            if (changeConfig.changeStatus !== ChangeStatus.NONE) {
                onChange(changeConfig);
            }
        }
    }, [allValues, maxLength, onChange]);

    return (
        <div className="grid grid-cols-5 gap-6" onClick={onClick}>
            {ALL_DIGITS_NUMBERS.map(number => (
                <div key={number} className={clsx(
                    'number rounded-lg py-3 text-xl font-bold cursor-pointer text-center', {
                        'bg-orange-400': !allValues.includes(number.toString()),
                        'outline-none bg-orange-500 ring-4 ring-orange-300 dark:ring-orange-700': allValues.includes(number.toString()),
                    }
                )}>
                    {number}
                </div>
            ))}
        </div>
    );
};
