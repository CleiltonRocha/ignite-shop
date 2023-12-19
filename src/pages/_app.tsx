import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"
import logoImage from '../assets/logo.svg'
import Image from "next/image"
import { Container, Header } from "../styles/pages/app"
import { Cart } from "../components/Cart"
import { CartProvider } from "../contexts/CartContext"
import Link from "next/link"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Container>
        <Header>
          <Link href="/">
            <Image src={logoImage} alt="" />
          </Link>
          <Cart />
        </Header>
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}

