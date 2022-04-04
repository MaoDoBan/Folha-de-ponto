import { minutosToTempo } from "./tempo.js";
export function totaisToString(totaisNum) {
    return {
        total50: minutosToTempo(totaisNum.total50),
        total100: minutosToTempo(totaisNum.total100),
        compSábado: minutosToTempo(totaisNum.compSábado)
    };
}
