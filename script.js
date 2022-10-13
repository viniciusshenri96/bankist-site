'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// Button Scrolling
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth Scrolling
const scrollTo = function () {
  section1.scrollIntoView({
    behavior: 'smooth',
  });
};

btnScrollTo.addEventListener('click', scrollTo);

/////////////////////////////////////
/// Event Delegation: Implementing Page Navigation

/////////////////////////////////////
// Page navigation

// Fazer assim impactaria o desempenho, e não é uma solução limpa nesse caso,e a melhor solução é usar a delegação de eventos.
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to commom parent element
// 2. Datermine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/////////////////////////////////////
/// Building a Tabbed Component

// Tabbed component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const handleHover = function (o) {
  return function (e) {
    if (e.target.classList.contains('nav__link')) {
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      const logo = link.closest('.nav').querySelector('img');

      siblings.forEach(el => {
        if (el !== link) el.style.opacity = o;
      });
      live - server;
      logo.style.opacity = o;
    }
  };
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover(0.5));

nav.addEventListener('mouseout', handleHover(1));

/////////////////////////////////////
/// Implementing a Sticky Navigation: The Scroll Event
// const initialCoords = section1.getBoundingClientRect();
// // console.log(initialCoords);

// addEventListener('scroll', function () {
//   // console.log(scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

/////////////////////////////////////
/// A Better Way: The Intersection Observer API

// Essa função será chamada cada vez que o elemento observado, está cruzando o elemento raiz no limite que definimos
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   // root é o elemento que o alvo está cruzando, escrevemos
//   root: null,
//   // Essa é basicamente a porcentagem de interseção no qual o callback do observador será chamado, portanto, esse retorno
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  // Quando o alvo não estiver cruzando o root, adicione a classe sticky
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  // Escrevemos null porque queremos toda a janela de visualização.
  root: null,
  threshold: 0,
  // É uma caixa de 90px que será aplicada fora do nosso elemento de destino, então o nosso cabeçalho.
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// const handleHover = function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = this;
//     });
//     logo.style.opacity = this;
//   }
// };

/////////////////////////////////////
/// Revealing Elements on Scroll
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  // Tirando o oberservador, quando não queremos mais que o evento ocorra, bom para desempenho
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);

  // section.classList.add('section--hidden');
});

/////////////////////////////////////
/// Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // usamos esse evento pra quando o javascript terminar de carregar a imagem, removemos a classe
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

/////////////////////////////////////
/// Building a Slider Component

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const slider = document.querySelector('.slider');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot dots__dot--active" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Previous slide
  const prevSlide = function () {
    curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };

  init();

  // Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
/////////////////////////////////////
/// Selecting, Creating, and Deleting Elements

// console.log(document.documentElement);
// console.log(document.body);
// console.log(document.head);

// // Selecting Elements

// // Selecionando apenas um elemento
// const header = document.querySelector('.header');

// // Selecionando vários elementos
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');

// const allButtons = document.getElementsByClassName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// // Creating and inserting elements

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';

// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// // NÃO CRIA VÁRIOS ELEMENTOS!!!
// // Inserir o elemento como primeiro filho de header - Também pode ser usado para mover o elemento
// header.append(message);

// // Inserir o elemento como ultimo filho de header - Também pode ser usado para mover o elemento
// header.append(message);

// // header.before(message);
// // header.after(message);

// // utilizar true significa que todos os elementos filhos também serão clonados
// // header.append(message.cloneNode(true));

// // Delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     // message.remove();
//     message.parentElement.removeChild(message);
//   });

// /*
// console.log('=====Prática=====');

// const nav = document.querySelector('.nav');
// const logo = document.getElementById('logo');
// const navsLinks = document.querySelector('.nav__links');

// // sempre vai retornar uma nodelist
// const list = document.querySelectorAll('.nav__item');
// console.log(nav);
// console.log(logo);
// console.log(list);

// const list2 = document.getElementsByTagName('li');
// const className = document.getElementsByClassName('nav__link');
// console.log(list2);
// console.log(className);

// const about = document.createElement('li');
// about.classList.add('nav__item');
// about.innerHTML = '<a class="nav__link" href="#">About</a>';

// // Inserindo o elemento criado no DOCUMENTO HTML
// navsLinks.append(about);

