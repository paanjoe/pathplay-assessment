import "../styles/globals.css";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import React, { useRef } from "react";
import { usePreserveScroll } from "./scrollctx";


export default function App({ Component, pageProps }: AppProps) {
  usePreserveScroll();
  return (
      <Component {...pageProps} />
  );
}
