import { SessionProvider } from "next-auth/react";
import React, { useState, useEffect } from "react";

// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/bundle";
import "swiper/css/lazy";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../styles/globals.css";
import "swiper/css/navigation";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { Provider } from "react-redux";
import "../styles/loader.scss";
import Router from "next/router";
import Loader from "../utils/loader";
import { useSession } from "next-auth/react";
import Layout from "../components/layout";
import { store } from "../components/redux/reduxStore";

function MyApp({ Component, pageProps }) {
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [isFirst, setIsFirst] = useState(true);

  Router.onRouteChangeStart = () => {
    console.log("onRouteChangeStart");
    setLoaderStatus(true);
    setIsFirst(false);
  };

  Router.onRouteChangeComplete = () => {
    console.log("onRouteChangeComplete");
    setLoaderStatus(false);
    setIsFirst(false);
  };

  Router.onRouteChangeError = (err) => {
    console.log(err, "onRouteChangeError");
  };

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        {loaderStatus ? (
          <Loader
            setLoader={(bool) => {
              setLoaderStatus(bool);
              setIsFirst(bool);
            }}
            isFirst={isFirst}
          />
        ) : (
          <Layout>
            <Component {...pageProps} />;
          </Layout>
        )}
      </Provider>
    </SessionProvider>
  );
}
export default MyApp;
