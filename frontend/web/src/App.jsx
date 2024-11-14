import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/layout";
import HomeScreen from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
