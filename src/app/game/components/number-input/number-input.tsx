import React, {ChangeEventHandler} from 'react';

type Props = {
    onBlur: ChangeEventHandler<HTMLInputElement>,
    onChange: ChangeEventHandler<HTMLInputElement>,
    value: string,
    error?: string,
};

export const NumberInput = ({onBlur, onChange, error, value}: Props) => {
    return (
        // TODO: style this input
        <div className="relative pt-4">
            <label htmlFor="your-number-input">Your number</label>
            <input
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                type="text"
                pattern="\d*"
                maxLength={4}
                placeholder="Your number"
                name="your-number"
                id='your-number-input'
            />
            <div className="text-red-600 h-6">{error ?? null}</div>
        </div>
    );
};
