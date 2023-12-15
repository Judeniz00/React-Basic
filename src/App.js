import React, { useReducer } from 'react';
import "./App.css";

// Reducer fonksiyonu
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    case 'CALCULATE_TOTAL':
      const total = state.cart.reduce((acc, item) => acc + item.price, 0);
      return {
        ...state,
        total,
      };
    default:
      return state;
  }
};

// Başlangıç state'i
const initialState = {
  cart: [],
  total: 0,
};

// Komponent
const ShoppingCart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItemToCart = (id, name, price) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { id, name, price },
    });
  };

  const removeItemFromCart = (item) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: item,
    });
  };

  const clearCart = () => {
    dispatch({
      type: 'CLEAR_CART',
    });
  };

  const calculateTotal = () => {
    dispatch({
      type: 'CALCULATE_TOTAL',
    });
  };

  return (
    <div className="shopping-cart">
      <h2>Alışveriş Sepeti</h2>
      <div className="buttons">
        <button onClick={() => addItemToCart(1, 'Ürün 1', 10)}>Ürün 1 Ekle</button>
        <button onClick={() => addItemToCart(2, 'Ürün 2', 20)}>Ürün 2 Ekle</button>
        <button onClick={() => addItemToCart(3, 'Ürün 3', 30)}>Ürün 3 Ekle</button>
      </div>

      <div className="cart-content">
        <h3>Sepet İçeriği:</h3>
        <ul className="item-list">
          {state.cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button onClick={() => removeItemFromCart(item)}>Kaldır</button>
            </li>
          ))}
        </ul>

        <p>Toplam Tutar: ${state.total}</p>
        <div className="cart-buttons">
          <button onClick={calculateTotal}>Toplam Tutarı Hesapla</button>
          <button onClick={clearCart}>Sepeti Temizle</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;