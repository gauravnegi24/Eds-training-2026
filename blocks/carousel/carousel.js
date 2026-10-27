export default function decorate(block) {
  const slides = [...block.children];

  if (slides.length === 0) return;

  let currentSlide = 0;

  block.classList.add('travel-carousel');

  // Create slides wrapper
  const slidesWrapper = document.createElement('div');
  slidesWrapper.className = 'carousel-slides';

  slides.forEach((slide, index) => {
    slide.classList.add('carousel-slide');

    if (index === 0) {
      slide.classList.add('active');
    }

    slidesWrapper.append(slide);
  });

  block.append(slidesWrapper);

  // Navigation
  const navigation = document.createElement('div');
  navigation.className = 'carousel-navigation';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-prev';
  prevBtn.innerHTML = '&#10094;';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-next';
  nextBtn.innerHTML = '&#10095;';

  navigation.append(prevBtn, nextBtn);
  block.append(navigation);

  // Indicators
  const indicators = document.createElement('div');
  indicators.className = 'carousel-indicators';

  slides.forEach((_, index) => {
    const dot = document.createElement('button');

    if (index === 0) {
      dot.classList.add('active');
    }

    dot.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
    });

    indicators.append(dot);
  });

  block.append(indicators);

  function updateCarousel() {
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentSlide);
    });

    indicators.querySelectorAll('button').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentSlide =
      (currentSlide - 1 + slides.length) % slides.length;

    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentSlide =
      (currentSlide + 1) % slides.length;

    updateCarousel();
  });

  // Auto Play
  setInterval(() => {
    currentSlide =
      (currentSlide + 1) % slides.length;

    updateCarousel();
  }, 5000);
}
