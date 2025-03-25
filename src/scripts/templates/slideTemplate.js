export const slideTemplate = (slide, index) => {
  return `
    <li class="slider__slide" data-slide-index=${index}>
      <h2 class="slider__title">${slide.title}</h2>
      <p class="slider__text">${slide.text}</p>
    </li>
  `;
};
