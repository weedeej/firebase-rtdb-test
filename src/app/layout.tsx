"use client";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Header, Sidebar } from "@/components";
import { CssBaseline, Stack, ThemeProvider, createTheme } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const theme = createTheme({
    palette: {
      text: {
        primary: "#eaeaea"
      }
    }
  })
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouterCacheProvider>
          <Stack direction="row" height="calc(100vh - 2em)" gap={2}>
            <Sidebar />
            <Stack gap={2} flex={1}>
              <Header />
              {children}
            </Stack>
          </Stack>
        </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
