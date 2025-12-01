// src/components/Login.jsx
import { useState } from "react";
import { login, signInWithGoogle } from "../auth";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate(); // <-- FIXED

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      navigate("/"); // <-- Redirect after login
    } catch (err) {
      setError(err.message || "Failed to log in. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    setError("");

    try {
      const result = await signInWithGoogle();
      console.log(result.user);
      navigate("/home"); // <-- FIXED
    } catch (err) {
      setError(err.message || "Google login failed.");
      console.error("Google login error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-center">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-indigo-200 mt-2">Sign in to your account</p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            {error && (
              <div className="mb-5 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Forgot?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition ${
                  isLoading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              onClick={handleGoogle}
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition ${
                isLoading ? "cursor-not-allowed opacity-75" : ""
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                  fill="#4285F4"
                />
                <path
                  d="M23.444 12.013c0-.795-.086-1.41-.189-1.99h-11.255v4.08h6.26c-.275 1.448-1.1 3.21-2.79 4.155l3.254 3.138c1.89-1.755 2.983-4.32 2.983-7.303z"
                  fill="#34A853"
                />
                <path
                  d="M5.26 14.294c-.708-2.263.143-4.74 2.102-6.248l-3.255-3.14C1.77 5.496 0 8.27 0 12s1.77 6.504 4.107 7.094l3.255-3.14c-1.06-.995-1.68-2.425-1.68-4.094z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.24 24c2.43 0 4.612-.804 6.32-2.176l-3.255-3.14c-.93.58-2.08.944-3.065.944-2.34 0-4.316-1.58-5.025-3.726L0 17.438C1.557 20.54 6.27 24 12.24 24z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <a
                href="/auth/sign-up"
                className="font-medium text-indigo-600 hover:text-indigo-800"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Your App. All rights reserved.
        </p>
      </div>
    </div>
  );
}
