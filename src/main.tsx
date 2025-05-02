import {StrictMode, useState} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import AppProviders from "@/config/AppProviders";
import {ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core';
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


function MainApp() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <AppProviders>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider theme={{colorScheme}}>
                    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
                        <App/>
                    </ClerkProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </AppProviders>
    );
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MainApp/>
    </StrictMode>
);
