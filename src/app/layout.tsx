import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    title: 'Numbers Game',
    description: 'It`s simple numbers game.',
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
