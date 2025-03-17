import { Slider } from "../services/Slider.js";

const testSlider = new Slider({
  sliderContainer: "slider__test",
  infinity: false,
  arrows: true,
  bullets: false,
  autoSlide: true,
  autoSlideInterval: 5000,
});

console.log(testSlider);
