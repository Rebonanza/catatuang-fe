import { Link } from 'react-router-dom';
import { RouteConstant } from '@/constants/routes.constant';
import { ArrowLeft } from 'lucide-react';

const LAST_UPDATED = 'May 1, 2026';

export const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 dark:border-slate-800/50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between w-full max-w-6xl mx-auto px-4 sm:px-6">
          <Link
            to={RouteConstant.LANDING}
            className="flex items-center gap-2.5"
          >
            <img
              src="/logo.webp"
              alt="CatatUang"
              className="w-9 h-9 object-contain rounded-lg"
            />
            <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
              CatatUang
            </span>
          </Link>
          <Link
            to={RouteConstant.LANDING}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-3">
            Legal
          </p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        <div className="prose-custom space-y-10">
          <Section title="1. Introduction">
            <p>
              Welcome to CatatUang ("we," "our," or "us"). We are committed to
              protecting your privacy and ensuring the security of your personal
              information. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your data when you use our expense
              tracking application and related services.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect the following types of information:</p>
            <h4>2.1 Account Information</h4>
            <ul>
              <li>Name and email address when you register an account</li>
              <li>
                Authentication credentials (passwords are stored as secure
                hashes)
              </li>
              <li>
                Profile information associated with your Google account if you
                choose Google Sign-In
              </li>
            </ul>
            <h4>2.2 Gmail Data</h4>
            <ul>
              <li>
                With your explicit consent, we access your Gmail account to scan
                for transaction-related emails from banks and e-wallets
              </li>
              <li>
                We only read email metadata and content necessary to extract
                transaction information (merchant, amount, date)
              </li>
              <li>
                We do not read, store, or process emails unrelated to financial
                transactions
              </li>
            </ul>
            <h4>2.3 Transaction Data</h4>
            <ul>
              <li>
                Transaction details including amount, merchant name, category,
                date, and description
              </li>
              <li>Categories and labels you create</li>
            </ul>
            <h4>2.4 Device & Usage Information</h4>
            <ul>
              <li>Device type, browser type, and operating system</li>
              <li>Push notification tokens for sending transaction alerts</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use your information to:</p>
            <ul>
              <li>Provide and maintain our expense tracking service</li>
              <li>
                Automatically parse and categorize your financial transactions
                from Gmail
              </li>
              <li>
                Generate financial reports, charts, and spending analytics
              </li>
              <li>Send push notifications about new detected transactions</li>
              <li>Authenticate your identity and secure your account</li>
              <li>Improve and optimize our services</li>
            </ul>
          </Section>

          <Section title="4. Google API Services - Limited Use Disclosure">
            <p>
              CatatUang's use and transfer of information received from Google
              APIs adheres to the{' '}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
            <p>Specifically:</p>
            <ul>
              <li>
                We only request access to Gmail data necessary for detecting
                financial transaction emails
              </li>
              <li>We do not use Gmail data for advertising purposes</li>
              <li>We do not sell Gmail data to third parties</li>
              <li>
                We do not use Gmail data for purposes unrelated to providing or
                improving our expense tracking functionality
              </li>
              <li>
                Human access to Gmail data is limited to troubleshooting and
                only with your explicit consent
              </li>
            </ul>
          </Section>

          <Section title="5. Data Security">
            <p>
              We implement industry-standard security measures to protect your
              data:
            </p>
            <ul>
              <li>
                All Gmail tokens are encrypted using AES-256-GCM encryption
                before storage
              </li>
              <li>
                Passwords and refresh tokens are stored as cryptographic hashes
              </li>
              <li>All data transmission uses HTTPS/TLS encryption</li>
              <li>
                Access to user data requires authenticated sessions with
                short-lived JWT tokens
              </li>
              <li>
                Rate limiting and security headers are enforced on all endpoints
              </li>
            </ul>
          </Section>

          <Section title="6. Data Sharing">
            <p>
              We do not sell, trade, or rent your personal information to third
              parties. We may share data only in the following circumstances:
            </p>
            <ul>
              <li>
                <strong>Service Providers:</strong> We use Google Cloud services
                for authentication and Gmail integration
              </li>
              <li>
                <strong>Legal Requirements:</strong> If required by law,
                regulation, or legal process
              </li>
              <li>
                <strong>Safety:</strong> To protect the rights, property, or
                safety of our users or the public
              </li>
            </ul>
          </Section>

          <Section title="7. Data Retention">
            <p>
              We retain your data for as long as your account is active. You may
              request deletion of your account and all associated data at any
              time by contacting us. Upon account deletion, we will permanently
              remove all your personal data, transaction records, and Gmail
              tokens within 30 days.
            </p>
          </Section>

          <Section title="8. Your Rights">
            <p>You have the right to:</p>
            <ul>
              <li>Access, update, or delete your personal information</li>
              <li>
                Revoke Gmail access at any time through your Google Account
                settings
              </li>
              <li>Export your transaction data</li>
              <li>Request a copy of all data we hold about you</li>
              <li>Opt out of push notifications</li>
            </ul>
          </Section>

          <Section title="9. Children's Privacy">
            <p>
              CatatUang is not intended for children under the age of 13. We do
              not knowingly collect personal information from children under 13.
              If we become aware that we have collected data from a child under
              13, we will take steps to delete that information promptly.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last updated" date. We encourage you
              to review this Privacy Policy periodically.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>
              If you have any questions about this Privacy Policy or our data
              practices, please contact us at:
            </p>
            <ul>
              <li>
                Email:{' '}
                <a href="mailto:giventheokhemides@gmail.com">
                  giventheokhemides@gmail.com
                </a>
              </li>
            </ul>
          </Section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-100 dark:border-slate-800/50 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link
              to={RouteConstant.PRIVACY_POLICY}
              className="text-xs font-bold text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              to={RouteConstant.TERMS_OF_SERVICE}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            © {new Date().getFullYear()} CatatUang
          </p>
        </div>
      </footer>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section>
    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
      {title}
    </h2>
    <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_h4]:font-bold [&_h4]:text-slate-800 [&_h4]:dark:text-slate-200 [&_h4]:mt-4 [&_h4]:mb-2 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-slate-800 [&_strong]:dark:text-slate-200">
      {children}
    </div>
  </section>
);
