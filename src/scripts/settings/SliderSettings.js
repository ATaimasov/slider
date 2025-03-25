import { Slider } from "../services/Slider.js";

document.addEventListener("DOMContentLoaded", () => {
  const testSlider = new Slider({
    mode: "default",
    sliderContainer: "slider__test",
    isLoop: true,
    hasAutoSlide: false,
    shouldInterruptAutoSlide: true,
    autoSlideInterval: 5000,
    hasBullets: false,
  });
});
