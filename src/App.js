import "./App.css";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import NavBar from "./components/NavBar/NavBar";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import { CartProvider } from "./storage/cartContext";
import CartContainer from "./components/CartContainer/CartContainer";
import { exportArray } from "./services/firebase";
import Register from "./pages/Register";

function App() {
  function logOutSession() {
    console.log("logout");
  }

  function logInSession(username) {
    alert(`Bienvenido el usuario: ${username}`);
  }

  return (
    <>
      {/* <button onClick={exportArray}>Exportar</button> */}
      <BrowserRouter>
        <CartProvider>
          <NavBar onLogin={logInSession} onLogout={logOutSession} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categoryid" element={<HomePage />} />
            <Route path="/detalle/:itemid" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<CartContainer />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/pages/Register" element={<Register/>} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
