import { Slider } from "../services/Slider.js";
import { SLIDES } from "../data/SLIDES.js";
import { slideTemplate } from "../templates/slideTemplate.js";

document.addEventListener("DOMContentLoaded", () => {
  const testSlider = new Slider({
    slidesData: SLIDES,
    slideTemplate: slideTemplate,
    mode: "default",
    sliderContainer: "slider__test",
    isLoop: true,
    hasAutoSlide: false,
    shouldInterruptAutoSlide: true,
    autoSlideInterval: 5000,
    hasBullets: false,
  });
});
