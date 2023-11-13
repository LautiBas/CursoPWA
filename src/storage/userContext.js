import { createContext } from "react";

export const userContext = createContext({ user: "anonymous" });

function UserProvider(props) {
  const user = "Lautaro";
  const logedin = true;
  function test() {
    console.log("test");
  }

  return (
    <userContext.Provider value={{ user, logedin, test }}>
      {props.children}
    </userContext.Provider>
  );
}

export { UserProvider };