// // Primeiro filho
// navsLinks.prepend(about);

// // Clonando elemento
// const cloneAbout = about.cloneNode(true);
// console.log(cloneAbout);

// // Removendo elemento
// about.addEventListener('click', function () {
//   about.remove();
// });

// const header__title = document.querySelector('.header__title');

// const button = document.createElement('button');
// button.classList.add('btn--text', 'btn--scroll-to');
// button.innerHTML = 'Access account &DownArrow;';

// header__title.append(button);

// console.log(button);

// const button2 = document.querySelector('.btn--text ');
// const cloneButton = button2.cloneNode(true);

// header__title.append(cloneButton);
// // header__title.prepend(cloneButton);

// const section = document.getElementById('section--2');
// const operations = document.querySelector('.operations');

// const operationsClone = operations.cloneNode(true);

// section.append(operationsClone);
//

// /////////////////////////////////////
// /// Styles, Attributes and Classes

// console.log('=====Styles, Attributes and Classes=====');

// // Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.color);
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).fontWeight);
// console.log(getComputedStyle(message).height);
// console.log(getComputedStyle(message).width);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes
// const logo = document.querySelector('.nav__logo');

// console.log(logo.alt);

// console.log(logo.id);
// console.log(logo.className);

// // Setando o valor da propriedade
// logo.alt = 'Beautiful minimalist logo';
// logo.setAttribute('alt', 'Beautiful minimalist logo2');

// // no-standard - quando não é um atributo padão, o javascript não cria uma propriedade no objeto
// console.log(logo.designer);

// console.log(logo.getAttribute('designer'));

// // Obtendo o valor absoluto do src
// console.log(logo.src);
// // Obtendo o valor relativo do src
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // Data attributes - Tipo especial de atributo data, para esse tipo de atributo especial ele sempre fica armazenado dentro do objeto dataset
// console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add('container');
// logo.classList.remove('container');
// logo.classList.toggle('container');
// logo.classList.contains('container');

// // Todas as classes que já estão definidos no atributo serão substituidas
// // Don't use
// logo.className = 'header__img';

/////////////////////////////////////
/// Implementing Smooth Scrolling

// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

//   console.log(e.target.getBoundingClientRect());

//   // Obtendo a posição da rolagem atual
//   console.log('Current scroll (X/Y)', window.scrollX, scrollY);

//   console.log(
//     'height/width viewport',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );

//   // Scrolling - disponivel no objeto window
//   // window.scrollTo(
//   //   s1coords.left + window.scrollX,
//   //   s1coords.top(viewport) + window.scrollY(janela)
//   // );

//   // window.scrollTo({
//   //   left: s1coords.left + window.scrollX,
//   //   top: s1coords.top + window.scrollY,
//   //   behavior: 'smooth',
//   // });

//   section1.scrollIntoView({
//     behavior: 'smooth',
//   });
// });

// const h1 = document.querySelector('h1');

// mouseenter é um pouco como o evento hover no CSS. Portanto ele dispara sempre que um mouse entra em um determinado elemento.

// const alertH1 = function (e) {
//   alert('addEventListener: Great!');
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// Forma antiga de usar eventos

// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great!');
// };

/////////////////////////////////////
/// Event Propagation in Practice

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   // Stop propagation
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//   },
//   true
// );

/////////////////////////////////////
/// DOM Traversing

// const h1 = document.querySelector('h1');

// /*
//    Going downwards: child
// */

// console.log(h1.querySelectorAll('.highlight'));

// // - selecionando tudo dentro do elemento pai: textos, comentarios, tags filhas
// console.log(h1.childNodes);

// // - seleciona só as tags, só funciona para filhos diretos
// console.log(h1.children);

// // - seleciona o primeiro filho do elemento pai
// h1.firstElementChild.style.color = 'white';
// // - selciona o ultimo filho do elemento pai
// h1.lastElementChild.style.color = 'blue';

// /*
//    Going upwards: parents
// */

// // - selecionando os parentes próximos
// console.log(h1.parentNode);
// // console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// /*
//    Going sidewards: siblings
// */

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// // Selecionando todos os irmãos
// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(el => {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

/////////////////////////////////////
/// Passing Arguments to Event Handlers
