export const metadata = {
  title: "Privacy Policy | AIXplorerHub",
  description: "Privacy policy for AIXplorerHub AI tools platform.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white p-10 max-w-3xl mx-auto">
      
      <h1 className="text-4xl font-bold mb-6">
        🔒 Privacy Policy
      </h1>

      <p className="text-gray-300 mb-4">
        We respect your privacy. AIXplorerHub collects minimal user data
        to provide authentication and improve user experience.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Data We Collect
      </h2>
      <p className="text-gray-400">
        - Google account name<br />
        - Email address<br />
        - Favorite tools you save
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        How We Use Data
      </h2>
      <p className="text-gray-400">
        We use data only for authentication and personalization.
        We do not sell or share your data.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Contact
      </h2>
      <p className="text-gray-400">
        For questions, contact us at support@aixplorerhub.com
      </p>

    </div>
  );
}