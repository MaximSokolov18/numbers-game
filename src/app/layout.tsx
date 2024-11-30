import type {Metadata} from 'next';
import Head from 'next/head'
import './globals.css';

export const metadata: Metadata = {
    title: 'Numbers Game',
    description: 'It`s simple numbers game.'
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en">
        <Head>
            <meta name="google-site-verification" content="7Qxh9LoHKMdoTTs2DEvMAjrzpehzFEZN4U4YFtk9Djk"/>
        </Head>
        <body>
        {children}
        </body>
        </html>
    );
}
