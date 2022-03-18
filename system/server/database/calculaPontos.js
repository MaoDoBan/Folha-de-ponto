import { tempoToMinutos, minutosToTempo } from "../tempo.js";
export function calculaPontos(id_funcionario, mêsAno, config, getPontos) {
    const partes = mêsAno.split("/");
    const mes = Number(partes.shift());
    const ano = Number(partes.shift());
    if (isNaN(mes) || isNaN(ano))
        return "o mês e ano informados são inválidos!";
    const pontosNoBanco = getPontos(mes, ano);
    const totaisNum = {
        //total: 0,
        total50: 0,
        total100: 0,
        compSábado: 0
    };
    const planilhaPontos = [];
    for (let pontosNoDia of pontosNoBanco) {
        planilhaPontos[pontosNoDia.dia] = geraLinhaPlanilha(pontosNoDia, config, totaisNum);
    }
    const semana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
    let numDiaNaSemana = new Date(ano, mes - 1, 1).getDay() - 1;
    const dataFinal = new Date(ano, mes, 1);
    dataFinal.setHours(-1);
    const comprimentoMês = dataFinal.getDate();
    for (let dia = 1; dia <= comprimentoMês; dia++) {
        numDiaNaSemana = numDiaNaSemana < 6 ? numDiaNaSemana + 1 : 0;
        if (planilhaPontos[dia]) {
            planilhaPontos[dia].diaNaSemana = semana[numDiaNaSemana];
            continue;
        }
        planilhaPontos.push(geraLinhaPlanilha({ id_funcionario, dia, mes, ano }, config, totaisNum, semana[numDiaNaSemana]));
    }
    planilhaPontos.shift(); //remove o primeiro item (i 0), que é vazio
    const totais = {};
    for (let total in totaisNum) {
        totais[total] = minutosToTempo(totaisNum[total]);
    }
    return { planilhaPontos, totais };
}
function geraLinhaPlanilha(pontos, config, totais, diaNaSemana = "-") {
    const tempoStr = {
        entrada1: pontos.entrada1 ?? "",
        saida1: pontos.saida1 ?? "",
        entrada2: pontos.entrada2 ?? "",
        saida2: pontos.saida2 ?? "",
        entrada3: pontos.entrada3 ?? "",
        saida3: pontos.saida3 ?? "",
    };
    const tempoMinutos = {};
    for (let momento in tempoStr) {
        tempoMinutos[momento] = tempoStr[momento] == "" ? -1 : tempoToMinutos(tempoStr[momento]);
    }
    tempoMinutos.total = tempoMinutos.saida1 + tempoMinutos.saida2 + tempoMinutos.saida3 - tempoMinutos.entrada1 - tempoMinutos.entrada2 - tempoMinutos.entrada3;
    tempoMinutos.total50 = tempoMinutos.total == 0 ? 0 : tempoMinutos.total - tempoToMinutos(config.fatorTotal50);
    //tempoMinutos.total100 = ; //PERGUNTAR
    tempoMinutos.compSábado = tempoMinutos.total == 0 ? 0 : tempoMinutos.total50 - tempoToMinutos(config.fatorCompensaçãoSábado);
    //totais.total   += tempoMinutos.total; //PERGUNTAR
    totais.total50 += tempoMinutos.total50;
    //totais.total100 += ; //PERGUNTAR
    totais.compSábado += tempoMinutos.compSábado;
    const linha = {
        ...tempoStr,
        id_funcionario: pontos.id_funcionario,
        dia: pontos.dia,
        mes: pontos.mes,
        ano: pontos.ano,
        diaNaSemana,
        intervalo: minutosToTempo(tempoMinutos.entrada2 - tempoMinutos.saida1),
        total: minutosToTempo(tempoMinutos.total),
        total50: minutosToTempo(tempoMinutos.total50),
        total100: "",
        compSábado: minutosToTempo(tempoMinutos.compSábado),
        observacao: pontos.observacao ?? ""
    };
    return linha;
}
// const semana = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];
// let i_semana = 1;
// const fevereiro: any[] = [];/// ARRUMAR
// for(let i=1; i<=28; i++){
//   fevereiro.push({
//     numero: i, semana: semana[i_semana], t1entrada: "", t1saída: "", intervalo: "0:00",
//     t2entrada: "", t2saída: "", t3entrada: "", t3saída: "",
//     total: "", total50: "", total100: "", cSábado: "", obs: ""
//   });
//   i_semana = i_semana == 6 ? 0 : i_semana+1;
// }
// export { fevereiro };
/*
entrada1
saída1
intervalo
entrada2
saída2
entrada3
saída3
total
total50
total100
compSábado
obs

{
      ...pontosNoDia, diaNaSemana: "-",
      intervalo: subtrairHoras(pontosNoDia.entrada2, pontosNoDia.saida1),
      total: subtrairHoras(pontosNoDia.),
      total50: "",
      total100: "",
      compensaçãoSábado: ""
    };
*/ 
