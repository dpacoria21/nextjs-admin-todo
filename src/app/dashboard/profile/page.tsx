'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function ProfilePage() {

    const {data: session} = useSession();

    useEffect(() => {
        console.log('Desde el cliente');
    }, []);

    return (
        <div>
            <h1>Hello Profile Page</h1>
            <hr />
            <div className="flex flex-col">
                <span>
                    {session?.user?.name}
                </span>
                <span>
                    {session?.user?.email}   
                </span>
                <span>
                    {session?.user?.image}   
                </span>
                <span>
                    {session?.user?.id}   
                </span>
                <span>
                    {session?.user?.roles?.join(', ')}   
                </span>
                <div>
                    {JSON.stringify(session, null, 4)}
                </div>
            </div>
        </div>
    );
}