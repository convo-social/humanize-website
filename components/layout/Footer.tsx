import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import styles from "./Footer.module.css";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { href: "/careers", label: "Careers" },
      { href: "/contact-us", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div>
            <Image
              src="/images/humanize-logo.png"
              alt="Humanize"
              width={1668}
              height={524}
              className={styles.brandWordmark}
            />
            <div className={styles.brandTagline}>
              Ask your customers before you make the call.
            </div>
          </div>

          <div className={styles.columns}>
            {COLUMNS.map((col) => (
              <div key={col.title} className={styles.col}>
                <div className={styles.colTitle}>{col.title}</div>
                {col.links.map((link) =>
                  link.href.startsWith("/") ? (
                    <Link key={link.label} href={link.href}>
                      {link.label}
                    </Link>
                  ) : (
                    <a key={link.label} href={link.href}>
                      {link.label}
                    </a>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 Humanize</span>
          <div className={styles.legal}>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms-of-service">Terms</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
