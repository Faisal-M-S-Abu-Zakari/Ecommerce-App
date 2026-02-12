export const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { productId, size } = action.payload;

      const existingItem = state.items.find(
        (item) => item.productId === productId && item.size === size,
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === productId && item.size === size
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { productId, size, quantity: 1 }],
      };
    }

    case "REMOVE_FROM_CART": {
      const { productId, size } = action.payload;

      return {
        ...state,
        items: state.items.filter(
          (item) => item.productId !== productId || item.size !== size,
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, size, quantity } = action.payload;

      if (quantity < 1) return state;

      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity }
            : item,
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
};

export default cartReducer;
