/* --------------------- CONFIG -------------------- */
/**
 * Open config.js and fill the placeholders with the
 * date you want to begin drawing!
 */

/* -------------------- MODULES -------------------- */
const fs = require('fs');
const { crab } = require('./aliens.js');
const { INIT_MONTH, INIT_DAY, INIT_YEAR } = require('./config.js');

/* ------------------- FUNCTIONS ------------------- */
const getContentString = function (initialDate, alien) {
  let string = '';
  let date = initialDate;

  alien.pixels.forEach(pixel => {
    date = new Date(date.setDate(date.getDate() + 1));
    if (!pixel) return;

    string += `echo 'A commit was made on this date: ${date.toDateString()}' >> commit-history.md \n`;
    string += `git add commit-history.md\n`;
    string += `git commit --date="${date.toDateString()}" -m "${
      alien.name
    }" \n`;
  });
  return string;
};

/* ----------------- CREATE SCRIPT ----------------- */
const initialDate = new Date(INIT_YEAR, INIT_MONTH - 1, INIT_DAY - 1);

// Generate script contents string
const scriptContents = getContentString(initialDate, crab);

// Clear markdown commit history file
fs.writeFileSync(`${__dirname}/commit-history.md`, '', 'utf8');

// Write contents to bash script file
fs.writeFileSync(`${__dirname}/script.sh`, scriptContents, 'utf8');

/* ------------------- LET'S GO! ------------------- */
/**
 * Run script.sh using bash or git bash terminal
 * like this: ./script.sh
 * and enjoy!
 */
