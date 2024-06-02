import Home from "./Component/Home/Home";
import FormData from "./Component/FormData/FormData";
import Cart from "./Component/Cart/Cart";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContentProvider } from "./Context/Context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  // router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/formdata",
      element: <FormData />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
  ]);

  return (
    <>
      <ContentProvider>
        <RouterProvider router={router} />
      </ContentProvider>
    </>
  );
}

export default App;
