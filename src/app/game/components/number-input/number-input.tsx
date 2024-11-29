import React, {ChangeEvent, ChangeEventHandler} from 'react';

type Props = {
    onBlur: (e: ChangeEvent<HTMLInputElement>, inputIndex: number) => void,
    onChange: (e: ChangeEvent<HTMLInputElement>, inputIndex: number) => void,
    values: Array<string>,
    maxLength: number,
    error?: string,
};

export const NumberInput = ({onBlur, onChange, error, values, maxLength}: Props) => {
    return (
        // TODO: style this input
        <div className="relative pt-4">
            <label>Your number</label>
            {Array(maxLength).fill('').map((_, index) => (
                <input
                    key={index}
                    onChange={e => onChange(e, index)}
                    value={values[index] ?? ''}
                    onBlur={e => onBlur(e, index)}
                    type="text"
                    pattern="\d*"
                    maxLength={1}
                    name={`your-${index}-number`}
                    className="w-4"
                />
            ))}
            <div className="text-red-600 h-6">{error ?? null}</div>
        </div>
    );
};
