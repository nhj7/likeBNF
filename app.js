const history = require('./history');
// const getHistory = require('./history').getHistory;
// const transferObjToArr = require('./history').transferObjToArr;
// const calcMovingAverage25
// const calcDifferenceRate

const main = async () => {
    let history_obj = await history.getHistory('43430', '1361192945', Date.now());
    let history_arr = history.transferObjToArr(history_obj);
    history_arr = history.calcMovingAverage25(history_arr);
    history_arr = history.calcDifferenceRate(history_arr);

    console.log(history_arr[history_arr.length-1]);
}

main();