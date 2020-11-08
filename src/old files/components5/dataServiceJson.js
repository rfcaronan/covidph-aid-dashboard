import { readRemoteFile } from "react-papaparse";
import { csv } from "d3-request";

const csvFilePath = "./data.csv";

const csvData = (data) => {
  console.log(data);
};

const parseData = (callback) => {
  readRemoteFile(require("./data.csv"), {
    header: true,
    download: true,
    skipEmptyLines: true,
    complete: (results) => {
      callback(results.data);
    },
  });
};

export function getData() {
  return parseData(csvData);
}

/*async componentDidMount() {
    return  = await csv().fromFile(csvFilePath);
    this.setState({ posts });
    console.log(posts);
  }

  const updateProductBackend = async (product) => {
    return await updateBackend(product);
   }
let arr = createArray();
return arr;*/
