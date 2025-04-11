"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Loading from "../components/Loading";
import { registerLoadingHandler } from "../services/api";

const LoadingContext = createContext({ loading: false });

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    registerLoadingHandler(setLoading);
  }, []);

  return (
    <LoadingContext.Provider value={{ loading }}>
      {loading && <Loading />}
      {children}
    </LoadingContext.Provider>
  );
};
