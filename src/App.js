import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/index.tsx";
import Vehicle from "./pages/Vehicle/index.tsx";
import AuthenticateHandler from "./bussiness/AuthenticateHandler.tsx";
import NotFound from "./pages/NotFound/index.tsx";

function App() {
  return (
    <Routes>
      {["/", "/login"].map((item) => {
        return <Route path={item} element={<Login />} />;
      })}

      <Route element={<AuthenticateHandler />}>
        <Route path="/vehicle" element={<Vehicle />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
