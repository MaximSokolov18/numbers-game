import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Numbers Game',
    description: 'It`s simple numbers game.'
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
