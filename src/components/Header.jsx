import React from 'react';

const Header = ({ cartItems }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <div>
        <h1 className="text-xl font-bold">Full Stack Developer Test | MoustacheRepublic</h1>
      </div>
      <div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">My Cart ({cartItems.length})</button>
        <div className="minicart">
          {cartItems.map((item) => (
            <div key={item.id} className="minicart-item">
              <span>{item.name} ({item.size}) x {item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
