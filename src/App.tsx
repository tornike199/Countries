import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Header from "./components/Header";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <>
      <AppProvider>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/country/:id" element={<Detail></Detail>} />
        </Routes>
      </AppProvider>
    </>
  );
}

export default App;
