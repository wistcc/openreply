import type { Metadata } from "next";
import LegalShell from "@/components/legal-shell";
import { getLegalOperator } from "@/lib/legal";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const { productName } = getLegalOperator();
  return {
    title: `Privacy Policy - ${productName}`,
    description: `How ${productName} handles Instagram account data, webhook payloads, and customer campaign information.`,
  };
}

export default function PrivacyPage() {
  const legal = getLegalOperator();
  const operator = legal.operatorName ?? legal.productName;
  return (
    <LegalShell
      title="Privacy Policy"
      description={`${legal.productName} helps businesses and creators send Meta-compliant private replies when people comment on their connected Instagram posts or reels, and shows them insights about their own account.`}
      updatedAt="September 27, 2026"
    >
      {legal.operatorName && (
        <section>
          <h2 className="text-xl font-bold text-white">Who We Are</h2>
          <p className="mt-3">
            {legal.productName} is operated by {legal.operatorName}
            {legal.operatorRegistration ? ` (${legal.operatorRegistration})` : ""}
            {legal.operatorAddress ? `, ${legal.operatorAddress}` : ""}. {operator} is
            the controller of the data described in this policy.
          </p>
        </section>
      )}

      <section>
        <h2 className="text-xl font-bold text-white">Data We Collect</h2>
        <p className="mt-3">
          We collect account email addresses for authentication, workspace
          metadata, connected Instagram account identifiers and usernames,
          encrypted Instagram access tokens, campaign settings, webhook
          payloads, the comments and messages needed to process campaigns,
          delivery logs, link click counts, account and media insights you ask
          us to display, and operational diagnostics.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">How We Use Data</h2>
        <p className="mt-3">
          We use this data only to authenticate users, connect Instagram
          accounts, match comment keywords, send the private replies and public
          comment replies the account owner configured through the official
          Meta APIs, show the account owner their own insights and campaign
          results, prevent duplicate sends, troubleshoot failures, and protect
          the service. We do not sell personal data, use it for advertising, or
          share it with data brokers.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Instagram And Meta Data</h2>
        <p className="mt-3">
          {legal.productName} does not ask for Instagram passwords, scrape
          Instagram, or use browser automation. Instagram tokens are encrypted
          at rest (AES-256-GCM) and are used only to perform actions authorized
          by the connected business or creator account. We only act on comments
          and messages on the connected account&apos;s own content and
          conversations.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Subprocessors</h2>
        <p className="mt-3">
          The service uses {legal.hostingProviders}. These providers process
          data only as needed to run the service.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Retention And Deletion</h2>
        <p className="mt-3">
          We keep data while your workspace is active. Disconnecting Instagram
          from Settings removes the stored connection and token and stops
          campaigns. You can request deletion of all your data at any time;
          see the Data Deletion page. Delivery logs and diagnostics are kept
          only as long as needed to operate and secure the service.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Your Rights</h2>
        <p className="mt-3">
          You can access, correct, export, or delete your data, and withdraw
          the Instagram permissions you granted at any time from Settings or
          from your Instagram account settings under Apps and websites.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Contact</h2>
        <p className="mt-3">
          {legal.contactEmail ? (
            <>
              For privacy questions or requests, email{" "}
              <a className="underline" href={`mailto:${legal.contactEmail}`}>
                {legal.contactEmail}
              </a>
              .
            </>
          ) : (
            "For privacy questions, contact the repository owner through GitHub or the support email configured for this instance."
          )}
        </p>
      </section>
    </LegalShell>
  );
}
