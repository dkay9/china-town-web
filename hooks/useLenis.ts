"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { initLenis, destroyLenis, getLenis } from "@/lib/lenis";

export function useLenis(): Lenis | null {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const instance = initLenis();
    setLenis(instance);
    return () => {
      destroyLenis();
    };
  }, [pathname]);

  return lenis;
}
