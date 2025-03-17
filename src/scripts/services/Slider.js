const SLIDES = [
  {
    id: 1,
    title: "Slide 1",
    text: "Slide 1 text. Slide 1 text. Slide 1 text. Slide 1 text. Slide 1 text. Slide 1 text. Slide 1 text. Slide 1 text. Slide 1 text. Slide 1 text. Slide 1 text. Slide 1 text. Slide 1 text. Slide 1 text. Slide 1 text. Slide 1 text. Slide 1 text. Slide 1 text. Slide 1 text. Slide 1 text.",
  },
  {
    id: 2,
    title: "Slide 2",
    text: "Slide 2 text",
  },
  {
    id: 3,
    title: "Slide 3",
    text: "Slide 3 text",
  },
];

export class Slider {
  constructor(options) {
    options = options || {};

    this.sliderContainer = document.querySelector(
      "." + options.sliderContainer,
    );

    if (!this.sliderContainer) {
      throw new Error(
        "Для работы слайдера необходимо указать свойство sliderContainer (в качестве значения указывается контйнер для слайдера)",
      );
    }

    this.additionalClass = options.additionalClass || "";
    this.infinity = options.infinity !== undefined ? options.infinity : false;
    this.arrows = options.arrows !== undefined ? options.arrows : true;
    this.bullets = options.bullets !== undefined ? options.bullets : true;
    this.autoSlide =
      options.autoSlide !== undefined ? options.autoSlide : false;
    this.autoSlideInterval = options.autoSlideInterval || 3000;

    this.templates = {
      slide: (slide) => `
        <li class="slider__slide" data-id=${slide.id}>
          <h2 class="slider__title">${slide.title}</h2>
          <p class="slider__text">${slide.text}</p>
        </li>
      `,
      arrows: (value) => {
        if (value === "left")
          return `<button class="arrow arrow-left"></button>`;
        if (value === "right")
          return `<button class="arrow arrow-right"></button>`;
        return "";
      },
      bullet: (bullet) => `
      <button class="bullet" data-bullets-id:"${bullet.id}"></button>
      `,
      pagination: `<ul class="slider__pagination"></ul>`,
    };

    this.init();
  }

  init() {
    this.addSliderClass();
    this.addAdditionalClass();
    this.generateSlider();
  }

  addSliderClass() {
    this.sliderContainer.classList.add("slider");
  }

  addAdditionalClass() {
    if (this.additionalClass === "") return;
    this.sliderContainer.classList.add(this.additionalClass);
  }

  generateSlider() {
    const slides = document.createElement("ul");
    slides.classList.add("slider__slides");
    this.sliderContainer.appendChild(slides);

    slides.innerHTML = this.generateSlides(SLIDES);

    this.generateControl();
    this.makeInfinitySlider();
    this.makeAutoSlide();
  }

  generateSlides(SLIDES) {
    if (!SLIDES || !Array.isArray(SLIDES) || SLIDES.length === 0) {
      console.warn("SLIDES не существует, не является массивом или пуст.");
      return "";
    }

    return SLIDES.map((slide) => {
      return this.templates.slide(slide);
    }).join("");
  }

  generateControl() {
    if (this.arrows || this.bullets) {
      const controls = document.createElement("div");
      controls.classList.add("slider__controls");
      this.sliderContainer.appendChild(controls);
    }
    this.generateBullets();
    this.generateArrows();
  }

  generateArrows() {
    if (!this.arrows) return;

    const controls = this.sliderContainer.querySelector(".slider__controls");

    const leftButton = document.createElement("button");
    leftButton.classList.add("btn", "slider__arrow", "slider__arrow--left");

    const rightButton = document.createElement("button");
    rightButton.classList.add("btn", "slider__arrow", "slider__arrow--right");

    if (this.bullets) {
      const bullets = controls.querySelector(".slider__bullets");
      controls.insertBefore(leftButton, bullets);
      controls.insertBefore(rightButton, bullets.nextSibling);
    } else {
      controls.appendChild(leftButton);
      controls.appendChild(rightButton);
    }
  }

  generateBullets() {
    if (!this.bullets) return;
  }

  makeAutoSlide() {
    if (!this.autoSlide) return;
  }

  makeInfinitySlider() {
    if (!this.infinity) return;
  }
}
