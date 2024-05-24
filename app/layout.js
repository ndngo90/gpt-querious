import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GPTQuerious',
  description:
    'GPTQuerious: Your AI language companion. Powered by OpenAI, it enhances your conversations, content creation, and more!'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <ClerkProvider>
        <body className={`${inter.className} min-h-screen`}>
          <Providers>{children}</Providers>
        </body>
      </ClerkProvider>
    </html>
  );
}
