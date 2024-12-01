import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function AddUser() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [scoutId, setScoutId] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedReferralId, setGeneratedReferralId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, scoutId}),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setGeneratedReferralId(result.scoutId || "No ID generated");

      toast.success("User added successfully");
      setEmail("");
      setUsername("");
      setScoutId("");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Add New User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full text-black"
          />
        </div>
        <div>
          <label className="block mb-2">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full text-black"
          />
        </div>
        
        <div>
          <label className="block mb-2">Referral ID (Optional):</label>
          <input
            type="text"
            value={scoutId}
            onChange={(e) => setScoutId(e.target.value)}
            className="border border-gray-300 p-2 w-full text-black"
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded ${loading ? 'opacity-50' : ''}`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>

      {generatedReferralId && (
        <div className="mt-4 p-2 border border-green-500 text-green-500 rounded">
          Generated Referral ID: {generatedReferralId}
        </div>
      )}
    </div>
  );
}
