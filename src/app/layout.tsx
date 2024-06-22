import {AppLayout} from "@/components/Layout/AppLayout";

import {GeistSans} from "geist/font/sans";

import "./globals.css";

import {ThemeProvider} from "@/providers/theme-provider";

export default function RootLayout({
                                       children
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AppLayout>{children}</AppLayout>
        </ThemeProvider>
        </body>
        </html>
    );
}
