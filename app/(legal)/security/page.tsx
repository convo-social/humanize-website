import type { Metadata } from "next";
import {
  LegalPage,
  LegalSummaryBox,
  LegalUpdated,
} from "@/components/legal/LegalPage";

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
      <LegalUpdated>
        <strong>Last Updated: May 11, 2026</strong>
      </LegalUpdated>

      <LegalSummaryBox>
        <h2>At a glance</h2>
        <ul>
          <li>
            Report vulnerabilities through the form below &mdash; submissions
            route to our team via HackerOne.
          </li>
          <li>
            In scope: <strong>humanize.app</strong>,{" "}
            <strong>go.humanize.app</strong>, and the Humanize API.
          </li>
          <li>Safe harbor applies to good-faith research that follows this policy.</li>
        </ul>
      </LegalSummaryBox>

      <h2>Submit a report</h2>
      <iframe
        src="https://hackerone.com/d865d4b1-f444-492e-ac30-972733732865/embedded_submissions/new?locale=en"
        title="Submit Vulnerability Report"
        className="w-full h-[1000px] border-0"
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
