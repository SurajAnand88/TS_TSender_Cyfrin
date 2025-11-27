import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "./providers";
import { propagateServerField } from "next/dist/server/lib/render-server";
import { Header } from "./components/Header";


export default function RootLayout(props:{children:ReactNode}) {
  return (
    <html lang="en">
      <body> 
        <title>TSender</title>
        <Providers>
          <Header />
          {props.children}
        </Providers>
      </body>
    </html>
  );
}
