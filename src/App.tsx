import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import { BookStoreThemeContextProvider } from "./context/themeContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./components/common/Error";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import OrderList from "./pages/OrderList";

const routerList = [
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/books",
    element: <Books />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/reset",
    element: <ResetPassword />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/book/:bookId",
    element: <BookDetail />,
  },
  {
    path: `/cart`,
    element: <Cart />,
  },

  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/orderlist",
    element: <OrderList />,
  },
];

const newRouteList = routerList.map((item) => {
  return {
    ...item,
    element: <Layout>{item.element}</Layout>,
    errorElement: <Error />,
  };
});

const router = createBrowserRouter(newRouteList);

function App() {
  return (
    <BookStoreThemeContextProvider>
      <RouterProvider router={router} />
    </BookStoreThemeContextProvider>
  );
}

export default App;
