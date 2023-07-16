import "@/styles/globals.scss";
import type { AppProps } from "next/app";

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
      <Component {...pageProps} />
    </>
  );
}
