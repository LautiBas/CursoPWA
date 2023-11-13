import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  addDoc,
  writeBatch,
  documentId,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAI7M3mW3UITO8LnaDVmTlF1ka3t5cnOJ4",
  authDomain: "proyecto-bas-reactjs.firebaseapp.com",
  projectId: "proyecto-bas-reactjs",
  storageBucket: "proyecto-bas-reactjs.appspot.com",
  messagingSenderId: "319633266106",
  appId: "1:319633266106:web:378540f8886c11eb977983",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function obtenerProductos() {
  const productsRef = collection(db, "products");
  const q = query(productsRef, orderBy("index"));
  const snapshot = await getDocs(q);

  const prods = snapshot.docs.map((elem) => {
    let prod = elem.data();
    prod.id = elem.id;
    return prod;
  });
  return prods;
}

export async function getProd(idUrl) {
  const productsRef = collection(db, "products");
  const docRef = doc(productsRef, idUrl);
  const snapshot = await getDoc(docRef);
  return { ...snapshot.data(), id: snapshot.id };
}

export async function getProdByCategory(categoryUrl) {
  const productsRef = collection(db, "products");

  const q = query(productsRef, where("category", "==", categoryUrl));

  const snapshot = await getDocs(q);

  const prods = snapshot.docs.map((elem) => {
    let prod = elem.data();
    prod.id = elem.id;
    return prod;
  });

  return prods;
}

export async function createOrder(order) {
  const orderRef = collection(db, "order");

  /*  addDoc(orderRef, order).then((respuesta) => {
      console.log(respuesta);
      console.log(respuesta.id);
    }); */

  // 1- obtener de Firebase todos los productos del carrito
  // 2- Controlar que ningun producto excede el stock
  // 3- Update/actualizar todos los productos en Firebase
  // 4- Creamos la orden

  let respuesta = await addDoc(orderRef, order);
  console.log(respuesta, respuesta.id);

  return respuesta.id;
}

export async function createOrder_WithStockControl(order) {
  const orderRef = collection(db, "order");
  const productsRef = collection(db, "products");
  const batch = writeBatch(db);
  const arrayIds = order.items.map((item) => item.id);
  const q = query(productsRef, where(documentId(), "in", arrayIds));
  const querySnaphot = await getDocs(q);
  const docsToUpdate = querySnaphot.docs;
  let itemsSinStock = [];

  docsToUpdate.forEach((doc) => {
    let stock = doc.data().stock;
    let itemInCart = order.items.find((item) => item.id === doc.id);
    let countInCart = itemInCart.count;
    let newStock = stock - countInCart;

    if (newStock < 0) {
      itemsSinStock.push(doc.id);
    } else {
      batch.update(doc.ref, { stock: newStock });
    }
  });

  if (itemsSinStock.length >= 1)
    throw new Error(
      `Stock no disponible para el producto para los productos ${itemsSinStock}`
    );
  await batch.commit();
  let newOrder = await addDoc(orderRef, order);
  return newOrder.id;
}

export async function exportArray() {
  const products = [
    {
      id: 1,
      title: "Air Force 1",
      category: "Calzado",
      stock: 7,
      imgurl:
        "https://static.nike.com/a/images/t_default/expzgdg8hmhmow5q6eme/calzado-air-force-1-shadow-kTgn9J.png",
      detail: "AF",
      price: 60000,
      desc: "Descripcion del producto 1",
    },
    {
      id: 2,
      title: "Remera Angels",
      category: "Indumentaria",
      stock: 7,
      imgurl:
        "https://acdn.mitiendanube.com/stores/001/015/914/products/black-495140355e79e0e8b316629021837674-1024-1024.png",
      detail: "PALM",
      price: 5000,
      desc: "Descripcion del producto 2",
    },
    {
      id: 3,
      title: "Jean Basic",
      category: "Indumentaria",
      stock: 5,
      imgurl:
        "https://www.pngplay.com/wp-content/uploads/7/Cotton-Pant-Transparent-PNG.png",
      detail: "BASIC",
      price: 12000,
      desc: "Descripcion del producto 3",
    },
    {
      id: 4,
      title: "Cap NY White",
      category: "Accesorios",
      stock: 6,
      imgurl:
        "https://www.courir.es/dw/image/v2/BCCL_PRD/on/demandware.static/-/Sites-master-catalog-courir/default/dw0c561bdf/images/hi-res/001501544_101.png?sw=300&sh=300&sm=fit&frz-v=31",
      detail: "CAP",
      price: 4500,
      desc: "Descripcion del producto 4",
    },
    {
      id: 5,
      title: "Gafas Oakey Radar",
      category: "Accesorios",
      stock: 3,
      imgurl:
        "https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Sites-canyon-master/default/dw9cb86900/images/full/10004335_O/2020/10004335_Oakley_Radar_EV_Path_Prizm_Road_bk_full.png",
      detail: "RADAR",
      price: 4000,
      desc: "Descripcion del producto 5",
    },
    {
      id: 6,
      title: "Air Jordan 1",
      category: "Calzado",
      stock: 10,
      imgurl:
        "https://static.nike.com/a/images/t_default/a098a48a-25e6-4b93-84bf-06e684a549f3/air-jordan-1-mid-shoes-3DR8L9.png",
      detail: "JDN1",
      price: 150000,
      desc: "Descripcion del producto 6",
    },
    {
      id: 7,
      title: "Pack Medias Nike",
      category: "Accesorios",
      stock: 2,
      imgurl:
        "https://static.nike.com/a/images/t_default/wqdt6wcrmqe3lffuotyx/calcetines-largos-de-entrenamiento-3-pares-performance-lightweight.png",
      detail: "SOCKS",
      price: 3500,
      desc: "Descripcion del producto 7",
    },
    {
      id: 8,
      title: "Gafas Regular",
      category: "Accesorios",
      stock: 10,
      imgurl:
        "https://cdn.shopify.com/s/files/1/1075/3858/products/Regular_smoky_grey_red_frontal_1500x750.png?v=1569404314",
      detail: "REG",
      price: 3400,
      desc: "Descripcion del producto 8",
    },
    {
      id: 9,
      title: "Remera W.I.S",
      category: "Indumentaria",
      stock: 7,
      imgurl:
        "https://d22fxaf9t8d39k.cloudfront.net/7341fc24f87766b3c486c4e8815dcc4420d2c4bcd8903979da377143c9e5eb2632772.png",
      detail: "WIS",
      price: 5000,
      desc: "Descripcion del producto 9",
    },
    {
      id: 10,
      title: "Reloj Navigil",
      category: "Accesorios",
      stock: 10,
      imgurl: "https://www.navigil.com/wp-content/uploads/2019/05/5.png",
      detail: "RELOJ",
      price: 8500,
      desc: "Descripcion del producto 10",
    },
  ];
  for (let item of products) {
    item.index = item.id;
    delete item.id;
    addDoc(collection(db, "products"), item).then((respuesta) =>
      console.log("item creado: ", respuesta.id)
    );
  }
}

