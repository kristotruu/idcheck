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

// 1:	1800...1899.a	sündinud	mees
// 2:	1800...1899.a	sündinud	naine
// 3:	1900...1999.a	sündinud	mees
// 4:	1900...1999.a	sündinud	naine
// 5:	2000...2099.a	sündinud	mees
// 6:	2000...2099.a	sündinud	naine
function getGenderNumber(date, gender) {
    const year = date.year();
    const options = [
        {value: 1, start: 1800, end: 1899, gender: 1},
        {value: 2, start: 1800, end: 1899, gender: 2},
        {value: 3, start: 1900, end: 1999, gender: 1},
        {value: 4, start: 1900, end: 1999, gender: 2},
        {value: 5, start: 2000, end: 2099, gender: 1},
        {value: 6, start: 2000, end: 2099, gender: 2}
    ];

    const result = options.filter(option => option.gender === gender && year >= option.start && year <= option.end);
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

function getCheckSum(code) {
    let sumNumber = 0;

    code.split("").forEach((number, index) => {
        const weight = index === 9 ? 1 : index + 1;
        sumNumber = sumNumber + (number * weight);
    });

    let wholePart = Math.floor(sumNumber / 11);
    let residue = sumNumber - (wholePart * 11);
    if(residue !== 10) {
        return residue;
    }

    sumNumber = 0;
    const secondLevelBias = [3,4,5,6,7,8,9,1,2,3]
    code.split("").forEach((number, index) => {
        sumNumber = sumNumber + (number * secondLevelBias[index]);
    });

    wholePart = Math.floor(sumNumber / 11);
    residue = sumNumber - (wholePart * 11);
    return residue === 10 ? 0 : residue;
}