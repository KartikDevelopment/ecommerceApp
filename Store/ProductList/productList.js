import { GetList, AddToCart, RemoveFromCart, ClearCart } from "./actionType";
const initialState = {
  value: 0,
  productList: [],
  cartList: [],
};
function findObjectIndexById(array, idToCheck) {
  const index = array.findIndex((obj) => obj?.id === idToCheck);
  const found = index !== -1;
  return { found, index };
}
export const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GetList:
      return {
        ...state,
        productList: action.data,
      };
    case AddToCart:
      const { found, index } = findObjectIndexById(
        state.cartList,
        action.data.id
      );
      let data = JSON.parse(JSON.stringify(state.cartList));
      if (found) {
        if (isNaN(data[index].count)) {
          data[index].count = 1;
        } else {
          data[index].count += 1;
        }
      } else {
        data = [...data, { ...action.data, count: 1 }];
      }
      return {
        ...state,
        cartList: data,
      };
    case RemoveFromCart: {
      const { found, index } = findObjectIndexById(
        state.cartList,
        action.data.id
      );
      let data1 = JSON.parse(JSON.stringify(state.cartList));

      if (found) {
        if (data1[index].count <= 1) {
          data1.splice(index, 1);
        } else {
          data1[index].count = data1[index].count - 1;
        }
      } else {
      }
      return {
        ...state,
        cartList: data1,
      };
    }
    case ClearCart: {
      return {
        ...state,
        cartList: [],
      };
    }

    default:
      return state;
  }
};
