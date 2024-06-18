import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import { Menu } from "./pages/Menu/Menu";
import { Cart } from "./pages/Cart/Cart";
import { Error } from "./pages/Error/Error";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Menu />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '*',
    element: <Error />
  }
]);

function App() {

  return (
    <>
      <Button appearance="big">
        Вход
      </Button>
      <Button>
        Применить
      </Button>
      <Input placeholder="Email" />
      <Input placeholder="Password" />
      <div>
        <a href='/'>Меню</a>
        <a href='/cart'>Корзина</a>
      </div>
      <RouterProvider router={router} />
    </>
  );
}

export default App
