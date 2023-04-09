import Nav from "./components/Nav.js";
import Jumbotron from "./components/Jumbotron";
import SoundSection from "./components/SoundSection";
import DisplaySection from "./components/DisplaySection";
import WebgiViewer from "./components/WebgiViewer";
import {useRef, useState} from "react";
import Loader from "./components/Loader";

function App(): JSX.Element {
    const webgiViewerRef = useRef<any>();
    const contentRef = useRef<HTMLDivElement | null>(null)
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    const handlePreview = () => {
        if (webgiViewerRef.current)
            webgiViewerRef.current.triggerPreview()
    }

    return (
        <div className="App">
            {isLoading && <Loader  />}

            <div ref={contentRef} id={'content'}>
                <Nav/>
                <Jumbotron/>
                <SoundSection/>
                <DisplaySection triggerPreview={handlePreview}/>
            </div>

            <WebgiViewer contentRef={contentRef} ref={webgiViewerRef} setIsLoading={setIsLoading}/>
        </div>
    );
}

export default App;
