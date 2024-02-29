'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
    label: string,
    href: string,
    icon: React.ReactNode
}

export const SidebarItem = ({label, href, icon}: Props) => {

    const pathname = usePathname();

    return (
        <li>
            <Link href={href} className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl ${href === pathname ? ' text-white bg-gradient-to-r from-sky-600 to-cyan-400' : 'text-gray-600 group'} hover:bg-gradient-to-r hover:bg-sky-200 hover:text-slate-600`}>
                {/* <CiBookmarkCheck size={30} /> */}
                {icon}
                <span className="-mr-1 font-medium">{label}</span>
            </Link>
        </li>
    );
};
