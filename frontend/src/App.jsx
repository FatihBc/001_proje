import "./App.css";
import ThemeWrapper from "./context/ThemeWrapper.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";

function App() {
  return (
    <ThemeProvider>
      <ThemeWrapper />
    </ThemeProvider>
  );
}

export default App;
