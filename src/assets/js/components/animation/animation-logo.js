import gsap from 'gsap';
import { DrawSVGPlugin } from './DrawSVGPlugin';
gsap.registerPlugin(DrawSVGPlugin) 

gsap.config({trialWarn: false});
function animationLogo() {
  gsap.from(".loader svg path", {delay: 0.5, duration:1, drawSVG: 0});
}
animationLogo();