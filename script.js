'use strict';

///////////////////////////////////////
// Modal window

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

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

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

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');
const navLinks = document.querySelectorAll('.nav__link');

// Smooth Scrolling
const scrollTo = function () {
  section1.scrollIntoView({
    behavior: 'smooth',
  });

  section2.scrollIntoView({
    behavior: 'smooth',
  });
};

btnScrollTo.addEventListener('click', scrollTo);

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

const h1 = document.querySelector('h1');

// mouseenter é um pouco como o evento hover no CSS. Portanto ele dispara sempre que um mouse entra em um determinado elemento.

const alertH1 = function (e) {
  alert('addEventListener: Great!');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// Forma antiga de usar eventos

// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great!');
// };
