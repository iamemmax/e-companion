import { useState, useEffect } from "react";
import "../styles/globals.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, ThemeProvider } from "@mui/material";
import theme from "../public/theme/theme";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
// import store from '../features/store/store';
import Loading from "../components/config/Loader";
import Router from "next/router";
import { ToastContainer } from "react-toastify";
import { CookiesProvider } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";
import store from "../features/store/store";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => setLoading(false));
    Router.events.on("routeChangeError", () => setLoading(false));

    return () => {
      Router.events.off("routeChangeStart", () => setLoading(true));
      Router.events.off("routeChangeComplete", () => setLoading(false));
      Router.events.off("routeChangeError", () => setLoading(false));
    };
  }, [Router.events]);

  const persistor = persistStore(store);
  // const protectedRoutes = [
  // "/dashboard",
  //         "/accounts"
  //       ];
  //       const isProtectedRoute = protectedRoutes.includes(ctx.pathname);

  //       if (isProtectedRoute) {
  //         RedirectNonUser(ctx);
  //       }
  // static async getInitialProps({ Component, ctx }) {
  // return { pageProps };
  // }

  

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Component {...pageProps} />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                pauseOnVisibilityChange
                closeOnClick
                pauseOnHover
              />
              {/* <div>
                <Head>
                  <script
                    type="text/javascript"
                    src="/assets/script/script.js"
                  ></script>
                </Head>
              </div> */}
            </>
          )}
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
