import {generate as generateLT, random as randomLT} from "./lt/Generator";
import {generate as generateLV, random as randomLV} from "./lv/Generator";
import {generate as generateEE, random as randomEE} from "./ee/Generator";
import {generate as generateFI, random as randomFI} from "./fi/Generator";

export function generate(country, date, gender) {
    switch (country) {
        case 1:
            return generateEE(date, gender);
        case 2:
            return generateLV(date, gender);
        case 3:
            return generateLT(date, gender);
        case 4:
            return generateFI(date, gender);
    }
}

export function random(country) {
    switch (country) {
        case 1:
            return randomEE();
        case 2:
            return randomLV();
        case 3:
            return randomLT();
        case 4:
            return randomFI();
    }
}