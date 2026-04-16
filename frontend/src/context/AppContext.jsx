import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import API from '../api';

// ─── Initial State ───────────────────────────────────────────────────────────
const initialState = {
  user: JSON.parse(localStorage.getItem('mithas_user') || 'null'),
  token: localStorage.getItem('mithas_token') || null,
  cart: JSON.parse(localStorage.getItem('mithas_cart') || '[]'),
  toast: null,
};

// ─── Reducer ─────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('mithas_token', action.token);
      localStorage.setItem('mithas_user', JSON.stringify(action.user));
      return { ...state, user: action.user, token: action.token };
    case 'LOGOUT':
      localStorage.removeItem('mithas_token');
      localStorage.removeItem('mithas_user');
      return { ...state, user: null, token: null };
    case 'ADD_TO_CART': {
      const existing = state.cart.find(i => i.id === action.item.id);
      const cart = existing
        ? state.cart.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i)
        : [...state.cart, { ...action.item, qty: 1 }];
      localStorage.setItem('mithas_cart', JSON.stringify(cart));
      return { ...state, cart };
    }
    case 'REMOVE_FROM_CART': {
      const cart = state.cart.filter(i => i.id !== action.id);
      localStorage.setItem('mithas_cart', JSON.stringify(cart));
      return { ...state, cart };
    }
    case 'UPDATE_QTY': {
      const cart = action.qty <= 0
        ? state.cart.filter(i => i.id !== action.id)
        : state.cart.map(i => i.id === action.id ? { ...i, qty: action.qty } : i);
      localStorage.setItem('mithas_cart', JSON.stringify(cart));
      return { ...state, cart };
    }
    case 'CLEAR_CART':
      localStorage.removeItem('mithas_cart');
      return { ...state, cart: [] };
    case 'SET_TOAST':
      return { ...state, toast: action.toast };
    case 'CLEAR_TOAST':
      return { ...state, toast: null };
    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────
const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showToast = useCallback((message, type = 'success') => {
    dispatch({ type: 'SET_TOAST', toast: { message, type } });
    setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 3500);
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    dispatch({ type: 'LOGIN', token: data.token, user: data.user });
    showToast(`Swagat hai, ${data.user.name}! 🍦`);
    return data;
  };

  const register = async (formData) => {
    const { data } = await API.post('/auth/register', formData);
    dispatch({ type: 'LOGIN', token: data.token, user: data.user });
    showToast(`Welcome to Mithas, ${data.user.name}! 🎉`);
    return data;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    showToast('Phir milenge! 👋');
  };

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', item });
    showToast(`${item.name} added to cart! 🛒`);
  };

  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', id });
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const cartTotal = state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = state.cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <AppContext.Provider value={{
      ...state, cartTotal, cartCount,
      login, register, logout,
      addToCart, removeFromCart, updateQty, clearCart,
      showToast
    }}>
      {children}
      {state.toast && (
        <div className={`toast ${state.toast.type}`}>
          {state.toast.message}
        </div>
      )}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
