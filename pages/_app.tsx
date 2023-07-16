import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

//^ component
import Header from "@/components/Headers/Header";

interface PageProps extends AppProps {
  session?: any;
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: PageProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
