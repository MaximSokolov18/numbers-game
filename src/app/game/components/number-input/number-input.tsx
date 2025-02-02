import React from 'react';

type Props = {
    values: Array<string>,
    error?: string,
};

export const NumberInput = ({error, values}: Props) => {
    return (
        <div className="flex flex-col gap-2 items-center">
            <div className="flex justify-center pt-4 w-full">
                <div className="flex gap-2">
                    {values.map((item, index) => (
                        <span key={index} className="w-5 font-semibold text-3xl dark:text-orange-500">
                            {item || '?'}
                        </span>
                    ))}
                </div>
            </div>
            <div className="text-red-600 h-6">{error ?? null}</div>
        </div>
    );
};
