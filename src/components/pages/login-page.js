import React from 'react';

const LoginPage = ({isLoggedIn, loginHandler}) => {
  if (isLoggedIn) {
    return <p>You are logged in</p>
  }

  return (
    <div className="jumbotron">
      <p>Login to secret page!</p>
      <button
        className="btn btn-primary"
        onClick={loginHandler}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;
