import React from 'react';

type Props = {}

export const NumberInput = ({}: Props) => {
    return (
        // TODO: style this input
        <div className="relative pt-4 ">
            <input
                type="text"
                pattern="\d*"
                maxLength={4}
                placeholder="Your number"
                name="your-number"
                id='your-number-input'
            />
            <label htmlFor="your-number-input">Your number</label>
        </div>
    );
};
