import { TabBar } from '@/app/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookies',
    description: 'Ruta hecha para practicar el uso de Cookies',
};

export default function CookiesPage () {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>

            <div className='flex flex-col'>
                <span className='text-3xl'>Tabs</span>
                <TabBar />
            </div>

        </div>
    );
}