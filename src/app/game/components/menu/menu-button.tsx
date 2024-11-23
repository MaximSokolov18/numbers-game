"use client"
import React, {ReactNode} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {clsx} from 'clsx';

type Props = {
    href: string,
    children: ReactNode,
}

export const MenuButton = ({href, children}: Props) => {
    const pathname = usePathname();

    return (
        // TODO: change styles after getting mockups
        <li>
            <Link href={href}>
                <span className={clsx(
                    'flex px-4 py-2 hover:bg-stone-100 rounded-xl',
                    {'border-b-2 border-b-stone-200 shadow-md': pathname === href}
                )}>
                    {children}
                </span>
            </Link>
        </li>
    );
};
