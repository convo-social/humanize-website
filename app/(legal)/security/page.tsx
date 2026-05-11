import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Report security vulnerabilities to Humanize through our vulnerability disclosure program on HackerOne.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <LegalPage>
      <h1>Security</h1>
      <p>
        Humanize welcomes reports from security researchers. If you believe
        you&rsquo;ve found a vulnerability in our products or infrastructure,
        please submit it through the form below. Reports are handled by our
        team via our vulnerability disclosure program on HackerOne.
      </p>

      <h2>Submit a report</h2>
      <iframe
        src="https://hackerone.com/d865d4b1-f444-492e-ac30-972733732865/embedded_submissions/new?locale=en"
        title="Submit Vulnerability Report"
        style={{ border: "none", width: "100%", height: "1000px" }}
      />

      <h2>Scope</h2>
      <ul>
        <li>
          <strong>humanize.app</strong> &mdash; marketing site
        </li>
        <li>
          <strong>go.humanize.app</strong> &mdash; the Humanize web app
        </li>
        <li>Humanize API endpoints accessed by the web app</li>
      </ul>
      <p>
        Out of scope: social engineering, physical attacks, denial-of-service,
        third-party services we don&rsquo;t operate, and findings on staging or
        preview deployments.
      </p>

      <h2>Safe harbor</h2>
      <p>
        We will not pursue legal action against researchers who act in good
        faith, comply with this policy, and avoid privacy violations,
        destruction of data, or interruption of service while testing.
      </p>
    </LegalPage>
  );
}
