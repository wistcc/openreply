import type { Metadata } from "next";
import LegalShell from "@/components/legal-shell";
import { getLegalOperator } from "@/lib/legal";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const { productName } = getLegalOperator();
  return {
    title: `Data Deletion - ${productName}`,
    description: `How ${productName} users can disconnect Instagram and request account or campaign data deletion.`,
  };
}

export default function DataDeletionPage() {
  const legal = getLegalOperator();
  const contact = legal.contactEmail ? (
    <a className="underline" href={`mailto:${legal.contactEmail}`}>
      {legal.contactEmail}
    </a>
  ) : (
    "support"
  );
  return (
    <LegalShell
      title="Data Deletion"
      description={`How to remove your ${legal.productName} account, workspace, Instagram connection, and campaign data.`}
      updatedAt="September 27, 2026"
    >
      <section>
        <h2 className="text-xl font-bold text-white">Disconnect Instagram</h2>
        <p className="mt-3">
          Sign in, open Settings, and select Disconnect. This removes the stored
          Instagram connection token and stops campaigns for that account. You
          can also remove the app from Instagram under Settings, Apps and
          websites.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Delete All Your Data</h2>
        <p className="mt-3">
          To delete your workspace, campaigns, logs, webhook data, and
          diagnostics, email {contact} from the address you use to sign in,
          with the subject &quot;Data deletion request&quot; and the Instagram
          username you connected. We confirm and complete deletion within 30
          days.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Verification</h2>
        <p className="mt-3">
          We may ask you to verify control of the email address or connected
          account before deleting data. Data is retained only where the law
          requires it, or for fraud prevention and security.
        </p>
      </section>
    </LegalShell>
  );
}
