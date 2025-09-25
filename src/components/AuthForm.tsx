import React, { useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

interface AuthFormProps {
  isLogin: boolean;
  toggleForm: () => void;
  onAuthSuccess?: () => void;
  onAuthError?: (message: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isLogin,
  toggleForm,
  onAuthSuccess,
  onAuthError,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
        onAuthError?.(result.error);
      } else if (result?.ok) {
        onAuthSuccess?.();
        router.push("/dashboard");
      }
    } else {
      try {
        const response = await axios.post("/api/auth/signup", {
          email,
          password,
        });
        if (response.status === 201) {
          alert("Account created successfully! Please log in.");
          toggleForm(); // Switch to login form after successful signup
          onAuthSuccess?.(); // Call success for signup as well
        } else {
          const errorMessage = response.data.message || "Signup failed.";
          setError(errorMessage);
          onAuthError?.(errorMessage);
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || "Signup failed.";
        setError(errorMessage);
        onAuthError?.(errorMessage);
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={loading}
      >
        {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
      </button>
      <button
        type="button"
        onClick={toggleForm}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
      </button>
    </form>
  );
};

export default AuthForm;
