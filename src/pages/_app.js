"use client";
import NavBar from "@/pages/Components/navBar.js";
import LoggedInNav from "@/pages/Components/LoggedInNav";
import { useState, useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import "../app/globals.css";
import { Toaster } from "react-hot-toast";

function AuthWrapper({ Component, pageProps }) {
  const [LoggedIn, setLoggedIn] = useState(false);
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (sessionData?.user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [sessionData]);

  return (
    <>
      {LoggedIn ? <LoggedInNav /> : <NavBar />}
      <Component {...pageProps} />
    </>
  );
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <SessionProvider session={session}>
        <AuthWrapper Component={Component} pageProps={pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
