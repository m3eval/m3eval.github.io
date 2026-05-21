document.addEventListener('DOMContentLoaded', () => {
  const burgers = Array.from(document.querySelectorAll('.navbar-burger'));

  burgers.forEach((burger) => {
    burger.addEventListener('click', () => {
      const targetId = burger.dataset.target;
      const target = targetId ? document.getElementById(targetId) : null;
      burger.classList.toggle('is-active');
      burger.setAttribute('aria-expanded', burger.classList.contains('is-active') ? 'true' : 'false');
      if (target) {
        target.classList.toggle('is-active');
      }
    });
  });

  const carousels = Array.from(document.querySelectorAll('[data-detail-carousel]'));

  carousels.forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('.detail-slide'));
    const controls = carousel.querySelector('.detail-carousel-controls');
    const prevButton = carousel.querySelector('[data-direction="prev"]');
    const nextButton = carousel.querySelector('[data-direction="next"]');
    const status = carousel.querySelector('.detail-carousel-status');

    if (!slides.length) {
      return;
    }

    let currentIndex = slides.findIndex((slide) => !slide.hidden);
    if (currentIndex < 0) {
      currentIndex = 0;
    }

    const updateCarousel = () => {
      slides.forEach((slide, index) => {
        slide.hidden = index !== currentIndex;
      });

      const currentSlide = slides[currentIndex];
      const currentStage = currentSlide ? currentSlide.querySelector('.detail-slide-stage') : null;

      if (controls && currentStage && controls.parentElement !== currentStage) {
        currentStage.appendChild(controls);
      }

      if (status) {
        status.textContent = `${currentIndex + 1} / ${slides.length}`;
      }

      if (prevButton) {
        prevButton.disabled = currentIndex === 0;
      }

      if (nextButton) {
        nextButton.disabled = currentIndex === slides.length - 1;
      }
    };

    if (slides.length <= 1) {
      if (controls) {
        controls.hidden = true;
      }
      updateCarousel();
      return;
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex -= 1;
          updateCarousel();
        }
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
          currentIndex += 1;
          updateCarousel();
        }
      });
    }

    updateCarousel();
  });
});
