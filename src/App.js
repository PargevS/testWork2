import React, {useState, useRef, Fragment} from 'react';

import './App.scss';
import {getMeanAndStdDeviation, getMedian, findMode} from "./helpers";
import {useWebWorker} from "./hooks/useWebWorker";
import TD from "./components/TD";

function App() {
    const [serverData, setServerData] = useState([]);
    const [connectionError, setConnectionError] = useState(false);
    const [connected, setConnected] = useState(false);
    const [isStatistic, setIsStatistic] = useState(false);
    const socket = useRef();


    const medianWorker = useWebWorker(getMedian);
    const modeWorker = useWebWorker(findMode);
    const meanAndStdDeviationWorker = useWebWorker(getMeanAndStdDeviation);


    const connectWS = () => {
        socket.current = new WebSocket('wss://trade.trademux.net:8800/?password=1234');

        socket.current.onopen = () => {
            setConnected(true);
            console.log('success connection');
        }

        socket.current.onmessage = (e) => {
            const mess = JSON.parse(e.data);
            setServerData(pr => [...pr, mess]);
        }

        socket.current.onclose = () => {

        }

        socket.current.onerror = (err) => {
            console.log(err.message)
            setConnectionError(true);
            console.log('An error has occurred');
        }
    }


    const statisticsHandler = () => {
        medianWorker.run(serverData);
        modeWorker.run(serverData);
        meanAndStdDeviationWorker.run(serverData);
        setIsStatistic(true);
    }


    return (
        <div className="app">
            {connectionError ? ('Connection Error') : (
                <Fragment>
                    {!connected && (<p>Для запуска приложения нажмите пожалуйста на кнопку старт</p>)}
                    <div className="control">
                        {!connected && (<button onClick={connectWS} disabled={connected}>Старт</button>)}
                        {connected && (
                            <button onClick={statisticsHandler} disabled={!serverData.length}>
                                {serverData.length ? 'Получить статистику' : 'Подготовка данных...'}

                            </button>
                        )}
                    </div>
                    <div className="statistics">
                        {serverData.length && isStatistic ? (
                            <table>
                                <thead>
                                <tr>
                                    <th>среднее</th>
                                    <th>стандартное отклонение</th>
                                    <th>моду</th>
                                    <th>медиану</th>
                                    <th>потерянные котировки</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <TD>{(meanAndStdDeviationWorker.result && meanAndStdDeviationWorker.result.mean) || 'Loading...'}</TD>
                                    <TD>{(meanAndStdDeviationWorker.result && meanAndStdDeviationWorker.result.stdDeviation) || 'Loading...'}</TD>
                                    <TD>{modeWorker.result || 'Loading...'}</TD>
                                    <TD>{medianWorker.result || 'Loading...'}</TD>
                                    <TD>потерянные котировки</TD>
                                </tr>
                                </tbody>
                            </table>
                        ) : null}
                    </div>
                </Fragment>
            )}
        </div>
    );
}

export default App;
