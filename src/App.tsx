import { useThemeContext } from "./context/themeContext";

function App() {
  const { lightmode, setLightMode } = useThemeContext();

  return (
    <div className="App">
      {lightmode ? "light" : "dark"}
      <button onClick={() => setLightMode(!lightmode)}>change</button>
    </div>
  );
}

export default App;
