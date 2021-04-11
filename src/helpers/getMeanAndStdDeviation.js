// const getMean = (array) => {
//     if (array.length) {
//         let result = array.reduce((prev, item, idx) => prev + item.value, 0);
//         return result / array.length;
//     } else return null;
// }
//
// const getStandardDeviation = (array, arrayMean) => {
//
//     if (array.length) {
//         let mean = array.reduce((prev, item, idx) => prev + item.value, 0);
//         mean = mean / array.length;
//
//         if (mean) {
//             const stdDeviation = Math.sqrt(array.map(x => Math.pow(x.value - arrayMean, 2)).reduce((a, b) => a + b) / array.length);
//             return {mean, stdDeviation};
//         }
//
//         return {mean: null, stdDeviation: null}
//     }
//
//     return {mean: null, stdDeviation: null}
// }


export const getMeanAndStdDeviation = (array) => {
    if (array.length) {
        let mean = array.reduce((prev, item, idx) => prev + item.value, 0);
        mean = mean / array.length;

        if (mean) {
            const stdDeviation = Math.sqrt(array.map(x => Math.pow(x.value - mean, 2)).reduce((a, b) => a + b) / array.length);
            return {mean, stdDeviation};
        }

        return {mean: null, stdDeviation: null}
    }

    return {mean: null, stdDeviation: null}
}