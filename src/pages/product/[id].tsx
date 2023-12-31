import { useContext, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from "next"
import Image from 'next/image' 
import Head from 'next/head'

import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"
import { stripe } from "../../lib/stripe"
import Stripe from "stripe"
import { CartContext, IProduct } from '../../contexts/CartContext'
import { title } from 'process'

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {

  const {checkIfItemAlreadyExists, handleAddNewCartItem} = useContext(CartContext)
  const itemAlreadyInCart = checkIfItemAlreadyExists(product.id);

  return (
    <>
    <Head>
      <title>{product.name} | Ignite Shop</title>
    </Head>
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt="" width={520} height={480} />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button disabled={itemAlreadyInCart} onClick={() => handleAddNewCartItem(product)}>
          {itemAlreadyInCart ? 'Produto já está no carrinho' : 'Adicionar à Sacola'}
        </button>
      </ProductDetails>
    </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_P9WB7vOJaVOrPs' } }
    ],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({params}) => {

  const productId = params.id;
  
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100),
      description: product.description,
      defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1, //1 hora
  }
}