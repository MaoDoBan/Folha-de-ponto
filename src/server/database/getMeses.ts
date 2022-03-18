export function getMeses(mêsAnoInicial: string){
  const resultadoRegex = mêsAnoInicial.match(/^(\d|\d{2})[\/](\d{4})$/) as string[];
  if(resultadoRegex == null) return ["03/2022"];

  let mês = Number(resultadoRegex[1]);
  let ano = Number(resultadoRegex[2]);

  const meses = [];
  const agora = new Date();
  const mêsAtual = agora.getMonth()+1;
  const anoAtual = agora.getFullYear()
  let mêsAno: string;
  while(true){
    mêsAno = mês+"/"+ano;
    mêsAno = mês > 9 ? mêsAno : "0"+mêsAno;
    meses.push(mêsAno);

    mês++;
    if(mês > 12){
      mês = 1;
      ano++;
    }
    if(ano < anoAtual) continue;
    if(ano > anoAtual) break;
    if(mês > mêsAtual) break;//ano == anoAtual
  }
  return meses;
}