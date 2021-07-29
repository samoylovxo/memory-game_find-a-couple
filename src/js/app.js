'use strict';

const cardItemsRow = document.getElementsByClassName('card_items-row')[0];
const cardFlipItem = document.getElementsByClassName('card_flip-item');

window.onload = () => {
  const flipAnFlip = (method) => {
    [...cardFlipItem].forEach((card) => {
      eval(`card.classList.${method}('flip')`);
    });
  };

  flipAnFlip('add');

  setTimeout(() => {
    flipAnFlip('remove');
  }, 1500);
};

function isWin() {
  alert('Игра пройдена!');
  window.location.reload();
}

const lastTargetId = [];
const lastTargetDataName = [];

function flipper(e) {
  const { target } = e;
  const targetParentCart = target.closest('.card_flip-item');

  targetParentCart.classList.add('flip');

  lastTargetId.push(targetParentCart.dataset.id);
  lastTargetDataName.push(targetParentCart.dataset.name);

  const flips = cardItemsRow.getElementsByClassName('flip');

  const targetDataName = targetParentCart.dataset.name;
  const prevTargetDataName = lastTargetDataName[lastTargetDataName.length - 2];
  const targetDataId = targetParentCart.dataset.id;
  const prevTargetDataId = lastTargetId[lastTargetId.length - 2];

  if (targetDataName !== prevTargetDataName && flips.length === 2) {
    setTimeout(() => {
      [...flips].forEach((flippers) => flippers.classList.remove('flip'));
    }, 500);
  }
  if (targetDataName === prevTargetDataName && targetDataId !== prevTargetDataId) {
    [...flips].forEach((flippers) => {
      flippers.classList.remove('flip');
      flippers.classList.add('flip_active');

      const allCardActive = [...cardItemsRow.children].every((card) =>
        card.classList.contains('flip_active')
      );

      if (allCardActive) {
        setTimeout(() => isWin(), 1000);
      }
    });
  }
}

cardItemsRow.addEventListener('click', flipper);

function addCardsToRow() {
  const cardsList = [];
  const cardDataName = ['burger', 'pancakes', 'toast', 'ramen', 'pizza', 'spaguetti'];

  let count = 1;
  for (let i = 0; i < 2; i++) {
    cardDataName.forEach((dataName) => {
      const cardItem = `<div class="card_flip-item" data-id="${count++}" data-name=${dataName}>
            <div class="card_front">?</div>
            <div class="card_back"></div>
          </div>`;

      cardsList.push(cardItem);
    });
  }

  randomSortArr(cardsList).forEach((card) => cardItemsRow.insertAdjacentHTML('beforeend', card));
}
addCardsToRow();

function addBackgroundToCards() {
  [...cardFlipItem].forEach((card) => {
    const getElemAndAddClass = (className) =>
      card.getElementsByClassName('card_back')[0].classList.add(className);

    if (card.dataset.name === 'burger') {
      getElemAndAddClass('bg-card-burger');
    }
    if (card.dataset.name === 'pancakes') {
      getElemAndAddClass('bg-card-pancakes');
    }
    if (card.dataset.name === 'toast') {
      getElemAndAddClass('bg-card-toast');
    }
    if (card.dataset.name === 'ramen') {
      getElemAndAddClass('bg-card-ramen');
    }
    if (card.dataset.name === 'pizza') {
      getElemAndAddClass('bg-card-pizza');
    }
    if (card.dataset.name === 'spaguetti') {
      getElemAndAddClass('bg-card-spaguetti');
    }
  });
}
addBackgroundToCards();
