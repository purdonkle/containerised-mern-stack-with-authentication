import React from "react";

export const LoginPage = () => {
  return (
    <div>
      <div>Login Page</div>
      <button
        onClick={() =>
          (window.location.href = "http://localhost:8080/api/auth/google")
        }
      >
        Login with Google
      </button>
    </div>
  );
};
