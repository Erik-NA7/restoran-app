'use client';

import ContextProvider from '@/context';
import Layout from './layout';

export default function ProviderLayout({children,}: {children: React.ReactNode}) {

  return (
    <ContextProvider>
      <Layout>{ children }</Layout> 
    </ContextProvider>
  )
}
