export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-[70vh] max-w-3xl px-6 py-20 text-ft-body">
      <h1 className="text-4xl font-semibold tracking-tight text-ft-ink">Privacy Policy</h1>
      <p className="mt-6 leading-7">FekiTech Builder processes account details, authentication records, project content, uploaded assets, publishing settings, and security logs to provide and protect the service.</p>
      <h2 className="mt-10 text-xl font-semibold text-ft-ink">How information is used</h2>
      <p className="mt-3 leading-7">Information is used to authenticate users, save and publish websites, enforce plan limits, prevent abuse, diagnose failures, and communicate account security or recovery messages.</p>
      <h2 className="mt-10 text-xl font-semibold text-ft-ink">Published information</h2>
      <p className="mt-3 leading-7">Content included in a published project is publicly accessible through its assigned hostname. Draft projects and their assets are restricted to the authenticated owner.</p>
      <h2 className="mt-10 text-xl font-semibold text-ft-ink">Retention and security</h2>
      <p className="mt-3 leading-7">The service uses access controls, scoped storage keys, request validation, and activity logs. Retention periods and data-request contact details will be finalized before general commercial availability.</p>
      <p className="mt-10 text-sm text-ft-muted">Last updated July 17, 2026.</p>
    </main>
  );
}
