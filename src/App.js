import './App.css';
import ProductPage from './components/ProductPage';
import Header from './components/Header';
import { useState } from 'react';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <div className="App">
      <Header cartItems={cartItems} />
      <main className="max-w-6xl max-w-6xl mx-auto flex justify-center">
        <ProductPage addToCart={addToCart} />
      </main>
    </div>
  );
}

export default App;