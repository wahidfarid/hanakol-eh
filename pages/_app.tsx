import { AppProps } from 'next/app';
import "tailwindcss/tailwind.css";
import GoogleFonts from "next-google-fonts";
import "../styles/style.css"

function MyApp({ Component, pageProps }: AppProps) {
  return <>
  <GoogleFonts href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,600;1,700&family=Amiri:wght@700&display=swap" />
  <Component {...pageProps} />
  </>
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp