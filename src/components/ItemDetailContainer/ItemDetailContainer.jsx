import React, { useState, useEffect, useContext } from "react";
import { getProd } from "../../services/firebase";
import { cartContext } from "../../storage/cartContext";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";

function ItemDetailContainer() {
  const [prod, setProd] = useState({ title: "loading", price: "--,--" });
  const [isInCart, setIsInCart] = useState(false);

  let params = useParams();
  const { cart, addToCart } = useContext(cartContext);

  function handleAddToCart(count) {
    setIsInCart(true);
    const prodAndCount = { ...prod, count: count };
    addToCart(prodAndCount);
  }

  function checkStock() {
    let itemInCart = cart.find((item) => item.id === prod.id);

    let stockUpdated = prod.stock;

    if (itemInCart) {
      stockUpdated = prod.stock - itemInCart.count;
    }
    return stockUpdated;
  }

  useEffect(() => {
    getProd(params.itemid)
      .then((respuesta) => {
        setProd(respuesta);
      })
      .catch((error) => alert(error));
  }, []);

  return (
    <ItemDetail
      isInCart={isInCart}
      onAddToCart={handleAddToCart}
      title={prod.title}
      imgurl={prod.imgurl}
      desc={prod.desc}
      price={prod.price}
      id={prod.id}
      stockUpdated={checkStock()}
    />
  );
}

export default ItemDetailContainer;
