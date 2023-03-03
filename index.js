/* --------------------- CONFIG -------------------- */
//
// Open config.js and replace the placeholders
//

/* -------------------- MODULES -------------------- */
const fileSystem = require('fs');
const aliens = require('./aliens');
const {
  INIT_MONTH,
  INIT_DAY,
  INIT_YEAR,
  ALIEN_TYPE,
  BRIGHTNESS,
} = require('./config');

/* ------------------- FUNCTIONS ------------------- */
const getContentString = function (initialDate, alien, brightness = 1) {
  const oneDay = 1;
  let date = initialDate;
  let output = '';
  alien.pixels.forEach(pixel => {
    date = new Date(date.setDate(date.getDate() + oneDay));
    if (!pixel) return;

    for (let i = 1; i < brightness + 1; i++) {
      output += `echo 'A commit was made on this date: ${date.toDateString()}' >> commit-history.md \n`;
      output += `git add commit-history.md\n`;
      output += `git commit --date="${date.toDateString()}" -m "${
        alien.name
      }" \n`;
    }
  });
  return output;
};

/* ----------------- CREATE SCRIPT ----------------- */
const initialDate = new Date(INIT_YEAR, INIT_MONTH - 1, INIT_DAY - 1);

// Generate script contents string
const scriptContents = getContentString(
  initialDate,
  aliens[ALIEN_TYPE],
  BRIGHTNESS
);

// Clear markdown commit history file
fileSystem.writeFileSync(`${__dirname}/commit-history.md`, '', 'utf8');

// Write contents to bash script file
fileSystem.writeFileSync(`${__dirname}/script.sh`, scriptContents, 'utf8');

/* ------------------- LET'S GO! ------------------- */
//
// 1) Open a bash or Git bash terminal
// 2) Run script like this:  ./script.sh
// 3) Sync changes with origin repo
// 4) Enjoy!
//
