// Who operates this instance, as shown on the privacy, terms, and data-deletion
// pages. Meta App Review requires these pages to name the operator and a working
// contact, so self-hosted instances set LEGAL_* in the environment. Unset, the
// pages fall back to generic OpenReply wording.
export function getLegalOperator() {
  return {
    productName: process.env.LEGAL_PRODUCT_NAME || "OpenReply",
    operatorName: process.env.LEGAL_OPERATOR_NAME || null,
    operatorRegistration: process.env.LEGAL_OPERATOR_REGISTRATION || null,
    operatorAddress: process.env.LEGAL_OPERATOR_ADDRESS || null,
    contactEmail: process.env.LEGAL_CONTACT_EMAIL || null,
    hostingProviders:
      process.env.LEGAL_SUBPROCESSORS ||
      "hosting, database, Redis queue, email, and observability providers such as Vercel, Railway, PostgreSQL, Redis, and Resend",
  };
}
