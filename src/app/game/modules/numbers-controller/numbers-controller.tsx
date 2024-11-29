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
            const lastValue = numberElement.textContent;
            let changeConfig: ChangeConfig = {
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
    }, [allValues, maxLength]);

    return (
        <div className="flex justify-between" onClick={onClick}>
            {ALL_DIGITS_NUMBERS.map(number => (
                <div key={number} className={clsx(
                    'number rounded-lg border border-black py-3 px-2 text-xl font-bold cursor-pointer', {
                        'border border-zinc-200 text-zinc-200': allValues.includes(number.toString()),
                    }
                )}>
                    {number}
                </div>
            ))}
        </div>
    );
};
