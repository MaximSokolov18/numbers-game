import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import brainTeasers from '@/assets/images/brain-teasers.jpg';

export default function Home () {
    return (
        <div className="flex flex-col justify-start items-center w-screen px-10 py-10">
            <h1 className="text-2xl font-bold mb-15 text-center">Welcome to Number Game: Boost Your Brain with Engaging
                Brain Teasers and Exercises</h1>
            <div className="md:max-w-[765px] mb-10 text-center">
                <h2>Challenge Your Mind with Fun Brain Games</h2>
                <p>
                    At Number Game, we believe in the power of play to improve mental fitness. Our collection of brain
                    teasers, brain exercises, and number games is designed to challenge your brain and help you enhance
                    your
                    cognitive skills. Whether you&apos;re a beginner or an experienced puzzle solver, you&apos;ll find
                    exciting
                    games
                    to boost your focus, memory, and problem-solving abilities.
                </p>
            </div>

            <div className="md:max-w-[765px] mb-10 text-center">
                <h2>Why Brain Workouts are Important for Mental Fitness</h2>
                <p>
                    Just like physical workouts keep your body in shape, brain workouts keep your mind sharp. At Number
                    Game, our games are crafted to improve key cognitive functions, including:
                </p>
                <ul className="list-disc list-inside">
                    <li>
                        Memory Boosting: Engaging in brain exercises regularly helps improve both short-term and
                        long-term memory.
                    </li>
                    <li>
                        Enhanced Problem-Solving: Challenging number games encourage logical thinking and boost
                        analytical skills.
                    </li>
                    <li>
                        Better Focus: Playing brain teasers helps increase concentration and sharpens mental clarity.
                    </li>
                </ul>
            </div>
            <div className="md:max-w-[765px] mb-10 text-center">
                <h2>Ready to Boost Your Brain? Play Now at Number Game!</h2>
                <p>
                    Get started on your mental fitness journey with Number Game! Our fun and challenging brain exercises
                    will help you improve cognitive skills while keeping you entertained.
                </p>
                <ul className="list-disc list-inside">
                    <li>
                        Play at your own pace.
                    </li>
                    <li>
                        Choose from various difficulty levels.
                    </li>
                    <li>
                        Track your progress and set new personal records!
                    </li>
                </ul>
            </div>
            <Image
                alt={'brain teasers'}
                src={brainTeasers}
                width={500}
                height={500}
            />
            <Link href="/game">
                <span
                    className="transition ease-in-out hover:-translate-y-1 duration-300 hover:scale-110 flex px-4 py-2 rounded-xl border hover:shadow-xl shadow-lg">
                    Play
                </span>
            </Link>
        </div>
    );
}
