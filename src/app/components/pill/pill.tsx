import React from 'react';
import {clsx} from 'clsx';
import {PillColor, PillRotation} from './types';

type Props = {
    text: string | number,
    color: PillColor,
    rotation: PillRotation,
}

export const Pill = ({color, text, rotation}: Props) => {
    const classNames = clsx('rounded-xl py-1 px-6 text-xl font-semibold grow', {
        [color]: color,
        [rotation]: rotation,
    });

    return (
        <div className={classNames}>
            {text}
        </div>
    );
};
