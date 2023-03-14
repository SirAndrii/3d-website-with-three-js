import React, {useRef, useState, useCallback, useEffect} from 'react';
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    GammaCorrectionPlugin,
    addBasePlugins,
    BloomPlugin,
    mobileAndTabletCheck,
    CanvasSnipperPlugin
} from "webgi";

import gsap from 'gsap'
import {ScrollTrigger} from "gsap/ScrollTrigger";

//add animation by scrolling
gsap.registerPlugin(ScrollTrigger)

const WebglViewer = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const setupViewer = useCallback(async () => {
        if (canvasRef.current) {
            // Initialize the viewer
            const viewer = new ViewerApp({
                canvas: canvasRef.current,
            })

            // Add some plugins
            const manager = await viewer.addPlugin(AssetManagerPlugin)

            //get position and target of 3d model
            const camera = viewer.scene.activeCamera;
            const {position, target} = camera;



            // Add plugins individually.
            await viewer.addPlugin(GBufferPlugin)
            await viewer.addPlugin(new ProgressivePlugin(32))
            await viewer.addPlugin(new TonemapPlugin(true))
            await viewer.addPlugin(GammaCorrectionPlugin)
            await viewer.addPlugin(SSRPlugin)
            await viewer.addPlugin(SSAOPlugin)
            await viewer.addPlugin(BloomPlugin)
            // or use this to add all main ones at once.
            await addBasePlugins(viewer)

            // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
            await viewer.addPlugin(CanvasSnipperPlugin)

            // This must be called once after all plugins are added.
            viewer.renderer.refreshPipeline()

            await manager.addFromPath("scene-black.glb")

            viewer!.getPlugin(TonemapPlugin)!.config!.clipBackground = true

            //disable control 3d model by user
            viewer.scene.activeCamera.setCameraOptions({controlsEnabled: false})

            window.scrollTo(0,0)
            let needsUpdate = true
            //update position and target listener
            viewer.addEventListener('preFrame', ()=> {
                if(needsUpdate){
                    camera.positionTargetUpdated(true)
                    needsUpdate= false
                }

            })

            // Load an environment map if not set in the glb file
            // await viewer.scene.setEnvironment(
            //     await manager.importer!.importSinglePath<ITexture>(
            //         "./assets/environment.hdr"
            //     )
            // );
        }

    }, [])

useEffect(()=>{
    setupViewer().catch((error)=> console.log(error));
},[])
    return (
        <div id="webgi-canvas-container">
            <canvas id="webgi-canvas" ref={canvasRef}></canvas>
        </div>
    );
};

export default WebglViewer;