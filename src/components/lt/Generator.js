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

    const genderNumber = getGenderNumber(date, gender);
    const datePart = date.format("YYMMDD");
    const sequenceNumber = getSequenceNumber();
    let codeWithoutCheckNumber = `${genderNumber}${datePart}${sequenceNumber}`;

    const checkNumber = getCheckSum(codeWithoutCheckNumber);
    return `${codeWithoutCheckNumber}${checkNumber}`;
}

function getGenderNumber(date, gender) {
    const gen = gender === 0 ? 1 : 0;
    return Math.floor(date.year() / 100) * 2 - 34 - gen;
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

function getCheckSum(code) {
    let b = 1, c = 3, d = 0, e = 0, i, digit;
    for (i = 0; i < 10; i++) {
        digit = parseInt(code[i]);
        d += digit * b;
        e += digit * c;
        b++; if (b === 10) b = 1;
        c++; if (c === 10) c = 1;
    }
    d = d % 11;
    e = e % 11;
    if (d < 10)
        return d;
    else if (e < 10)
        return e;
    else
        return 0;
}