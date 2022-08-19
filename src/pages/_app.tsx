/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from "next/app";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { EmotionCache } from "@emotion/react";
import Wrapper from "../wrapper";
import "swiper/css";
import "swiper/css/pagination";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({ Component, pageProps, router }: MyAppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Wrapper>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AnimatePresence exitBeforeEnter>
            <motion.main
              key={router.pathname}
              animate={{ y: 0, opacity: 1 }}
              initial={{ y: 100, opacity: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ type: "tween", ease: "easeInOut" }}
            >
              <Component {...pageProps} />
            </motion.main>
          </AnimatePresence>
        </Hydrate>
      </QueryClientProvider>
    </Wrapper>
  );
}

export default MyApp;
