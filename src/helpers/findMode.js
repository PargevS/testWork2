export function findMode(array) {
    const mapping = {};
    let mode = 0;
    for (let i = 0; i < array.length; i++) {
        if (!mapping[array[i].value]) {
            mapping[array[i].value] = 0;
        }
        mapping[array[i].value] += 1;
    }
    for (let prop in mapping) {
        if (mapping[prop] > mode) {
            mode = parseInt(prop);
        }
    }
    return mode;
}