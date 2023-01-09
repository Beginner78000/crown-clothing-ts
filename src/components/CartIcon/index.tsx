import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as ShoppingIcon } from './shopping-bag.svg';

import { setIsCartOpen } from '../../actions/cart.action';
import { selectIsCartOpen, selectCartCount } from "../../selectors/cart.selector"

import { CartIconContainer, ItemCount } from './cartIcon.styles';

function CartIcon() {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;