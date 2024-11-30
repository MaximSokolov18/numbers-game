import React from 'react'
import Link from 'next/link'

export default function Home () {
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <Link href="/game">
                <span className="flex px-4 py-2 hover:bg-stone-100 rounded-xl">
                    Play
                </span>
            </Link>
        </div>
    )
}
