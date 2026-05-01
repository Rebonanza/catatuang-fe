import { Link } from 'react-router-dom';
import { RouteConstant } from '@/constants/routes.constant';
import { ArrowLeft } from 'lucide-react';

const LAST_UPDATED = 'May 1, 2026';

export const TermsOfServicePage = () => {
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
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        <div className="prose-custom space-y-10">
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using CatatUang ("the Service"), you agree to be
              bound by these Terms of Service ("Terms"). If you do not agree to
              these Terms, please do not use the Service. We reserve the right
              to update these Terms at any time, and your continued use of the
              Service constitutes acceptance of those changes.
            </p>
          </Section>

          <Section title="2. Description of Service">
            <p>
              CatatUang is a personal finance tracking application that helps
              users manage their expenses and income. The Service includes:
            </p>
            <ul>
              <li>Manual and automated transaction recording</li>
              <li>
                Gmail integration for automatic transaction detection from bank
                and e-wallet notification emails
              </li>
              <li>Transaction categorization and management</li>
              <li>Financial analytics, charts, and spending reports</li>
              <li>Push notification alerts for new transactions</li>
              <li>Progressive Web App (PWA) for mobile access</li>
            </ul>
          </Section>

          <Section title="3. User Accounts">
            <p>To use the Service, you must create an account. You agree to:</p>
            <ul>
              <li>Provide accurate and complete registration information</li>
              <li>
                Maintain the security and confidentiality of your login
                credentials
              </li>
              <li>
                Accept responsibility for all activities that occur under your
                account
              </li>
              <li>
                Notify us immediately of any unauthorized use of your account
              </li>
            </ul>
            <p>
              You may create an account using your email address or through
              Google Sign-In. We reserve the right to suspend or terminate
              accounts that violate these Terms.
            </p>
          </Section>

          <Section title="4. Gmail Integration">
            <p>
              If you choose to connect your Gmail account, you authorize
              CatatUang to:
            </p>
            <ul>
              <li>
                Access your Gmail messages to identify transaction-related
                emails
              </li>
              <li>
                Parse transaction details (amount, merchant, date) from
                identified emails
              </li>
              <li>
                Receive real-time push notifications from Gmail via Google
                Pub/Sub when new emails arrive
              </li>
            </ul>
            <p>
              You may revoke Gmail access at any time through your Google
              Account permissions settings or through the CatatUang application
              settings. Our use of Gmail data complies with the{' '}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
          </Section>

          <Section title="5. User Responsibilities">
            <p>When using the Service, you agree not to:</p>
            <ul>
              <li>
                Use the Service for any unlawful purpose or in violation of any
                applicable laws
              </li>
              <li>
                Attempt to gain unauthorized access to the Service or its
                related systems
              </li>
              <li>
                Interfere with or disrupt the Service or servers connected to
                the Service
              </li>
              <li>Transmit any malicious code, viruses, or harmful content</li>
              <li>
                Use the Service to process data belonging to other individuals
                without their consent
              </li>
              <li>Reverse engineer, decompile, or disassemble the Service</li>
              <li>
                Use automated systems or bots to access the Service without our
                permission
              </li>
            </ul>
          </Section>

          <Section title="6. Intellectual Property">
            <p>
              The Service, including its original content, features, and
              functionality, is owned by CatatUang and is protected by
              international copyright, trademark, and other intellectual
              property laws. You retain ownership of your personal data and
              transaction records. You grant us a limited license to process
              your data solely for the purpose of providing the Service.
            </p>
          </Section>

          <Section title="7. Disclaimer of Warranties">
            <p>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis
              without warranties of any kind, whether express or implied. We do
              not warrant that:
            </p>
            <ul>
              <li>
                The Service will be uninterrupted, timely, secure, or error-free
              </li>
              <li>Transaction data parsed from emails will be 100% accurate</li>
              <li>The Service will meet all of your specific requirements</li>
              <li>Any errors in the Service will be corrected</li>
            </ul>
            <p>
              CatatUang is a financial tracking tool and does not provide
              financial, tax, or investment advice. You should verify important
              financial information independently.
            </p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>
              To the maximum extent permitted by applicable law, CatatUang and
              its operators shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, including but not
              limited to loss of profits, data, or other intangible losses,
              resulting from your use of or inability to use the Service.
            </p>
          </Section>

          <Section title="9. Data and Privacy">
            <p>
              Your use of the Service is also governed by our{' '}
              <Link to={RouteConstant.PRIVACY_POLICY}>Privacy Policy</Link>,
              which describes how we collect, use, and protect your information.
              By using the Service, you consent to the data practices described
              in our Privacy Policy.
            </p>
          </Section>

          <Section title="10. Termination">
            <p>
              We may terminate or suspend your account and access to the Service
              immediately, without prior notice or liability, for any reason,
              including if you breach these Terms. Upon termination, your right
              to use the Service will immediately cease. You may also delete
              your account at any time. Upon account deletion, we will remove
              your personal data in accordance with our Privacy Policy.
            </p>
          </Section>

          <Section title="11. Governing Law">
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the Republic of Indonesia, without regard to its
              conflict of law provisions. Any disputes arising from these Terms
              or the Service shall be resolved through good-faith negotiation,
              and if necessary, through the competent courts in Indonesia.
            </p>
          </Section>

          <Section title="12. Contact Us">
            <p>
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <ul>
              <li>
                Email:{' '}
                <a href="mailto:support@catatuang.com">support@catatuang.com</a>
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
              className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to={RouteConstant.TERMS_OF_SERVICE}
              className="text-xs font-bold text-primary"
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
    <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-slate-800 [&_strong]:dark:text-slate-200">
      {children}
    </div>
  </section>
);
