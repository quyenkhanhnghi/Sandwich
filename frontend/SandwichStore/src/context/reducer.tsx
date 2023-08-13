import { Cookie } from "@mui/icons-material";
import { deleteOrder } from "../services/orders";
import { updateCart } from "../utils/cart";
import { Cookies } from "typescript-cookie";

type OrderStatus = "Ordered" | "Received" | "InQueue" | "Ready" | "Failed";

interface Topping {
  id: number;
  name: string;
}

interface ToppingUser {
  id: number;
  name: string;
  number: number;
}

interface Time {
  orderTime: string;
  receiveOrderTime: string;
  inQueueTime: string;
  doneTime: string;
}

export interface Sandwich {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  toppings: Array<Topping>;
  breadType: string;
}

export interface SandwichUser {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  toppings: Array<ToppingUser>;
  breadType: string;
}

export interface Order {
  _id: string;
  customerId: string;
  items: SandwichUser[];
  status: OrderStatus;
  activeStep: number;
  customerName: string;
  time: Time;
  orderPrice: number;
}

export interface User {
  name: string;
  email: string;
  role: "customer" | "admin";
}

const mapToppingsToToppingsUser = (toppings: Topping[]): ToppingUser[] => {
  return toppings.map(
    (topping: Topping): ToppingUser => ({
      id: topping.id,
      name: topping.name,
      number: 0,
    })
  );
};

const convertSandwichToSandwichUser = (sandwich: Sandwich): SandwichUser => {
  const { _id, name, price, image, description, toppings, breadType } =
    sandwich;
  return {
    _id,
    name,
    price,
    image,
    description,
    toppings: mapToppingsToToppingsUser(toppings),
    breadType,
  };
};

const modifyToppingUser = (
  sandwich: SandwichUser,
  id: number,
  number: number
): SandwichUser => {
  const newTopping = [...sandwich.toppings];
  newTopping[id].number += number;
  newTopping[id].number = newTopping[id].number < 0 ? 0 : newTopping[id].number;
  return { ...sandwich, toppings: newTopping };
};

export type Action =
  | { type: "set-sandwiches"; payload: Sandwich[] }
  | { type: "set-current-sandwich"; payload: Sandwich | undefined }
  | { type: "open-login" }
  | { type: "close-login" }
  | { type: "login-failed"; payload: string }
  | { type: "set-snackbar-message"; payload: string }
  | { type: "clear-login-message" }
  | { type: "close-snackbar" }
  | { type: "set-user"; payload: User | null }
  | { type: "set-current-topping"; id: number; number: number }
  | { type: "set-cart"; payload: SandwichUser[] }
  | { type: "add-to-cart" }
  | { type: "togle-cart" }
  | { type: "togle-register" }
  | { type: "remove-item-cart"; id: number }
  | { type: "set-orders"; payload: Order[] }
  | { type: "set-signup-message"; payload: string }
  | { type: "delete-order"; orderId: string };

export const reducer = (
  state: StoreStateType,
  action: Action
): StoreStateType => {
  switch (action.type) {
    case "set-sandwiches": {
      return {
        ...state,
        sandwiches: [...action.payload],
      };
    }

    case "open-login": {
      return {
        ...state,
        openLogin: true,
      };
    }

    case "close-login": {
      return {
        ...state,
        openLogin: false,
      };
    }

    case "clear-login-message": {
      return {
        ...state,
        loginMessage: null,
      };
    }

    case "login-failed": {
      return {
        ...state,
        loginMessage: action.payload,
      };
    }

    case "set-snackbar-message": {
      return {
        ...state,
        snackOpen: true,
        snackMessage: action.payload,
      };
    }

    case "close-snackbar": {
      return {
        ...state,
        snackOpen: false,
      };
    }

    case "set-user": {
      return {
        ...state,
        user: action.payload,
      };
    }

    case "set-current-sandwich": {
      return {
        ...state,
        currentSandwich: action.payload
          ? convertSandwichToSandwichUser(action.payload)
          : undefined,
      };
    }

    case "set-current-topping": {
      return {
        ...state,
        currentSandwich: state.currentSandwich
          ? modifyToppingUser(state.currentSandwich, action.id, action.number)
          : undefined,
      };
    }

    case "set-cart": {
      updateCart(action.payload);
      return {
        ...state,
        cart: action.payload,
      };
    }

    case "add-to-cart": {
      const newCart = [...state.cart];
      newCart.push(state.currentSandwich!);
      updateCart(newCart);

      return {
        ...state,
        cart: newCart,
      };
    }

    case "togle-cart": {
      return {
        ...state,
        openCart: !state.openCart,
      };
    }

    case "remove-item-cart": {
      const newCart = [...state.cart];
      newCart.splice(action.id, 1);
      updateCart(newCart);

      return {
        ...state,
        cart: newCart,
      };
    }

    case "set-orders": {
      return {
        ...state,
        orders: action.payload.map((order) => {
          let step = 0;
          switch (order.status) {
            case "Ordered":
            step = 1;
              break;

            case "Received":
              step = 2;
              break;

            case "InQueue":
              step = 3;
              break;

            case "Ready":
              step = 4;
              break;

            case "Failed":
              step = 4;
              break;

            default:
              break;
          }

          return {
            ...order,
            activeStep : step
          }
        }),
      };
    }

    case "set-signup-message": {
      return {
        ...state,
        signupMessage : action.payload
      }
    }

    case "togle-register" : {
      return {
        ...state,
        openRegister : !state.openRegister
      }
    }

    case "delete-order" : {
      deleteOrder(action.orderId, Cookies.get('accessToken')?.toString()!);
      const newOrder = state.orders.filter(order => order._id !== action.orderId);
      return {
        ...state,
        orders : newOrder
      }
    }

    default:
      return {
        ...state,
      };
  }
};

export interface StoreStateType {
  openLogin: boolean;
  openRegister: boolean;
  openCart: boolean;
  snackOpen: boolean;

  loginMessage: string | null;
  signupMessage: string | null;

  sandwiches: Array<Sandwich>;
  username: string | null;
  snackMessage: string;
  user: User | null;
  currentSandwich: SandwichUser | undefined;
  cart: SandwichUser[];
  orders: Order[];
}

export const initialState: StoreStateType = {
  openLogin: false,
  sandwiches: [],
  loginMessage: null,
  username: null,
  snackOpen: false,
  snackMessage: "",
  user: null,
  currentSandwich: undefined,
  cart: [],
  openCart: false,
  orders: [],
  openRegister: false,
  signupMessage: null
};
