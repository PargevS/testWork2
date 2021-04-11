import {useState} from 'react';


const workerHandler = (fn) => {
    onmessage = (e) => postMessage(fn(e.data));
}


export const useWebWorker = (fn) => {
    const [result, setResult] = useState(null);

    const run = (value) => {
        const worker = new Worker(
            URL.createObjectURL(new Blob([`(${workerHandler})(${fn})`]))
        );
        worker.onmessage = (e) => {
            setResult(e.data);
            worker.terminate();
        }
        worker.postMessage(value);
    }


    return {result, run};

}