export async function exportArrayWithBatch() {
  const products = [
    {
      id: 1,
      title: "Air Force 1",
      category: "Calzado",
      stock: 7,
      imgurl:
        "https://static.nike.com/a/images/t_default/expzgdg8hmhmow5q6eme/calzado-air-force-1-shadow-kTgn9J.png",
      detail: "AF",
      price: 60000,
    },
    {
      id: 2,
      title: "Remera VIKATI",
      category: "Indumentaria",
      stock: 7,
      imgurl:
        "https://vikati.net/wp-content/uploads/2022/10/OVERSIZE-BRO-vikati-N.png",
      detail: "VIKATI",
      price: 5000,
      desc: "Descripcion del producto 2",
    },
    {
      id: 3,
      title: "Jean Basic",
      category: "Indumentaria",
      stock: 5,
      imgurl:
        "https://www.pngplay.com/wp-content/uploads/7/Cotton-Pant-Transparent-PNG.png",
      detail: "BASIC",
      price: 12000,
      desc: "Descripcion del producto 3",
    },
    {
      id: 4,
      title: "Cap NY White",
      category: "Accesorios",
      stock: 6,
      imgurl:
        "https://www.courir.es/dw/image/v2/BCCL_PRD/on/demandware.static/-/Sites-master-catalog-courir/default/dw0c561bdf/images/hi-res/001501544_101.png?sw=300&sh=300&sm=fit&frz-v=31",
      detail: "CAP",
      price: 4500,
      desc: "Descripcion del producto 4",
    },
    {
      id: 5,
      title: "Gafas Oakey Radar",
      category: "Accesorios",
      stock: 3,
      imgurl:
        "https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Sites-canyon-master/default/dw9cb86900/images/full/10004335_O/2020/10004335_Oakley_Radar_EV_Path_Prizm_Road_bk_full.png",
      detail: "RADAR",
      price: 4000,
      desc: "Descripcion del producto 5",
    },
    {
      id: 6,
      title: "Air Jordan 1",
      category: "Calzado",
      stock: 10,
      imgurl:
        "https://static.nike.com/a/images/t_default/a098a48a-25e6-4b93-84bf-06e684a549f3/air-jordan-1-mid-shoes-3DR8L9.png",
      detail: "JDN1",
      price: 150000,
      desc: "Descripcion del producto 6",
    },
    {
      id: 7,
      title: "Pack Medias Nike",
      category: "Accesorios",
      stock: 2,
      imgurl:
        "https://static.nike.com/a/images/t_default/wqdt6wcrmqe3lffuotyx/calcetines-largos-de-entrenamiento-3-pares-performance-lightweight.png",
      detail: "SOCKS",
      price: 3500,
      desc: "Descripcion del producto 7",
    },
    {
      id: 8,
      title: "Gafas Regular",
      category: "Accesorios",
      stock: 10,
      imgurl:
        "https://cdn.shopify.com/s/files/1/1075/3858/products/Regular_smoky_grey_red_frontal_1500x750.png?v=1569404314",
      detail: "REG",
      price: 3400,
      desc: "Descripcion del producto 8",
    },
    {
      id: 9,
      title: "Remera W.I.S",
      category: "Indumentaria",
      stock: 7,
      imgurl:
        "https://d22fxaf9t8d39k.cloudfront.net/7341fc24f87766b3c486c4e8815dcc4420d2c4bcd8903979da377143c9e5eb2632772.png",
      detail: "WIS",
      price: 5000,
      desc: "Descripcion del producto 9",
    },
    {
      id: 10,
      title: "Reloj Navigil",
      category: "Accesorios",
      stock: 10,
      imgurl: "https://www.navigil.com/wp-content/uploads/2019/05/5.png",
      detail: "RELOJ",
      price: 8500,
      desc: "Descripcion del producto 10",
    },
  ];
  const batch = writeBatch(db);

  for (let item of products) {
    item.index = item.id;
    delete item.id;

    const collectionRef = collection(db, "products");
    const newDoc = doc(collectionRef);

    batch.set(newDoc, item);
  }

  batch.commit().then(() => console.log("batch listo"));
}

export default db;
