import Calculator from "./components/Calculator";
import NavBar from "./components/NavBar";
import Header from "./components/Title";
import ExchangeProvider from "./context/ExchangeProvider";


function App() {
  return (
    <ExchangeProvider>
      <NavBar />
      <Header />
      <Calculator />
    </ExchangeProvider>
  );
}

export default App;
