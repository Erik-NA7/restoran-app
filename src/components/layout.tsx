 'use client';

import { RestaurantContext } from '@/context';
import { useContext, useState  } from 'react';
import Tabs from './NavigationTab/Tabs';
import Tab from './NavigationTab/Tab';
import { Reset } from './icons/Icons';
import { usePathname } from 'next/navigation';
import ResetFlash from './FlashMessage/ResetFlash';

export default function Layout({children,}: {children: React.ReactNode}) {

  const { resetData, globalReset } = useContext(RestaurantContext)
  const [ dataState, setDataState ] = useState<string>('initial')
  const handleReset = () => {
    resetData()
    setDataState('resetting')
    setTimeout(() => {
      setDataState('cleared')
    }, 1000)
  }

  const path = usePathname()
  return (
    <main className="p-6 space-y-5 w-[650px]">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">&#91;Submission&#93;&nbsp;Sistem Restoran</h1>
          <p className="text-muted-foreground text-sm">Ambisius Coding Challenge #230916H</p>
        </div>
      </div>
      <div dir="ltr" data-orientation="horizontal">
        <div className="flex justify-between relative">
          <Tabs>
            <Tab url='menu' path={path}/>
            <Tab url='order' path={path}/>
            <Tab url='dapur' path={path}/>
            <Tab url='kasir' path={path}/>
          </Tabs>
            { globalReset &&
              <ResetFlash state={dataState}/>
            }
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-[100px]" data-state="closed"
          onClick={handleReset}
          >
            <Reset/>Reset
          </button>
        </div>
        <div className="px-6 py-4 mt-4 bg-muted rounded-md min-h-[300px]">
          {children}
        </div>
      </div>
    </main>   
  )
}
