import Nav from "./components/Nav.js";
import Jumbotron from "./components/Jumbotron";

function App(): JSX.Element {

  return (
    <div className="App">
      <Nav />
        <Jumbotron />
    </div>
  );
}

export default App;
