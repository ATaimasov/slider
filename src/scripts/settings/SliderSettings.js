import { Slider } from "../services/Slider.js";

const testSlider = new Slider({
  sliderContainer: "slider__test",
  isLoop: true,
  hasAutoSlide: true,
  shouldInterruptAutoSlide: false,
  autoSlideInterval: 5000,
  hasBullets: false,
});
