import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css"
import { useState } from "react";
import NavBar from "./components/NavBar";
import LoginComponent from "./components/LoginComponent";
import { AuthService } from "./services/AuthService";

const authService = new AuthService();

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
          element: <LoginComponent authService={authService} setUserNameCb={setUserName} />,
        },
        {
          path: "/",
          element: <div>Hello</div>,
        },
        {
          path: "/createSpace",
          element: <div>CS</div>,
        },
        {
          path: "/spaces",
          element: <div>Spaces</div>,
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
