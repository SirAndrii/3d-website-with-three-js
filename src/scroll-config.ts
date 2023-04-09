import gsap from 'gsap';
//import {ScrollTrigger} from 'gsap/ScrollTrigger';

//gsap.registerPlugin(ScrollTrigger);
export const scrollAnimation = (
    position: ICoordinates,
    target: ICoordinates,
    isMobile: Boolean,
    onUpdate: ()=> void): void => {
    const tl = gsap.timeline();

    tl.to(position, {
        x: !isMobile ? -13.38 : -7.0,
        y: !isMobile ? -10.74 : -12.2,
        z: !isMobile ? -5.93 : -6.0,
        scrollTrigger: new ScrollTriggerConfig('.sound-section'),
        onUpdate: onUpdate,
    }).to(target, {
        x: !isMobile ? 1.52 : 0.7,
        y: !isMobile ? 0.77 : 1.9,
        z: !isMobile ? -1.08 : 0.7,
        scrollTrigger: new ScrollTriggerConfig('.sound-section')
    }).to('.jumbotron-section', {
        opacity: 0,
        scrollTrigger: new ScrollTriggerConfig('.sound-section')
    }).to('.sound-section-content', {
        opacity: 1,
        scrollTrigger: new ScrollTriggerConfig('.sound-section')
    }).to(position, {
        x: !isMobile ? 1.56 : 9.36,
        y: !isMobile ? 5.0 : 10.95,
        z: !isMobile ? 0.01 : 0.09,
        scrollTrigger: new ScrollTriggerConfig('.display-section'),
        onUpdate: onUpdate,
    }).to(target, {
        x: !isMobile ? -0.55 :  -1.62,
        y: !isMobile ? 0.32 : 0.02,
        z: !isMobile ? 0.0 : -0.06,
        scrollTrigger: new ScrollTriggerConfig('.display-section')
    }).to('.display-section', {
        opacity: 1,
        scrollTrigger: new ScrollTriggerConfig('.display-section')
    })
};

export interface ICoordinates {
    x: number,
    y: number,
    z:number
}

export class ScrollTriggerConfig {
    trigger: string;
    start: string;
    end: string;
    scrub: number;
    immediateRender: boolean;

    constructor(trigger: string) {
        this.trigger = trigger;
        this.start = "top bottom";
        this.end = "top top";
        this.scrub = 2;
        this.immediateRender = false;
    }
}