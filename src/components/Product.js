import React from "react";

const Product = ({ filteredProducts, handleAddToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded shadow hover:shadow-md transition flex flex-col"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-40 w-full object-contain mb-2"
          />
          <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
          <p className="text-gray-700 mb-1">${product.price}</p>
          <p className="text-sm text-gray-500 mb-2">
            Category: {product.category}
          </p>
          <button
            onClick={() => handleAddToCart(product)}
            className="mt-auto bg-green-500 text-white py-1 rounded hover:bg-green-600"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Product;
