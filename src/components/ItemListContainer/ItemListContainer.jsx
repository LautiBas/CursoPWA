import { useState, useEffect } from "react";
import Item from "./Item";
import Flex from "../Flex/Flex";
import { getProdByCategory } from "../../services/firebase";
import { obtenerProductos } from "../../services/firebase";
import { useParams } from "react-router-dom";
import "./alert.css";
import Loader from "../Loader/Loader";

function ItemListContainer() {
  const [prods, setProds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alertText, setAlertText] = useState();

  let { categoryid } = useParams();

  useEffect(() => {
    if (!categoryid) {
      obtenerProductos()
        .then((respuesta) => {
          setProds(respuesta);
          setAlertText({
            text: "Items Cargados Correctamente",
            type: "danger",
          });
        })
        .catch((error) => {
          setAlertText({ text: error, type: "danger" });
        })
        .finally(() => setIsLoading(false));
    } else {
      getProdByCategory(categoryid)
        .then((respuesta) => {
          setProds(respuesta);
          setIsLoading(false);
        })
        .finally(() => setIsLoading(false));
    }
  }, [categoryid]);

  if (isLoading) {
    return <Loader size={120} color="black" />;
  } else {
    return (
      <>
        <Flex>
          {alertText && (
            <div className="alert_container">
            </div>
          )}
          <Flex>
            {prods.map((itemIterado) => {
              return <Item key={itemIterado.id} item={itemIterado} />;
            })}
          </Flex>
        </Flex>
      </>
    );
  }
}

export default ItemListContainer;
