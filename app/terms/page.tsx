export const metadata = {
  title: "Terms of Service | AIXplorerHub",
  description: "Terms of service for AIXplorerHub AI tools platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-10 max-w-3xl mx-auto">
      
      <h1 className="text-4xl font-bold mb-6">
        📄 Terms of Service
      </h1>

      <p className="text-gray-300 mb-4">
        By using AIXplorerHub, you agree to the following terms and conditions.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Usage
      </h2>
      <p className="text-gray-400">
        You may use this platform for personal and educational purposes only.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Accounts
      </h2>
      <p className="text-gray-400">
        You are responsible for your account activity and security.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Limitation of Liability
      </h2>
      <p className="text-gray-400">
        We are not responsible for any damages caused by the use of AI tools listed.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Changes
      </h2>
      <p className="text-gray-400">
        We may update these terms at any time.
      </p>

    </div>
  );
}