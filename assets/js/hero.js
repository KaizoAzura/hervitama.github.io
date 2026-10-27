const heroWord = document.querySelector(".hero-word");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (heroWord && !reduceMotion.matches) {
  const TYPE_DELAY = 90;
  const DELETE_DELAY = 45;
  const HOLD_DELAY = 2400;
  const PAUSE_DELAY = 350;

  const words = heroWord.dataset.words.split(",");
  const sets = document.querySelectorAll(".hero-set");
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const showSet = (index) => {
    sets.forEach((set, i) => set.classList.toggle("is-active", i === index));
  };

  const typeWord = async (word) => {
    for (const char of word) {
      heroWord.textContent += char;
      await wait(TYPE_DELAY);
    }
  };

  const deleteWord = async () => {
    while (heroWord.textContent.length > 0) {
      heroWord.textContent = heroWord.textContent.slice(0, -1);
      await wait(DELETE_DELAY);
    }
  };

  const loop = async () => {
    let index = 0;
    while (true) {
      await wait(HOLD_DELAY);
      await deleteWord();
      await wait(PAUSE_DELAY);
      index = (index + 1) % words.length;
      if (sets.length) showSet(index % sets.length);
      await typeWord(words[index]);
    }
  };

  loop();
}