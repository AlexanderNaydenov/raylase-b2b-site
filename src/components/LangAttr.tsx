"use client";

import { useEffect } from "react";

/** Sets <html lang> on the client for the active locale segment. */
export function LangAttr({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
