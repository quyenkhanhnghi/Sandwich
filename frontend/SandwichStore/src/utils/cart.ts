import { SandwichUser } from "../context/reducer";

export const getAllCart = () : SandwichUser[] => {
  if (!localStorage.getItem("cart"))
  {
    localStorage.setItem("cart", JSON.stringify([]));
    return [];
  }

  return JSON.parse(localStorage.getItem("cart")!) as SandwichUser[];
}

export const updateCart = (sandwiches : SandwichUser[]) : void => {
  return localStorage.setItem("cart", JSON.stringify(sandwiches));
}