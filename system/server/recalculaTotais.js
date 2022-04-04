import { minutosToTempo, tempoToMinutos } from "./tempo.js";
import { totaisToString } from "./totaisToString.js";
export function recalculaTotais(linha, totais, config) {
    const saída1 = tempoToMinutos(linha.saida1);
    const entrada2 = tempoToMinutos(linha.entrada2);
    const totalNew = saída1 + tempoToMinutos(linha.saida2) + tempoToMinutos(linha.saida3)
        - tempoToMinutos(linha.entrada1) - entrada2 - tempoToMinutos(linha.entrada3);
    const intervalo = entrada2 - saída1;
    const total50New = totalNew == 0 ? 0 : totalNew - tempoToMinutos(config.fatorTotal50);
    const total100New = totalNew == 0 ? 0 : totalNew - tempoToMinutos(config.fatorTotal100); //PERGUNTAR
    const compSábadoNew = totalNew == 0 ? 0 : total50New - tempoToMinutos(config.fatorCompensaçãoSábado);
    const totaisNum = {
        total50: tempoToMinutos(totais.total50) - tempoToMinutos(linha.total50) + total50New,
        total100: tempoToMinutos(totais.total100) - tempoToMinutos(linha.total100) + total100New,
        compSábado: tempoToMinutos(totais.compSábado) - tempoToMinutos(linha.compSábado) + compSábadoNew
    };
    linha.intervalo = minutosToTempo(intervalo);
    linha.total = minutosToTempo(totalNew);
    linha.total50 = minutosToTempo(total50New);
    linha.total100 = minutosToTempo(total100New);
    linha.compSábado = minutosToTempo(compSábadoNew);
    return {
        linha,
        totais: totaisToString(totaisNum)
    };
}
