import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import styles from "./ContactPage.module.css";

export const metadata: Metadata = {
  title: "Talk to our team",
  description:
    "Get in touch with the Convo team about Humanize. We'll be back within one business day.",
  alternates: { canonical: "/contact-us" },
};

const LOGOS: Array<{ src: string; alt: string }> = [
  { src: "/images/hearst logo.png", alt: "Hearst" },
  { src: "/images/Sovereign's+Capital.png", alt: "Sovereign's Capital" },
  { src: "/images/KS_thumb1 1.png", alt: "KidStrong" },
  { src: "/images/CC-Logo_Left_Coloured_png-01-1-1.png", alt: "CareCognitics" },
  { src: "/images/div.marquee-logo-2.png", alt: "Merciv" },
  { src: "/images/2div.marquee-logo.png", alt: "Mozi Wash" },
  { src: "/images/contour.png", alt: "Contour" },
];

export default function ContactPage() {
  return (
    <div className={styles.split}>
      <div className={styles.left}>
        <div className={styles.leftInner}>
          <h1>Talk to our team</h1>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 7h-3a2 2 0 0 1-2-2V2" />
                  <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z" />
                  <path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8" />
                </svg>
              </div>
              <span>Custom pricing and packaging</span>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <span>Enterprise support and SLA</span>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span>White glove onboarding</span>
            </div>
          </div>

          <div className={styles.trusted}>
            <div className={styles.trustedLabel}>Trusted by</div>
            <div className={styles.trustedLogos}>
              <div className={styles.logoTrack}>
                {LOGOS.map((logo) => (
                  <img key={logo.alt} src={logo.src} alt={logo.alt} />
                ))}
                {LOGOS.map((logo) => (
                  <img
                    key={`${logo.alt}-dup`}
                    src={logo.src}
                    alt=""
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <ContactForm />
      </div>
    </div>
  );
}
