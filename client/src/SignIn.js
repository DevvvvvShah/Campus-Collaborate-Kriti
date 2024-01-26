import React from "react";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div>
      <Link to="/signIn">
        <h1 className="text-xl">Sign In</h1>
      </Link>
    </div>
  );
}

export default SignIn;
