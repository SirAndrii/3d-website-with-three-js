import Nav from "./components/Nav.js";
import Jumbotron from "./components/Jumbotron";
import SoundSection from "./components/SoundSection";
import DisplaySection from "./components/DisplaySection";
import WebgiViewer from "./components/WebgiViewer";
import {useRef} from "react";

function App(): JSX.Element {
    const webgiViewerRef = useRef<any>();
    const contentRef = useRef()

    const handlePreview = () => {
        if (webgiViewerRef.current)
            webgiViewerRef.current.triggerpreview()
    }

    return (
        <div className="App">
            <div ref={contentRef} id={'content'}>
                <Nav/>
                <Jumbotron/>
                <SoundSection/>
                <DisplaySection triggerPreview={handlePreview}/>
            </div>
            <WebgiViewer contentRef={contentRef}ref={webgiViewerRef}/>
        </div>
    );
}

export default App;
