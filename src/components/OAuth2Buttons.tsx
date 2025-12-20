import React from 'react'
import { NavLink } from 'react-router';

const OAuth2Buttons = () => {

const handleGoogleLogin = () => {
    console.log("Google OAuth Login");
    // window.location.href = "http://localhost:8090/oauth2/authorization/google";
  };

  const handleGithubLogin = () => {
    console.log("GitHub OAuth Login");
    // window.location.href = "http://localhost:8090/oauth2/authorization/github";
  };

  return (
        <div className="oauth-buttons">
            <NavLink to={"http://localhost:8090/oauth2/authorization/google"}>
                <button
                    type='button'
                    className="btn oauth-btn google-btn w-100 mb-2"
                >
                    Continue with Google
                </button>
          </NavLink>

            <NavLink to={"http://localhost:8090/oauth2/authorization/github"}>
                <button
                    type='button'
                    className="btn oauth-btn github-btn w-100"
                >
                    Continue with GitHub
                </button>
          </NavLink>
        </div>
  )
}

export default OAuth2Buttons;
