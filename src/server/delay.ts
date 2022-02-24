export function delay(msTime: number){
  return new Promise( resolve => setTimeout(resolve, msTime) );
};