import React from 'react';

type Props = {
    children?: Element[],
};

export const AttemptsTable = ({children}: Props) => (
    <div className="overflow-auto block box-content max-h-[40svh] w-max text-left">
        <table className="border-0">
            <caption className="h-0">Your attempts</caption>
            <thead>
            <tr>
                <th className="sticky top-0 bg-emerald-300 pl-2 xl:w-[5svw] w-[13svw]">#</th>
                <th className="sticky top-0 bg-emerald-300 pl-2 xl:w-[10svw] w-[25svw]">Number</th>
                <th className="sticky top-0 bg-emerald-300 pl-2 xl:w-[10svw] w-[25svw]">Guessed</th>
                <th className="sticky top-0 bg-emerald-300 pl-2 xl:w-[10svw] w-[25svw]">Correct places</th>
            </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    </div>
);