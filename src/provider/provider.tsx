"use client";
import { store } from "@/app/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

const LayoutProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
};

export default LayoutProvider;
