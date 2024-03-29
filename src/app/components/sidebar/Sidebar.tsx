import Image from 'next/image';
import Link from 'next/link';
import { CiLogout } from 'react-icons/ci';
import { SidebarItem } from './SidebarItem';
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPerson, IoPersonOutline } from 'react-icons/io5';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { LogoutButton } from './LogoutButton';

const menuItems = [
    {
        icon: <IoCalendarOutline />,
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        icon: <IoCheckboxOutline />,
        label: 'Rest Todos',
        href: '/dashboard/rest-todos'
    },
    {
        icon: <IoListOutline />,
        label: 'Server Actions ',
        href: '/dashboard/server-todos'
    },
    {
        icon: <IoCodeWorkingOutline />,
        label: 'Cookies',
        href: '/dashboard/cookies'
    },
    {
        icon: <IoBasketOutline />,
        label: 'Products',
        href: '/dashboard/products'
    },
    {
        icon: <IoPersonOutline />,
        label: 'Perfil',
        href: '/dashboard/profile'
    },
];

export const Sidebar = async() => {

    const session = await getServerSession(authOptions);

    const userRoles = session?.user?.roles ?? ['client'];

    return (
        <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
            <div>
                <div className="-mx-6 px-6 py-4">
                    {/* TODO: Next/Link hacia dashboard */}
                    <Link href="/dashboard" title="home">
                        {/* Next/Image */}
                        <Image src={'https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg'} width={0} height={0} className="w-auto" priority alt="tailus logo"/>
                    </Link>
                </div>
    
                <div className="mt-8 text-center">
                    {/* Next/Image */}
                    <Image src={session?.user?.image ?? 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp'} alt="random_logo" width={200} height={200} className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"/>
                    <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{session?.user?.name ?? 'Anonymous'}</h5>
                    <span className="hidden text-gray-400 lg:block capitalize">{userRoles.join(', ')}</span>
                </div>
    
                <ul className="space-y-2 tracking-wide mt-8">
                    {/* TODO: src/components <SidebarItem /> */}
                    {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
                    {menuItems.map((item) => (
                        <SidebarItem key={item.label} {...item}/>
                    ))}
                </ul>
            </div>
    
            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                <LogoutButton />
            </div>
        </aside>
    );
};
