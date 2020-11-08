import { readRemoteFile } from "react-papaparse";


const csvData = [];

readRemoteFile(require("./data.csv"), {
  header: true,
  download: true,
  skipEmptyLines: true,
  step: (results) => {
    csvData.push(results.data);
  },
  complete: () => {
    axios.post("./dataServiceJson", {csvData})
}

/*readRemoteFile(require("./data.csv"), {
  header: true,
  download: true,
  skipEmptyLines: true,
  complete: (results) => {
    let arr = results.data;
    console.log(arr);
    csvData.push(arr);
    console.log(csvData[0].length);
    //for (var i = 0; i < arr.length; i++) month.push({ month: arr[i].Month });
    return csvData[0];
  },
});*/

export function getData { 
    
}

//export const csvData = [];
//export const month = [];

export function getData() {
  return csvData;
}

//const csvFilePath = require("./data.csv");
//getData(results.data);
//let csvDataL = csvData.length;
//console.log(csvData);
//console.log(month);
//console.log(csvDataL);

/*function findElement(arr, propName, propValue) {
    for (var i=0; i < arr.length; i++)
    if (arr[i][propName] == propValue)
      return arr[i];

  // will return undefined if not found; you could return a default instead
} */

//csvData.push({ data: arr });
//for (var i = 0; i < arr.length; i++) csvData.push(arr[i].Month);
//console.log(results.data);
//return results.data;
