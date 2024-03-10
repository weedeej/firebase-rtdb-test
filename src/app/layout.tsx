"use client";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Header, ReduxValuesPrefetch, Sidebar } from "@/components";
import { Box, CircularProgress, CssBaseline, Stack, ThemeProvider, createTheme } from "@mui/material";
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const theme = createTheme({
    palette: {
      text: {
        primary: "#eaeaea"
      },
    },
    components: {
      "MuiMenuItem": {
        "styleOverrides": {
          "root": {
            "color": "MenuText"
          }
        }
      },
      "MuiButton": {
        "styleOverrides": {
          root: {
            color: "MenuText"
          }
        }
      }
    }
  })
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ReduxValuesPrefetch />
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRouterCacheProvider>
              <Suspense fallback={<CircularProgress />}>
                <Stack direction="row" height="calc(100vh - 2em)" gap={2}>
                  <Sidebar />
                  <Stack gap={2} flex={1}>
                    <Header />
                    {children}
                  </Stack>
                  <Box position="absolute">
                    <ToastContainer
                      position="bottom-center"
                      autoClose={1000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      draggable
                      theme="dark" />
                  </Box>
                </Stack>
              </Suspense>
            </AppRouterCacheProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
