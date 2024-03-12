import { type AppType } from "next/app";
import { Inter as FontSans } from "next/font/google";

import { api } from "~/utils/api";
import { cn } from "~/lib/utils";

import "~/styles/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main
      className={cn(
        "bg-background min-h-screen font-sans antialiased",
        fontSans.variable,
      )}
    >
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
