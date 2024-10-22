"use client";
import NavBar from "@/pages/Components/navBar.js";
import LoggedInNav from "@/pages/Components/LoggedInNav";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import "../app/globals.css";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [LoggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <SessionProvider session={session}>
        {LoggedIn ? <LoggedInNav /> : <NavBar />}
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
