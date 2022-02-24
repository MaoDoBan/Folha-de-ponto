export function delay(msTime) {
    return new Promise(resolve => setTimeout(resolve, msTime));
}
;
