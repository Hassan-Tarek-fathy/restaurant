
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
type props = {
  children: React.ReactNode;
};  

const QueryProvider = ({ children }:props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>{children}</div>
    </QueryClientProvider>
  )
}

export default QueryProvider