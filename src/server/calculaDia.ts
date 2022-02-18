const semana = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];
let i_semana = 1;
const fevereiro: any[] = [];/// ARRUMAR
for(let i=1; i<=28; i++){
  fevereiro.push({
    numero: i, semana: semana[i_semana], t1entrada: "", t1saída: "", intervalo: "0:00",
    t2entrada: "", t2saída: "", t3entrada: "", t3saída: "",
    total: "", total50: "", total100: "", cSábado: "", obs: ""
  });
  i_semana = i_semana == 6 ? 0 : i_semana+1;
}

export { fevereiro };