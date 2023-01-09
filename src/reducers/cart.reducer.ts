import { AnyAction } from 'redux';

import { CartItem } from '../actions/types/cart.types';
import { setIsCartOpen, setCartItems } from '../actions/cart.action';

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
}

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction)=> {
    if(setIsCartOpen.match(action)) {
        return {
            ...state,
            isCartOpen: action.payload,
        };
    }

    if(setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload,
        };
    }
    
    return state;
};

export default cartReducer;