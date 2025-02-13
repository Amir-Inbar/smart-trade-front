import {StrictMode, useState} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import AppProviders from "@/config/AppProviders";
import {ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core';
import './index.css';


function MainApp() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <AppProviders>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider theme={{colorScheme}}>
                    <App/>
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
