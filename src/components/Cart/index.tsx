import * as Dialog from '@radix-ui/react-dialog'
import { Handbag, X } from 'phosphor-react'
import { 
  AmountData, 
  CartButton, 
  CartClose, 
  CartContent, 
  CartItem, 
  CartItemData, 
  ImageContainer, 
  ItemsResume 
} from './styles'
import { CartContext } from '../../contexts/CartContext'
import { useContext } from 'react'
import Image from 'next/image'

export function Cart() {

  const { cartItems, removeItemFromCart, handleCheckout, cartTotal } = useContext(CartContext)
  const totalItems = cartItems.length

  function handleRemoveItemFromCart(itemId: string) {
    removeItemFromCart(itemId);
  }

  const cartTotalFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(cartTotal)

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton>
          <Handbag size={24} weight="bold" />
          <span>{cartItems.length}</span>
        </CartButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X size={24} weight='bold' />
          </CartClose>
          <h2>Sacola de Compras</h2>
          <section>
            {totalItems == 0 && <p>Não há items no carrinho</p>}
            {
              totalItems > 0 && (
                cartItems.map((item) => {
                  return (
                    <CartItem key={item.id}>
                      <ImageContainer>
                        <Image src={item.imageUrl} alt="" width={94} height={94}/>
                      </ImageContainer>
                      <div>
                        <CartItemData>
                          <span>{item.name}</span>
                          <strong>{item.price}</strong>
                        </CartItemData>

                        <button onClick={() => handleRemoveItemFromCart(item.id)}>
                          Remover
                        </button>
                      </div>
                    </CartItem>
                  )
                })
              )
            }
            {cartItems.length > 0 && (
              <AmountData>
                <ItemsResume>
                  <div>
                    <span>Quantidade</span>
                    <span>{totalItems} { totalItems == 1 ? ' Item':' Itens'}</span>
                  </div>
                  <div>
                    <strong>Valor Total</strong>
                    <strong>{cartTotalFormatted}</strong>
                  </div>
                </ItemsResume>
                <button onClick={handleCheckout}>
                  Finalizar Compra
                </button>
              </AmountData>
            )}
          </section>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}