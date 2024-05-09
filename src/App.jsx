import { Provider } from "react-redux";
import store from "./redux/store";
import TopPage from "./pages/TopPage";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <TopPage />
    </Provider>
  );
}

export default App;
