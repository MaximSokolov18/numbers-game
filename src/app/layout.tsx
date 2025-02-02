import type {Metadata} from 'next';
import {Inter} from 'next/font/google'
import './globals.css';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    metadataBase: new URL('https://www.numbers-game.website/'),
    keywords: ['brain teasers', 'brain exercises', 'brain workout', 'fun brain games', 'number game'],
    title: {
        default: 'Number Game | Fun Brain Teasers and Exercises to Sharpen Your Mind',
        template: '%s | Numbers Game',
    },
    description: 'Challenge your mind with fun brain games, teasers, and exercises. Boost your focus, memory, and problem-solving skills with engaging number games and brain workouts.',
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en" className="dark:bg-black">
            <body className={inter.className}>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
