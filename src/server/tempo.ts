export function tempoToMinutos(tempo: string){
  if(tempo == "") return 0;

  let sinal = 1;
  if(tempo.startsWith("- ")){
    tempo = tempo.replace("- ", "");
    sinal = -1;
  }

  const partes = tempo.split(":");//não suporta notação dias:horas:minutos, apenas suporta h:m
  const minutosSobra = Number(partes.pop());
  const horas        = Number(partes.pop());
  const dias = partes.length ? Number(partes.pop()) : 0;
  return (dias*24*60 + horas*60 + minutosSobra) * sinal;
}

const minutosNaHora = 60 * 24;
export function minutosToTempo(todosOsMinutos: number){
  let sinal = "";
  if(todosOsMinutos < 0){
    sinal = "- ";
    todosOsMinutos *= -1;
  }

  if(todosOsMinutos < 1439){
    const minutos    = todosOsMinutos % 60;
    const strMinutos = minutos > 9 ? ""+minutos : "0"+minutos;
    return sinal + Math.floor(todosOsMinutos / 60) + ":" + strMinutos;
  }

  const dias = Math.floor(todosOsMinutos / minutosNaHora);
  const minutosRestantes = todosOsMinutos % minutosNaHora;

  const horas      = Math.floor(minutosRestantes / 60);
  const strHoras   = horas > 9 ? ""+horas : "0"+horas;
  const minutos    = minutosRestantes % 60;
  const strMinutos = minutos > 9 ? ""+minutos : "0"+minutos;

  return sinal + dias + ":" + strHoras + ":" + strMinutos;
}