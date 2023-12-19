import { styled } from "@stitches/react";
import * as Dialog from '@radix-ui/react-dialog'

export const CartButton = styled('button', {
  border: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '3rem',
  height: '3rem',
  borderRadius: '0.375rem',
  position: 'relative',

  backgroundColor: '$gray800',
  cursor: 'pointer',

  svg: {
    color: '$gray400',
  },

  '&:hover': {
    transition: 'background-color .2s',
    filter: 'brightness(0.8)'
  },

  span: {
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '50%',
    backgroundColor: '$green500',
    outline: '3px solid $gray900',
    
    position: 'absolute',
    top: '-0.75rem',
    right: '-0.75rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    fontSize: '0.875rem',
    fontWeight: 'bold',
    lineHeight: '1.6',
    color: '$white'
  }
})

export const CartContent = styled(Dialog.Content, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,

  width: '30rem',
  backgroundColor: '$gray800',
  padding: '3rem',
  paddingTop: '4.5rem',
  boxShadow: '-4px 0px 30px rgba(0,0,0, 0.8)',

  display: 'flex',
  flexDirection: 'column',

  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    height: '100%',
  },

  '& > h2': {
    marginBottom: '2rem'
  }
});

export const CartClose = styled(Dialog.Close, {
  background: 'none',
  border: 'none',
  position: 'absolute',
  top: '1.75rem',
  right: '1.75rem',
  color: '$gray500',
  cursor: 'pointer',
});

export const CartItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '1.25rem',

  div: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '0.125rem',

    span: {
      fontSize: '1.125rem',
      lineHeight: '1.6',
      color: '$gray300'
    },

    strong: {
      fontSize: '1.125rem',
      lineHeight: '1.6',
      color: '$gray100'
    },

    button: {
      cursor: 'pointer',
      border: 'none',
      backgroundColor: 'transparent',
      padding: 0,

      display: 'flex',
      alignItems: 'flex-start',
      
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '$green500',

      '&:hover': {
        color: '$green300',
      }
    }
  }
})

export const CartItemData = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem'
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 102,
  height: 93,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  }
})

export const AmountData = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '3.5rem',
  marginTop: 'auto',

  button: {
    width: '100%',
    backgroundColor: '$green500',

    fontSize: '1.125rem',
    lineHeight: '1.6',
    fontWeight: 'bold',
    color: '$white',

    border: 'none',
    borderRadius: '0.5rem',
    padding: '1.25rem',

    '&:hover': {
      transition: 'background-color .2s',
      backgroundColor: '$green300'
    }
  }
})

export const ItemsResume = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    'span:nth-child(1)': {
      fontSize: '1rem',
      color: '$gray300',
    },

    'span:nth-child(2)': {
      fontSize: '1.125rem',
      color: '$gray300',
    },

    'strong:nth-child(1)': {
      fontSize: '1.125rem',
      color: '$gray100',
    },

    'strong:nth-child(2)': {
      fontSize: '1.5rem',
      color: '$gray100',
    }
  },
})