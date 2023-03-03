const fs = require('fs');
const { crab } = require('./aliens.js');
const {
  INIT_DATE_MONTH,
  INIT_DATE_DAY,
  INIT_DATE_YEAR,
} = require('./config.js');

const initialDate = new Date(
  INIT_DATE_YEAR,
  INIT_DATE_MONTH - 1,
  INIT_DATE_DAY - 1
);

const scriptContents = getContentString(
  initialDate,
  crab,
  `Commiting ${crab.name}...`
);

// Reset commit history file
fs.writeFileSync(`${__dirname}/commit-history.md`, '', 'utf8');

// Write contents to script file
fs.writeFileSync(`${__dirname}/script.sh`, scriptContents, 'utf8');

function getContentString(dateObj, alien, commitMessage = 'Invaders') {
  let string = '';
  let date = dateObj;

  alien.pixels.forEach(el => {
    date = new Date(date.setDate(date.getDate() + 1));
    if (!el) return;

    string += `echo 'A commit was made on this date: ${date.toDateString()}' >> commit-history.md \n`;
    string += `git add commit-history.md\n`;
    string += `git commit --date="${date.toDateString()}" -m "${commitMessage}" \n`;
  });
  return string;
}
