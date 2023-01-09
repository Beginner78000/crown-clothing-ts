import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button, { BUTTON_TYPE_CLASSES } from "../Button";
import { addItemToCart } from "../../actions/cart.action";
import { selectCartItems } from "../../selectors/cart.selector";
import { CategoryItem as TCategoryItem } from '../../actions/types/category.types';

import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from './productCard.styles';

type ProductCardProps = {
  product: TCategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) =>{
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, price, imageUrl } = product;
  
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
  
    return (
      <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </Button>
    </ProductCartContainer>
    );
}

export default ProductCard;
