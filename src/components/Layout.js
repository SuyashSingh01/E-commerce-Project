import React from "react";

import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
