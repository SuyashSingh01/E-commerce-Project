import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ cart }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };
  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <h1 className="text-xl font-bold">FakeStore</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={goToCart}
          className="bg-yellow-500 px-4 py-1 rounded hover:bg-yellow-600"
        >
          Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
        </button>
        {user && <span className="hidden sm:inline">Welcome, {user.name}</span>}
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
