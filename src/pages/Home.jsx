// src/pages/Home.jsx
import { useState } from "react";
import { logout } from "../auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");
  console.log("user", user);
  const navigate = useNavigate();
  const handleLogout = async () => {
    setIsLoggingOut(true);
    setError("");

    try {
      await logout();
      // ✅ Auth context will handle redirect automatically (e.g., to /auth/sign-in)
      // No need to manually navigate here — keep it decoupled
    } catch (err) {
      setError("Failed to log out. Please try again.");
      console.error("Logout error:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        {/* User Greeting */}
        {user ? (
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              {user.photoURL ? (
                <img
                  src={user.photoURL.trim()}
                  alt={user.email || "User"}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                />
              ) : (
                <span className="text-2xl font-bold text-indigo-600">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || "?"}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome
              {user.displayName ? `, ${user.displayName}` : ""}!
            </h1>
            <p className="text-gray-600 mt-2">{user.email}</p>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`px-6 py-3 rounded-xl font-medium text-white shadow-md transition-all
            ${
              isLoggingOut
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 active:scale-95 hover:shadow-lg"
            }`}
            >
              {isLoggingOut ? (
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
                  Signing out...
                </span>
              ) : (
                "Sign Out"
              )}
            </button>
          </div>
        ) : (
          navigate("/sign-in")
        )}

        {/* Logout Button */}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
            {error}
          </div>
        )}

        {/* Optional: App Info */}
        <div className="mt-10 text-gray-500 text-sm">
          <p>vite-firebase-authkit © {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
