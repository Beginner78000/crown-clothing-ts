import { FC } from 'react';

import { CartItemContainer, ItemDetails } from './cartItem.styles';
import { CartItem as TCartItem } from '../../actions/types/cart.types';

type CartItemProps = {
  cartItem: TCartItem;
};

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
    const { imageUrl, price, name, quantity } = cartItem;

    return (
      <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
    );
};

export default CartItem;
