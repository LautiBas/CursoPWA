import React, { useState } from "react";
import { createOrder_WithStockControl } from "../../services/firebase";
import { useCartContext } from "../../storage/cartContext";
import { createOrder } from "../../services/firebase";
import Button from "../Button/Button";
import "./cart.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import FormCheckout from "../FormCheckout/FormCheckout";

function CartContainer() {
  const [orderId, setOrderId] = useState();

  const { cart, getTotalPriceInCart, removeItem } = useCartContext();
  const navigateTo = useNavigate();

  let suma = cart.reduce((acc, prod) => acc + prod.price * prod.count, 0);

  function handleCheckout(evt, userData) {
    const items = cart.map(({ id, price, title, count }) => ({
      id,
      price,
      title,
      count,
    }));

    const order = {
      buyer: userData,
      items: items,
      total: getTotalPriceInCart(),
      date: new Date(),
    };

    createOrder(order).then((id) => {
      Swal.fire({
        title: "Gracias por tu compra!",
        text: `este es tu ticket id: ${id}`,
        icon: "success",
        confirmButtonText: "Ok!",
      });
    });

    createOrder(order).then((id) => {
      navigateTo(`/thank-you/${id}`);
    });

    async function sendOrder() {
      try {
        let id = await createOrder_WithStockControl(order);
        setOrderId(id);
      } catch (error) {
        Swal.fire({
          title: "Ocurrió un error con tu compra",
          text: error,
          icon: "error",
          confirmButtonText: "Volver",
        });
      }
    }

    sendOrder();
  }

  if (orderId)
    return (
      <div>
        <h1>Gracias por tu compra</h1>
        <p>El id de tu compra {orderId}</p>
      </div>
    );

  return (
    <>
      <h1>Tu Carrito</h1>

      <table className="cartList">
        <thead className="cartList_head">
          <tr className="cartList_row">
            <th>Miniatura</th>
            <th>Titulo</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Remover</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="cartList_row">
              <td>
                <img height={50} src={item.imgurl} alt={item.title} />
              </td>
              <td>{item.title}</td>
              <td>$ {item.price}</td>
              <td>{item.count}</td>
              <td>
                <Button color="#c63224" onClick={() => removeItem(item.id)}>
                  X
                </Button>
              </td>
              <th>${item.count * item.price}</th>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cartList_detail">
        <h4>El total de tu compra es de ${suma}</h4>
      </div>

      <FormCheckout onCheckout={handleCheckout} />
    </>
  );
}

export default CartContainer;
