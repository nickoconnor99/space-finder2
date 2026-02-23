import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import NavBar from "./components/NavBar";
import LoginComponent from "./components/LoginComponent";
import { AuthService } from "./services/AuthService";
import { DataService } from "./services/DataService";
import CreateSpace from "./components/spaces/CreateSpace";
import Spaces from "./components/spaces/Spaces";

const authService = new AuthService();
const dataService = new DataService(authService);

function App() {
  const [userName, setUserName] = useState<string | undefined>(undefined);

  const router = createBrowserRouter([
    {
      element: (
        <>
          <NavBar userName={userName} />
          <Outlet />
        </>
      ),
      children: [
        {
          path: "/login",
          element: (
            <LoginComponent
              authService={authService}
              setUserNameCb={setUserName}
            />
          ),
        },
        {
          path: "/",
          element: <div>Hello</div>,
        },
        {
          path: "/createSpace",
          element: <CreateSpace dataService={dataService}></CreateSpace>,
        },
        {
          path: "/spaces",
          element: <Spaces dataService={dataService}></Spaces>,
        },
        {
          path: "/profile",
          element: <div>Profile</div>,
        },
      ],
    },
  ]);

  return (
    <div className="wrapper">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
