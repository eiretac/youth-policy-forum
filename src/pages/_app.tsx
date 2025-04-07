import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/context/ThemeContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
} 