import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
    metadataBase: new URL('https://www.numbers-game.website/'),
    keywords: ['numbers game', 'numbers game my game', 'numbers game play online', 'game numbers', 'NumGame'],
    title: {
        default: 'Numbers Game',
        template: '%s | Numbers Game',
    },
    openGraph: {
        description: 'Test your skills and challenge your mind with Numbers Game! Enjoy a fun, interactive experience that combines strategy and quick thinking. Whether you\'re sharpening your math abilities or simply looking for a way to relax and compete with friends, Numbers Game offers exciting gameplay for all ages. Dive into puzzles, climb leaderboards, and prove you\'re a numbers master!',
    }
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en">
            <body>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
