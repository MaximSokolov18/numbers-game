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
    other: {
        'google-site-verification': '7Qxh9LoHKMdoTTs2DEvMAjrzpehzFEZN4U4YFtk9Djk'
    }
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    );
}
