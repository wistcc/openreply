"use client";

import { createContext, useContext } from "react";

/**
 * Instance branding resolved on the server (LEGAL_PRODUCT_NAME, HIDE_ZERNIO_UI)
 * and handed to client components, which cannot read runtime env vars.
 */
export interface Branding {
  productName: string;
  showZernio: boolean;
}

const BrandingContext = createContext<Branding>({
  productName: "OpenReply",
  showZernio: true,
});

export const BrandingProvider = BrandingContext.Provider;

export function useBranding(): Branding {
  return useContext(BrandingContext);
}
