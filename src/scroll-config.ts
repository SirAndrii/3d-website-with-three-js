import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class ScrollTriggerConfig {
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

export const scrollAnimation = (
    position: ICoordinates,
    target: ICoordinates,
    onUpdate: ()=> void): void => {
    const tl = gsap.timeline();


    tl.to(position, {
        x: 13.38,
        y: -10.74,
        z: -5.93,
        scrollTrigger: new ScrollTriggerConfig('target'),
        onUpdate: onUpdate,
    }).to(target, {
        x: 1.52,
        y: 0.77,
        z: -1.08,
        scrollTrigger: new ScrollTriggerConfig('.jumbotron-section')
    }).to('.sound-section', {
        opacity: 0,
        scrollTrigger: new ScrollTriggerConfig('.sound-section-content')
    }).to('.sound-section-content', {
        opacity: 1,
        scrollTrigger: new ScrollTriggerConfig('.sound-section-content')
    })

    tl.to(position, {
        x: 1.56,
        y: 5.0,
        z: 0.01,
        scrollTrigger: new ScrollTriggerConfig('.display-section'),
        onUpdate: onUpdate,
    }).to(target, {
        x: -0.55,
        y: 0.32,
        z: 0.0,
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