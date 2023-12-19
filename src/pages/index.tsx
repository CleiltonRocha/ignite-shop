import Image from "next/image"
import Head from 'next/head'
import { GetStaticProps } from "next"
import Link from 'next/link'
import { CartButton, HomeContainer, Product, ProductData } from "../styles/pages/home"

import {useKeenSlider} from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from "../lib/stripe"
import Stripe from "stripe"
import { Handbag } from "phosphor-react"
import { MouseEvent, useContext } from "react"
import { CartContext, IProduct } from "../contexts/CartContext"

interface IHome {
  products: IProduct[]
}

export default function Home({products}: IHome) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  const { handleAddNewCartItem, checkIfItemAlreadyExists, cartItems } = useContext(CartContext)

  function addNewCartItem(e: MouseEvent<HTMLButtonElement>,  item: IProduct) {
    e.preventDefault()

    if (!checkIfItemAlreadyExists(item.id)) {
      handleAddNewCartItem(item)
    }
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
      {
          products.map(product => {
            return (
              <Link key={product.id} prefetch={false} href={`/product/${product.id}`}>
                <Product className="keen-slider__slide">
                  <Image src={product.imageUrl} width={520} height={480} alt=""/>
                  <footer>
                    <ProductData>
                      <strong>{product.name}</strong>
                      <span>{product.price}</span>
                    </ProductData>
                    <CartButton onClick={(e) => addNewCartItem(e, product)}>
                      <Handbag size={32} weight="bold"/>
                    </CartButton>
                  </footer>
                </Product>
              </Link>
            )
          })
        }
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100),
      numberPrice: price.unit_amount / 100,
      defaultPriceId: price.id,
    }
  })

  return {
    props : {
      products
    },
    revalidate: 60 * 60 * 2, //2 horas
  }
}
