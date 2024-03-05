import { TabBar } from '@/app/components';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
    title: 'Cookies',
    description: 'Ruta hecha para practicar el uso de Cookies',
};

export default function CookiesPage () {

    const cookieStore = cookies();
    const cookieTab = cookieStore.get('selectedTab')?.value ?? '1';

    const allCookies = cookieStore.getAll();

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>

            <div className='flex flex-col'>
                <span className='text-3xl'>Tabs</span>
                <TabBar currentTab={+cookieTab}/>
                <p>
                    {JSON.stringify(allCookies, null, 4)}
                </p>
            </div>

        </div>
    );
}