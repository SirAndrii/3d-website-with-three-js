import React, {forwardRef, RefObject, useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {
    addBasePlugins,
    AssetManagerPlugin,
    BloomPlugin,
    CameraController,
    CanvasSnipperPlugin,
    GammaCorrectionPlugin,
    GBufferPlugin,
    mobileAndTabletCheck,
    ProgressivePlugin,
    SSAOPlugin,
    SSRPlugin,
    TonemapPlugin,
    ViewerApp
} from "webgi";

import gsap from 'gsap'
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ICoordinates, scrollAnimation, ScrollTriggerConfig} from "../scroll-config";

//add animation by scrolling
gsap.registerPlugin(ScrollTrigger)

const WebglViewer = forwardRef((props: WebgiViewerProps, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [viewerRef, setViewerRef] = useState<ViewerApp | null>(null)
    const [targetRef, setTargetRef] = useState<ICoordinates | null>(null)
    const [cameraRef, setCameraRef] = useState<CameraController | null>(null)
    const [positionRef, setPositionRef] = useState<ICoordinates | null>(null)
    const canvasContainerRef = useRef<HTMLDivElement | null>(null)
    const [previewMode, setPreviewMode] = useState(false)
    const [isMobile, setIsMobile] = useState<null | Boolean>(null)

    useImperativeHandle(ref, () => ({
        triggerPreview: () => {
            setPreviewMode(true)
            canvasContainerRef.current!.style.pointerEvents = 'all'
            props.contentRef.current!.style.opacity = '0'

            gsap.to(positionRef, {
                x: 13.04,
                y: -2.01,
                z: 2.29,
                duration: 2,
                onUpdate: () => {
                    viewerRef!.setDirty();
                    cameraRef!.positionTargetUpdated(true)
                }
            })

            gsap.to(targetRef, {
                x: 0.11,
                y: 0.0,
                z: 0.0,
                duration: 2
            })

            viewerRef!.scene.activeCamera.setCameraOptions({
                controlsEnabled: true
            })

        },
    }))

    const _scrollAnimation = useCallback(
        (position: ICoordinates, target: ICoordinates, isMobile: boolean, onUpdate: () => void) => {
            if (position && target && onUpdate) {
                scrollAnimation(position, target, isMobile, onUpdate)
            }
        }, [])

    const setupViewer = useCallback(async () => {
        if (canvasRef.current) {
            // Initialize the viewer
            const viewer = new ViewerApp({
                canvas: canvasRef.current,
            })

            setViewerRef(viewer)
            const isMobileOrTablet = mobileAndTabletCheck()
            setIsMobile(isMobileOrTablet)

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
            props.setIsLoading(false)

            viewer!.getPlugin(TonemapPlugin)!.config!.clipBackground = true

            //disable control 3d model by user
            viewer.scene.activeCamera.setCameraOptions({controlsEnabled: false})

            if (isMobileOrTablet) {
                position.set(-16.7, 1.17, 11.7);
                target.set(0, 1.37, 0)
                props.contentRef.current!.className = 'mobile-or-tablet'
            }

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

            _scrollAnimation(position, target, isMobileOrTablet, onUpdate)

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

    const handleExit = useCallback(() => {
        canvasContainerRef.current!.style.pointerEvents = 'none'
        props.contentRef.current!.style.opacity = '1'
        viewerRef!.scene.activeCamera.setCameraOptions({
            controlsEnabled: false
        })
        setPreviewMode(false)

        gsap.to(positionRef, {
            x: !isMobile ? 1.56 : 9.36,
            y: !isMobile ? 5.0 : 10.95,
            z: !isMobile ? 0.01 : 0.09,
            scrollTrigger: new ScrollTriggerConfig('.display-section'),
            onUpdate: () => {
                viewerRef!.setDirty()
                cameraRef!.positionTargetUpdated(true)
            },
        });

        gsap.to(targetRef, {
            x: !isMobile ? -0.55 : -1.62,
            y: !isMobile ? 0.32 : 0.02,
            z: !isMobile ? 0.0 : -0.06,
            scrollTrigger: new ScrollTriggerConfig('.display-section')
        })
    }, [canvasContainerRef, viewerRef, positionRef, cameraRef, targetRef])

    return (
        <div id="webgi-canvas-container" ref={canvasContainerRef}>
            <canvas id="webgi-canvas" ref={canvasRef}></canvas>
            {previewMode && (
                <button className={'button'} onClick={handleExit}>Exit</button>
            )}
        </div>
    );
});

export default WebglViewer;


interface WebgiViewerProps {
    contentRef: RefObject<HTMLDivElement>;
    setIsLoading: (isLoading:Boolean) => void
}