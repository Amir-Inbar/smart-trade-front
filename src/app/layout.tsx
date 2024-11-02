import {AppLayout} from "@/components/Layout/AppLayout";
import {GeistSans} from "geist/font/sans";
import {ThemeProvider} from "@/config/theme-provider";
import {ReactNode} from "react";
import "./globals.css";
import {FetchDataInBackground} from "@/components/FetchDataInBackground/FetchDataInBackground";


export default function RootLayout(
    {
        children
    }: Readonly<{
        children: ReactNode;
    }>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <AppLayout>
                <FetchDataInBackground/>
                {children}
            </AppLayout>
        </ThemeProvider>
        </body>
        </html>
    );
}
