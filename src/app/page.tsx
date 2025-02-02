import React from 'react';
import Link from 'next/link';
import {Pill, PILL_COLORS, PILL_ROTATIONS, PillColor, PillRotation} from './components/pill';
import {getRandomNumbers, getRandomItemFromArray} from './utils';

const arrayOfColors = Object.values(PILL_COLORS);
const arrayOfRotations = Object.values(PILL_ROTATIONS);
const numbers = Array(300).fill(1).map(() => getRandomNumbers());

export default function Home() {
    return (
        <div>
            <div className="flex justify-center flex-wrap gap-x-4 gap-y-20 px-7 py h-screen overflow-hidden">
                {numbers.map((number, index) => (
                    <Pill
                        key={index}
                        text={number.join('')}
                        color={getRandomItemFromArray<PillColor>(arrayOfColors)}
                        rotation={getRandomItemFromArray<PillRotation>(arrayOfRotations)}
                    />
                ))}
            </div>
            <div className="absolute top-0 left-0 w-screen h-screen flex justify-center content-center flex-wrap">
                <Link href="/game">
                <span
                    className="
                        transition ease-in-out hover:-translate-y-1 duration-300 hover:scale-110
                        flex px-6 py-3 rounded-xl border-2 hover:shadow-xl shadow-lg
                        font-semibold text-3xl
                        bg-white dark:bg-black dark:border-orange-600 dark:text-white
                    ">
                    Play
                </span>
                </Link>
            </div>
        </div>
    );
}
