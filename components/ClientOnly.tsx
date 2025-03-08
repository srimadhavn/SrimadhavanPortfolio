"use client";

import { useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from "@vercel/analytics/react";

export default function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {children}
      <Toaster />
      <Analytics />
    </>
  );
}