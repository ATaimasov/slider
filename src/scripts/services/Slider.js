import { SLIDES } from "../data/SLIDES.js";

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

    // data
    this.currentSlideIndex = 0;
    this.slidesData = SLIDES;

    this.additionalClass = options.additionalClass || "";
    this.autoSlideInterval = options.autoSlideInterval || 3000;
    this.mode = options.mode || "default";

    // booleans
    this.hasArrows = options.hasArrows !== undefined ? options.hasArrows : true;
    this.hasBullets =
      options.hasBullets !== undefined ? options.hasBullets : true;
    this.isLoop = options.isLoop !== undefined ? options.isLoop : false;
    this.hasAutoSlide =
      options.hasAutoSlide !== undefined ? options.hasAutoSlide : false;
    this.shouldInterruptAutoSlide =
      options.shouldInterruptAutoSlide !== undefined
        ? options.shouldInterruptAutoSlide
        : true;

    this.init();
  }

  init() {
    this.addSliderClass();
    this.addAdditionalClass();
    this.setMode();
    this.generateSlider();
    this.updateSliderAttribute();
  }

  addSliderClass() {
    this.sliderContainer.classList.add("slider");
  }

  addAdditionalClass() {
    if (this.additionalClass === "") return;
    this.sliderContainer.classList.add(this.additionalClass);
  }

  setMode() {
    this.sliderContainer.classList.add(`slider--mode-${this.mode}`);
  }

  generateSlider() {
    this.slidesContainer = document.createElement("ul");
    this.slidesContainer.classList.add("slider__slides");
    this.sliderContainer.appendChild(this.slidesContainer);

    this.slidesContainer.innerHTML = this.generateSlides(this.slidesData);
    this.slides = this.sliderContainer.querySelectorAll(".slider__slide");
    this.slides[this.currentSlideIndex].classList.add("slider__slide--active");

    this.generateControl();
    this.makeAutoSlide();
  }

  generateSlides(SLIDES) {
    if (!SLIDES || !Array.isArray(SLIDES) || SLIDES.length === 0) {
      console.warn("SLIDES не существует, не является массивом или пуст.");
      return "";
    }

    return SLIDES.map((slide, index) => {
      return `
        <li class="slider__slide" data-slide-index=${index}>
          <h2 class="slider__title">${slide.title}</h2>
          <p class="slider__text">${slide.text}</p>
        </li>
      `;
    }).join("");
  }

  generateControl() {
    if (this.hasArrows || this.hasBullets) {
      this.controlsContainer = document.createElement("div");
      this.controlsContainer.classList.add("slider__controls");
      this.sliderContainer.appendChild(this.controlsContainer);
    }
    this.generateBullets();
    this.generateArrows();
  }

  generateArrows() {
    if (!this.hasArrows) return;

    this.leftArrow = document.createElement("button");
    this.leftArrow.classList.add("btn", "slider__arrow", "slider__arrow--left");
    if (!this.isLoop) {
      this.leftArrow.classList.add("slider__arrow--disabled");
    }

    this.rightArrow = document.createElement("button");
    this.rightArrow.classList.add(
      "btn",
      "slider__arrow",
      "slider__arrow--right",
    );

    if (this.hasBullets) {
      this.controlsContainer.insertBefore(
        this.leftArrow,
        this.bulletsContainer,
      );
      this.controlsContainer.insertBefore(
        this.rightArrow,
        this.bulletsContainer.nextSibling,
      );
    } else {
      this.controlsContainer.appendChild(this.leftArrow);
      this.controlsContainer.appendChild(this.rightArrow);
    }

    this.leftArrow.addEventListener("click", () => {
      if (this.isLoop) {
        this.goToSlide(
          (this.currentSlideIndex - 1 + this.slidesData.length) %
            this.slidesData.length,
        );
      } else {
        this.goToSlide(Math.max(this.currentSlideIndex - 1, 0));
      }

      if (this.shouldInterruptAutoSlide) {
        this.destroyAutoSlide();
      }
    });

    this.rightArrow.addEventListener("click", () => {
      if (this.isLoop) {
        this.goToSlide((this.currentSlideIndex + 1) % this.slidesData.length);
      } else {
        this.goToSlide(
          Math.min(this.currentSlideIndex + 1, this.slidesData.length - 1),
        );
      }

      if (this.shouldInterruptAutoSlide) {
        this.destroyAutoSlide();
      }
    });
  }

  generateBullets() {
    if (!this.hasBullets) return;

    this.bulletsContainer = document.createElement("div");
    this.bulletsContainer.classList.add("slider__bullets");
    this.controlsContainer.appendChild(this.bulletsContainer);

    this.slidesData.forEach((slide, index) => {
      const bullet = document.createElement("button");
      bullet.classList.add("slider__bullet");
      bullet.setAttribute("data-slide-index", index);

      if (index === 0) {
        bullet.classList.add("slider__bullet--active");
      }

      bullet.addEventListener("click", () => {
        this.goToSlide(index);

        if (this.shouldInterruptAutoSlide) {
          this.destroyAutoSlide();
        }
      });

      this.bulletsContainer.appendChild(bullet);
    });

    this.bulletElements =
      this.sliderContainer.querySelectorAll(".slider__bullet");
  }

  goToSlide(index) {
    const prevSlide = this.currentSlideIndex;
    this.currentSlideIndex = index;

    this.slides.forEach((slide) => {
      slide.classList.remove("slider__slide--active");
      slide.classList.remove("slider__slide--prev");
    });
    this.slides[this.currentSlideIndex].classList.add("slider__slide--active");
    this.slides[prevSlide].classList.add("slider__slide--prev");

    this.updateSliderAttribute();
    this.updateActiveBullet(index);
    this.updateArrows();
  }

  updateActiveBullet(activeIndex) {
    if (!this.hasBullets || !this.bulletElements) return;

    this.bulletElements.forEach((bullet) => {
      bullet.classList.remove("slider__bullet--active");
    });

    this.bulletElements[activeIndex].classList.add("slider__bullet--active");
  }

  updateArrows() {
    if (!this.hasArrows || this.isLoop) return;

    this.leftArrow.classList.toggle(
      "slider__arrow--disabled",
      this.currentSlideIndex === 0,
    );
    this.rightArrow.classList.toggle(
      "slider__arrow--disabled",
      this.currentSlideIndex === this.slidesData.length - 1,
    );
  }

  updateSliderAttribute() {
    this.sliderContainer.setAttribute(
      "data-active-slide",
      this.currentSlideIndex,
    );
  }

  makeAutoSlide() {
    if (!this.hasAutoSlide) return;

    if (this.isLoop) {
      this.autoSlideIntervalId = setInterval(() => {
        this.goToSlide((this.currentSlideIndex + 1) % this.slidesData.length);
      }, this.autoSlideInterval);
    } else {
      this.autoSlideIntervalId = setInterval(() => {
        this.goToSlide(
          Math.min(this.currentSlideIndex + 1, this.slidesData.length - 1),
        );
      }, this.autoSlideInterval);
    }
  }

  destroyAutoSlide() {
    clearInterval(this.autoSlideIntervalId);
  }
}
