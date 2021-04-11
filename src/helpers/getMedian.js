export const getMedian = (array) => {
    if (array.length) {
        let half = Math.floor(array.length / 2);
        array.sort(function(a, b) { return a.value - b.value;});

        if (array.length % 2) {
            return array[half].value;
        } else {
            return (array[half].value + array[half].value + 1) / 2.0;
        }
    }
    return null;
}