import Button from "./components/Button/Button";
import Input from "./components/Input/Input";

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
      {/* <div>
        <Link to='/'>Меню</Link>
        <Link to='/cart'>Корзина</Link>
      </div> */}
    </>
  );
}

export default App
