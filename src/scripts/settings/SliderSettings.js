import { Slider } from "../services/Slider.js";

const testSlider = new Slider({
  sliderContainer: "slider__test",
  isLoop: true,
  hasInfinity: false,
  hasAutoSlide: true,
  autoSlideInterval: 5000,
});
