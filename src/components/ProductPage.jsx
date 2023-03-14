import React, { useState, useEffect } from 'react';
import Header from './Header';

const SizeSwatch = ({ size, selected, onClick }) => {
  const bgColor = selected ? 'bg-gray-800' : 'bg-gray-200';

  return (
    <div className={`rounded-full h-8 w-8 flex items-center justify-center mr-2 ${bgColor}`}
         onClick={onClick}>
      <span className="text-white font-bold">{size}</span>
    </div>
  );
};

const ProductPage = ({ addToCart }) => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product')
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.log(error));
  }, []);

  const handleAddToCart = () => {
    // Handle adding product to cart
    if (!selectedSize) {
      setError("Please select a size");
      return;
    }

    console.log(`Added ${quantity} ${product.title} (${selectedSize}) to cart!`);
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      size: selectedSize,
      quantity: parseInt(quantity)
    });
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setError(null);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const sizeOptions = product.sizeOptions.map((sizeOption) => (
    <SizeSwatch key={sizeOption.id}
                size={sizeOption.label}
                selected={selectedSize === sizeOption.label}
                onClick={() => handleSizeClick(sizeOption.label)} />
  ));

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="w-1/2 p-4">
        <img src={product.imageURL} alt={product.name} className="max-w-full h-auto" />
      </div>
      <div className="w-1/2 p-4 text-left">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <div className="text-lg font-bold my-4 border-t border-b py-2">${product.price.toFixed(2)}</div>
        <p className="my-4">{product.description}</p>
        <div className="flex flex-row items-center my-4">
          <div className="my-4">
            <label className="mr-2">Size:</label>
            <div className="flex flex-row">{sizeOptions}</div>
          </div>
        </div>
        <div className="flex flex-row items-center my-4">
          <label className="mr-2">Quantity:</label>
          <input type="number" min="1" value={quantity} onChange={handleQuantityChange} className="border rounded-md py-2 px-4" />
        </div>
        <button onClick={handleAddToCart} className="bg-blue-500 text-white py-2 px-4 rounded-lg">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductPage;