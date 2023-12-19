import axios from "axios";
import { produce } from "immer";
import { ReactNode, createContext, useState } from "react";

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  numberPrice: number;
  price: string;
  description: number;
  defaultPriceId: string;
}


interface CartContextType {
  cartItems: IProduct[];
  handleAddNewCartItem: (item: IProduct) => void;
  checkIfItemAlreadyExists: (itemId: string) => boolean;
  removeItemFromCart: (itemId: string) => void;
  handleCheckout: () => void;
  cartTotal: number
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: CartProviderProps) {

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  const cartTotal = cartItems.reduce((total, product) => {
    return total + product.numberPrice;
  }, 0);


  function handleAddNewCartItem(item: IProduct) {
    setCartItems((state) => [...state, item]);
  }

  function checkIfItemAlreadyExists(itemId: string) {
    return cartItems.some(item => itemId === item.id)
  }

  function removeItemFromCart(itemId: string) {
    const newCartItems = produce(cartItems, (draft) => {
      const coffee = cartItems.findIndex((item) => item.id === itemId)

      if (coffee >= 0) {
        draft.splice(coffee, 1)
      }
    })

    setCartItems(newCartItems)
  }

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true)
      
      const response = await axios.post('/api/checkout', {
        products: cartItems
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {

      setIsCreatingCheckoutSession(false)

      //conectar com uma ferramenta de observabilidade (datadog, Sentry)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <CartContext.Provider value={{cartItems, handleAddNewCartItem, checkIfItemAlreadyExists, removeItemFromCart, handleCheckout, cartTotal}}>
      {children}
    </CartContext.Provider>
  )
}