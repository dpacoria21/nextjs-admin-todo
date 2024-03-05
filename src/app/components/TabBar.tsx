'use client';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const tabOptions = [1,2,3,4,5];

interface Props {
    currentTab?: number,
    tabOptions?: number[],
}

export const TabBar = ({tabOptions = [1,2,3,4], currentTab = 1}: Props) => {


    const router = useRouter();
    const [selected, setSelected] = useState<number>(currentTab);

    const onTabSelected = (tab: number) => {
        setSelected(tab);
        setCookie('selectedTab', tab.toString());
        router.refresh();
    };

    return (
        <div 
            className={`grid w-full ${'grid-cols-'+tabOptions.length} space-x-2 rounded-xl bg-gray-200 p-2`}
        >
            {
                tabOptions.map((opt) => (
                    <div key={opt}>
                        <input
                            checked={selected===opt}
                            onChange={() => {}}
                            type="radio" 
                            id={opt+''} 
                            className="peer hidden" 
                        />
                        <label 
                            onClick={() => onTabSelected(opt)}
                            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                        >
                            {opt}
                        </label>
                    </div>
                ))
            }

        </div>
    );
};
