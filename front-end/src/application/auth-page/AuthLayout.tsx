import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>Auth Header</header>
      <main>{children}</main>
      <footer>Auth Footer</footer>
    </div>
  );
};

export default AuthLayout;
