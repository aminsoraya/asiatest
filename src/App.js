import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import Login from "./pages/Login/index.tsx";
import Vehicle from "./pages/Vehicle/index.tsx";
import AuthenticateHandler from "./bussiness/AuthenticateHandler.tsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />

        <Route element={<AuthenticateHandler/>}>
          <Route path="/vehicle" element={<Vehicle />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
