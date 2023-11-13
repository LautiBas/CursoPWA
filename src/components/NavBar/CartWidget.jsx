import React, { createContext, useContext } from "react";
import { cartContext } from "../../storage/cartContext";

function CartWidget() {
  const contexto = useContext(cartContext);

  return (
    <>
      <span>
        <img
          style={{ width: 35, height: 35 }}
          src="./carrito.png"
          alt="carrito"
        />
      </span>
      <span>{contexto.getTotalItemsInCart()}</span>
    </>
  );
}

export default CartWidget;
