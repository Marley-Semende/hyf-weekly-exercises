'use strict';

const STEP_SIZE_PX = 10;
const STEP_INTERVAL_MS = 50;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';


async function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {
    let currentPosition = startPos;

    const walkStep = () => {
      if (currentPosition < stopPos) {
        currentPosition += STEP_SIZE_PX;
        img.style.left = currentPosition + 'px';
        requestAnimationFrame(walkStep);
      } else {
        resolve();
      }
    }

    walkStep(); 
  });
}

async function dance(img) {
  return new Promise((resolve) => {
    img.src = DANCING_CAT_URL;
    setTimeout(() => {
      img.src = 'http://www.anniemation.com/clip_art/images/cat-walk.gif';
      resolve();
    }, DANCE_TIME_MS);
  });
  }

async function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  async function walkAndDance() {
    await walk(img, startPos, centerPos);
    await dance(img);
    await walk(img, centerPos, stopPos);
    walkAndDance();
  }
  await walkAndDance();
}

window.addEventListener('load', catWalk);