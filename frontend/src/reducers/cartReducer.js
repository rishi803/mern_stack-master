import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  UPDATE_ORDER_HISTORY,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {}, orderHistory: [] },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    case UPDATE_ORDER_HISTORY:
      return {
        ...state,
        orderHistory: [...state.orderHistory, action.payload],
      };

    default:
      return state;
  }
};
