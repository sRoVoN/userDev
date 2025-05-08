// app/providers.tsx
"use client";

import { ReactNode, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  DehydratedState,
} from "@tanstack/react-query";

interface Props {
  children: ReactNode;
  dehydratedState?: DehydratedState;
}

export default function QueryProvider({ children, dehydratedState }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState || {}}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
