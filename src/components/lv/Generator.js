import Moment from 'moment';

export function random() {
    const start = new Date(1945, 0, 1);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const randomGender = [1,2][Math.floor(Math.random() * [1,2].length)];
    return generate(randomDate, randomGender);
}

export function generate(date, gender) {
    date = Moment(date);
    const withoutCheckSum =  `${date.format("DDMMYY")}${getCentury(date)}${getSequenceNumber()}`;
    const checkDigit = getCheckDigit(withoutCheckSum)
    const code = `${withoutCheckSum}${checkDigit}`;
    return code.substring(0, 6) + "-" + code.substring(6);
}

// (0 for 19. (1800-1899), 1 for 20. (1900-1999) and 2 for 21. (2000-2099)
function getCentury(date) {
    const year = date.year();
    const options = [
        {value: 0, start: 1800, end: 1899},
        {value: 1, start: 1900, end: 1999},
        {value: 2, start: 2000, end: 2099}
    ];
    const result = options.filter(option => year >= option.start && year <= option.end);
    return result && result.length > 0 ? result[0].value : null;
}

function getSequenceNumber() {
    const min = 0;
    const max = 999;
    let rand = Math.floor(Math.random() * max) + min;

    for (let i = 0; i < (3 - rand.toString().length); i++) {
        rand = `0${rand}`;
    }

    return rand;
}

function getCheckDigit(code) {
    let factor = [1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    code = code.split("").map(i => parseInt(i));

    let reduce = code.reduce((prev, cur, i) => cur * factor[i] + prev);

    return (1101 - reduce) % 11 % 10;
}