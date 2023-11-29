import { useSessionStore } from '@/store/session'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const { fetchSessionData } = useSessionStore();

  useEffect(() => {
    fetchSessionData();
  }, [fetchSessionData]);

  return (
    <Component {...pageProps} />
  )
}
