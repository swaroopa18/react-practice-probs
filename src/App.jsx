// src/components/Auth.jsx
import { useState } from "react";
import { signIn as amplifySignIn, updateMFAPreference } from "aws-amplify/auth";
import { Authenticator } from "@aws-amplify/ui-react";

const App = () => {
  const resetMFA = async () => {
    try {
       await updateMFAPreference({
        totp: "DISABLED"
      });
      console.log("Disabled suceesfully");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <>
      <Authenticator>
        {({ signOut, user }) => (
          <div>
            <h1>Welcome, {user?.username}!</h1>
            <button onClick={signOut}>Sign Out</button>
          </div>
        )}
      </Authenticator>
      <button onClick={resetMFA}>reset MFA </button>
    </>
  );
};

export default App;
