# Слайдер.

- Реализован за счет самописного JS класса `Slider`.
- Для инициализации слайдера необходимо иметь контейнер в HTML и передать его в качестве опции sliderContainer для класса.
- весь HTML-шаблон генерируется внутри класса. требуется только пустой контейнер для слайдера.
- данные для слайда передаются объектом SLIDES
- В качестве параметров можно указать: 
  - зацикленность (isLoop)
  - автосмену слайда (hasAutoSlide)
  - интервал автосмены (autoSlideInterval)
  - прерывание автосмены после ручного перехода (shouldInterruptAutoSlide)
  - отображение и переключение слайдов по стрелкам (hasArrows)
  - отображение и переключение слайдов по буллетам (hasBullets)
  - дополнительный класс для корневого контейнера слайдера (additionalClass)

Не реализовано:
 - отображение нумерации слайдов
