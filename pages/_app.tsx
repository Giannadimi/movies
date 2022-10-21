import "../styles/globals.css";
import Header from "../src/components/Header";
import Head from "next/head";
import { Box } from "@mui/system";

function MyApp(props: any) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title> Movies </title>

        <meta name="theme-color" content="#317EFB" />
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}

      {/* TODO: αφού δεν περνάς children στο component μπορείς να το γράψεις και ώς <Header /> */}
      <Header></Header>
      <Component {...pageProps} />
      {/* <Footer></Footer> */}
      <Box mb={5}></Box>
    </>
  );
}

export default MyApp;
