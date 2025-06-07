import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Helper to persist cart
  const saveCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Total price calculation
  const getTotalPrice = () =>
    cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    saveCart(updatedCart);
    toast.success("Item removed from cart", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="p-4 bg-slate-50 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center border p-4 rounded shadow"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right font-bold text-xl">
            Total: ${getTotalPrice()}
          </div>
        </div>
      )}

      <button
        onClick={handleBackToHome}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back to Home
      </button>
    </div>
  );
};

export default memo(Cart);
