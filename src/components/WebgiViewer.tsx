import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {
    addBasePlugins,
    AssetManagerPlugin,
    BloomPlugin,
    CanvasSnipperPlugin,
    GammaCorrectionPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    SSAOPlugin,
    SSRPlugin,
    TonemapPlugin,
    ViewerApp
} from "webgi";

import gsap from 'gsap'
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ICoordinates, scrollAnimation} from "../scroll-config";

//add animation by scrolling
gsap.registerPlugin(ScrollTrigger)

const WebglViewer = forwardRef((props, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [viewerRef, setViewerRef] = useState(null)
    const [targetRef, setTargetRef] = useState(null)
    const [cameraRef, setCameraRef] = useState(null)
    const [positionRef, setPositionRef] = useState(null)
    const canvasContainerRef = useRef(null)

    useImperativeHandle(ref, () => ({
        triggerPreview() {
            canvasContainerRef.current.style.pointer = 'all'
            props.contentRef.current.style.opacity = '0'

            gsap.to(positionRef, {
                x: 13.04,
                y: -2.01,
                z: 2.29,
                duration: 2,
                onUpdate: () => {
                    viewerRef.setDirty();
                    cameraRef.positionTargetUpdated(true)
                }
            })

            gsap.to(targetRef, {
                x: 0.11,
                y: 0.0,
                z: 0.0,
                duration: 2
            })

            viewerRef.scene.activeCamera.setCameraOptions({
                controlsEnabled: true
            })

        }
    }))

    const _scrollAnimation = useCallback(
        (position: ICoordinates, target: ICoordinates, onUpdate: () => void) => {
            if (position && target && onUpdate) {
                scrollAnimation(position, target, onUpdate)
            }
        }, [])

    const setupViewer = useCallback(async () => {
        if (canvasRef.current) {
            // Initialize the viewer
            const viewer = new ViewerApp({
                canvas: canvasRef.current,
            })

            setViewerRef(viewer)

            // Add some plugins
            const manager = await viewer.addPlugin(AssetManagerPlugin)

            //get position and target of 3d model
            const camera = viewer.scene.activeCamera;
            const {position, target} = camera;

            setCameraRef(camera)
            setPositionRef(position)
            setTargetRef(target)

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

            window.scrollTo(0, 0)
            let needsUpdate = true
            const onUpdate = () => {
                needsUpdate = true
                viewer.setDirty()
            }
            //update position and target listener
            viewer.addEventListener('preFrame', () => {
                if (needsUpdate) {
                    camera.positionTargetUpdated(true)
                    needsUpdate = false
                }

            })

            _scrollAnimation(position, target, onUpdate)

            // Load an environment map if not set in the glb file
            // await viewer.scene.setEnvironment(
            //     await manager.importer!.importSinglePath<ITexture>(
            //         "./assets/environment.hdr"
            //     )
            // );
        }

    }, [])

    useEffect(() => {
        setupViewer().catch((error) => console.log(error));
    }, [])
    return (
        <div id="webgi-canvas-container">
            <canvas id="webgi-canvas" ref={canvasRef}></canvas>
        </div>
    );
});

export default WebglViewer;