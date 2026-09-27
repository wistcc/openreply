import type { Metadata } from "next";
import LegalShell from "@/components/legal-shell";
import { getLegalOperator } from "@/lib/legal";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const { productName } = getLegalOperator();
  return {
    title: `Terms of Service - ${productName}`,
    description: `Terms for using ${productName}'s Instagram comment-to-DM and insights service.`,
  };
}

export default function TermsPage() {
  const legal = getLegalOperator();
  return (
    <LegalShell
      title="Terms of Service"
      description={`These terms define acceptable use of ${legal.productName}'s Instagram comment-to-DM campaign and insights service.`}
      updatedAt="September 27, 2026"
    >
      {legal.operatorName && (
        <section>
          <h2 className="text-xl font-bold text-white">Provider</h2>
          <p className="mt-3">
            {legal.productName} is provided by {legal.operatorName}
            {legal.operatorRegistration ? ` (${legal.operatorRegistration})` : ""}
            {legal.operatorAddress ? `, ${legal.operatorAddress}` : ""}.
          </p>
        </section>
      )}

      <section>
        <h2 className="text-xl font-bold text-white">Authorized Use</h2>
        <p className="mt-3">
          You may use {legal.productName} only with Instagram professional
          accounts you own or are authorized to manage. You are responsible for
          the campaigns, keywords, links, and messages you configure.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Platform Compliance</h2>
        <p className="mt-3">
          You agree to follow the Meta Platform Terms, Instagram policies,
          applicable messaging rules, privacy laws, advertising rules, and
          anti-spam laws. We may rate-limit, pause, or disable campaigns that
          create compliance, abuse, security, or deliverability risk.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Availability</h2>
        <p className="mt-3">
          The service depends on third-party platforms including Meta, email,
          hosting, database, and queue providers. We work to operate it
          reliably, but uninterrupted availability is not guaranteed.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Termination</h2>
        <p className="mt-3">
          You can stop using the service and disconnect Instagram at any time.
          We may suspend access that violates these terms or Meta policies.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Open-Source Core</h2>
        <p className="mt-3">
          The service is built on the MIT-licensed OpenReply project.
        </p>
      </section>

      {legal.contactEmail && (
        <section>
          <h2 className="text-xl font-bold text-white">Contact</h2>
          <p className="mt-3">
            Questions about these terms:{" "}
            <a className="underline" href={`mailto:${legal.contactEmail}`}>
              {legal.contactEmail}
            </a>
            .
          </p>
        </section>
      )}
    </LegalShell>
  );
}
