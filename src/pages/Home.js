import { memo, startTransition } from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import { toast } from "react-toastify";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      startTransition(() => {
        navigate("/login");
      });
    } else {
      setUser(loggedInUser);
    }

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, [navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
      setFilteredProducts(res.data);
      const uniqueCategories = [
        "all",
        ...new Set(res.data.map((item) => item.category)),
      ];
      setCategories(uniqueCategories);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const handleAddToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    let updatedCart;
    if (existing) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
    toast.success(`${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 text-gray-800">
      <Navbar cart={cart} />
      {/* Filter and Search */}
      <div className="bg-white shadow-sm py-6 px-4 sm:px-6 lg:px-8 rounded-lg max-w-5xl mx-auto mb-6 mt-20">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-4 py-2 rounded w-full md:w-1/2"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border px-4 py-2 rounded w-full md:w-1/4"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products */}
      <Product
        filteredProducts={filteredProducts}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default memo(Home);
