import { Totais, TotaisNum } from "../types/Pontos.js";
import { minutosToTempo } from "./tempo.js";


export function totaisToString(totaisNum: TotaisNum): Totais{
  return {
    total50:    minutosToTempo(totaisNum.total50),
    total100:   minutosToTempo(totaisNum.total100),
    compSábado: minutosToTempo(totaisNum.compSábado)
  };
}