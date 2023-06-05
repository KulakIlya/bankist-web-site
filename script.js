'use strict';

const nav = document.querySelector('.nav');

modal();
navItemsOnHover();
stickyHeader();
revealSectionsEffect();
goToSection();
lazyImgs();
tabsOnClick();
slider();

function modal() {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');

  const btnCloseModal = document.querySelector('.btn--close-modal');
  const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

  const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };

  const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

function navItemsOnHover() {
  // const navLinks = document.querySelector('.nav__links');
  // navLinks.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   if (e.target.classList.contains('nav__link')) console.log(true);

  // });

  nav.addEventListener('mouseover', (e) => onHover(e, 0.5));
  nav.addEventListener('mouseout', (e) => onHover(e, 1));

  function onHover(e, opacity) {
    const target = e.target;

    if (target.classList.contains('nav__link')) {
      const siblings = target.closest('.nav').querySelectorAll('.nav__link');
      const logo = target.closest('.nav').querySelector('.nav__logo');
      siblings.forEach((item) => {
        if (item !== target) item.style.opacity = opacity;
      });
      logo.style.opacity = opacity;
    }
  }
}

function stickyHeader() {
  const header = document.querySelector('.header');

  const headerObserver = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) nav.classList.add('sticky');
      else nav.classList.remove('sticky');
    },
    {
      root: null,
      rootMargin: -nav.clientHeight + 'px',
    }
  );

  headerObserver.observe(header);
}

function goToSection() {
  const btnScrollTo = document.querySelector('.btn--scroll-to');

  btnScrollTo.addEventListener('click', () => {
    const section = document.getElementById('section--1');

    // const s1 = section.getBoundingClientRect();
    // window.scrollTo({
    //   top: s1.top + window.pageYOffset,
    //   left: 0,
    // });

    section.scrollIntoView({ behavior: 'smooth' });
  });
}

function revealSectionsEffect() {
  const allSections = document.querySelectorAll('.section');
  const sectionObserver = new IntersectionObserver(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target);
      }
    },
    {
      root: null,
      threshold: 0.15,
    }
  );

  allSections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
  });
}

function lazyImgs() {
  const lazyImgs = document.querySelectorAll('img[data-src]');
  const lazyImgsObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;

        entry.target.addEventListener('load', () =>
          entry.target.classList.remove('lazy-img')
        );
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: `200px`,
    }
  );

  lazyImgs.forEach((img) => lazyImgsObserver.observe(img));
}

function tabsOnClick() {
  const tabContainer = document.querySelector('.operations__tab-container');

  tabContainer.addEventListener('click', (e) => {
    const target = e.target.closest('.operations__tab');

    const currentActive = document.querySelector('.operations__tab--active');

    if (currentActive !== target && target) {
      currentActive.classList.remove('operations__tab--active');
      target.classList.add('operations__tab--active');
    }
  });
}

function slider() {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');

  const dots = document.querySelector('.dots');

  const btnNext = document.querySelector('.slider__btn--right');
  const btnPrev = document.querySelector('.slider__btn--left');

  // Adding moving postion of slides and adding dots in .dots
  slides.forEach((slide, index) => {
    slide.style.transform = `translate(${100 * index}%)`;
    dots.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });

  let currentSlideIndex = 0;
  const sliderLength = slides.length;

  let currentDot = document.querySelector(
    `.dots__dot[data-slide="${currentSlideIndex}"]`
  );

  currentDot.classList.add('dots__dot--active');

  btnNext.addEventListener('click', () => {
    nextSlide();
  });

  btnPrev.addEventListener('click', () => {
    prevSlide();
  });

  dots.addEventListener('click', ({ target }) => {
    if (target.classList.contains('dots__dot')) {
      goToSlide(target.dataset.slide);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    else if (e.key === 'ArrowRight') nextSlide();
  });

  function goToSlide(currentIndex) {
    currentDot.classList.remove('dots__dot--active');

    slides.forEach((slide, index) => {
      slide.style.transform = `translate(${(index - currentIndex) * 100}%)`;

      currentDot = document.querySelector(
        `.dots__dot[data-slide="${currentIndex}"]`
      );

      currentDot.classList.add('dots__dot--active');
    });
  }

  function nextSlide() {
    if (currentSlideIndex === sliderLength - 1) currentSlideIndex = 0;
    else currentSlideIndex += 1;
    goToSlide(currentSlideIndex);
  }

  function prevSlide() {
    if (currentSlideIndex === 0) currentSlideIndex = sliderLength - 1;
    else currentSlideIndex -= 1;
    goToSlide(currentSlideIndex);
  }
}
