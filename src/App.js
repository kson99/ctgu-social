import { useEffect, useState } from "react";
import "./App.css";
import Authenticate from "./pages/authentication/Authenticate";
import Wrapper from "./pages/contentPages/Wrapper";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"));
  }, []);

  return <>{loggedIn ? <Wrapper /> : <Authenticate />}</>;
}

export default App;
