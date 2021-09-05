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
    const sequenceNumber = getSequenceNumber(gender);
    const datePart = date.format("DDMMYY");
    const centurySign = getCentury(date);

    return {
        gender: gender,
        date: date,
        code: `${datePart}${centurySign}${sequenceNumber}${getCheckSum(parseInt(`${datePart}${sequenceNumber}`))}`
    }
}

function getCentury(date) {
    const year = date.year();
    const options = [
        {value: '+', start: 1800, end: 1899},
        {value: '-', start: 1900, end: 1999},
        {value: 'A', start: 2000, end: 2099}
    ];
    const result = options.filter(option => year >= option.start && year <= option.end);
    return result && result.length > 0 ? result[0].value : null;
}



function getSequenceNumber(gender) {
    const min = 2;
    const max = 899;
    let rand = Math.floor(Math.random() * max) + min;

    if((gender === 1 && rand % 2  === 0) || (gender === 2 && rand % 2 !== 0)) {
        return getSequenceNumber(gender);
    }

    for (let i = 0; i < (3 - rand.toString().length); i++) {
        rand = `0${rand}`;
    }

    return rand;
}

function getCheckSum(code) {
    const checkNumberString = "0123456789ABCDEFHJKLMNPRSTUVWXY";
    return checkNumberString.charAt(Math.round(((code / 31) % 1) * 31));
}