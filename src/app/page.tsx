import React from 'react';
import Link from 'next/link';

export default function Home () {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            <p className="px-10 text-justify mb-10 md:max-w-[765px]">
                Test your skills and challenge your mind with
                Numbers Game! Enjoy a fun, interactive experience that
                combines strategy and quick thinking. Whether you&apos;re sharpening your math abilities or simply
                looking
                for a way to relax and compete with friends, Numbers Game offers exciting gameplay for all ages. Dive
                into puzzles, climb leaderboards, and prove you&apos;re a numbers master!
            </p>
            <Link href="/game">
                <span className="transition ease-in-out hover:-translate-y-1 duration-300 hover:scale-110 flex px-4 py-2 rounded-xl border hover:shadow-xl shadow-lg">
                    Play
                </span>
            </Link>
        </div>
    );
}
