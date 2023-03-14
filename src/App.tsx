import Nav from "./components/Nav.js";
import Jumbotron from "./components/Jumbotron";
import SoundSection from "./components/SoundSection";
import DisplaySection from "./components/DisplaySection";
import WebgiViewer from "./components/WebgiViewer";

function App(): JSX.Element {

    return (
        <div className="App">
            <Nav/>
            <Jumbotron/>
            <SoundSection/>
            <DisplaySection/>
            <WebgiViewer/>
        </div>
    );
}

export default App;
