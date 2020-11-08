import { readRemoteFile } from "react-papaparse";

function getRandomArray(numItems) {
  // Create random array of objects
  let names = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let data = [];
  for (var i = 0; i < numItems; i++) {
    data.push({
      label: names[i],
      value: Math.round(20 + 80 * Math.random()),
    });
  }
  return data;
}

const locationData = [
  {
    ID: 1,
    Month: "Quezon City",
    Amount: 30,
  },
  {
    ID: 2,
    Month: "Manila",
    Amount: 40,
  },
  {
    ID: 3,
    Month: "Caloocan City",
    Amount: 25,
  },
  {
    ID: 4,
    Month: "Navotas City",
    Amount: 10,
  },
  {
    ID: 5,
    Month: "Malabon City",
    Amount: 15,
  },
  {
    ID: 6,
    Month: "Marikina City",
    Amount: 10000,
  },
  {
    ID: 7,
    Month: "Makati City",
    Amount: 100,
  },
  {
    ID: 8,
    Month: "Muntinlupa City",
    Amount: 200,
  },
  {
    ID: 8,
    Month: "Mandaluyong City",
    Amount: 200,
  },

  {
    ID: 8,
    Month: "Pasig City",
    Amount: 200,
  },
];

const aidTypeData = [
  {
    ID: 1,
    AssistanceType: "Cash",
    BeneficiaryType: "Students",
    BeneficiaryValue: 69294,
    Amount: 1000000,
    ActualPopulation: 82,
  },
  {
    ID: 1,
    AssistanceType: "Cash",
    BeneficiaryType: "Low-income families",
    BeneficiaryValue: 18000000,
    Amount: 30,
    ActualPopulation: 82,
  },
  {
    ID: 1,
    AssistanceType: "Cash",
    BeneficiaryType: "Public transport drivers",
    BeneficiaryValue: "92,000",
    Amount: 295.58,
    ActualPopulation: 82,
  },
  {
    ID: 1,
    AssistanceType: "Wage subsidy",
    BeneficiaryType: "Farmers",
    BeneficiaryValue: 591246,
    Amount: 30,
    ActualPopulation: 82,
  },
];

const sankeyData = {
  title: {
    text: "",
  },
  series: [
    {
      keys: ["from", "to", "weight"],
      data: [
        ["Brazil", "Portugal", 5],
        ["Brazil", "France", 1],
        ["Brazil", "Spain", 1],
        ["Brazil", "England", 1],
        ["Canada", "Portugal", 1],
        ["Canada", "France", 5],
        ["Canada", "England", 1],
        ["Mexico", "Portugal", 1],
        ["Mexico", "France", 1],
        ["Mexico", "Spain", 5],
        ["Mexico", "England", 1],
        ["USA", "Portugal", 1],
        ["USA", "France", 1],
        ["USA", "Spain", 1],
        ["USA", "England", 5],
        ["Portugal", "Angola", 2.1],
        ["Portugal", "Senegal", 1],
        ["Portugal", "Morocco", 1.5],
        ["Portugal", "South Africa", 3],
        ["France", "Angola", 1],
        ["France", "Senegal", 3],
        ["France", "Mali", 3],
        ["France", "Morocco", 3],
        ["France", "South Africa", 1],
        ["Spain", "Senegal", 1],
        ["Spain", "Morocco", 3],
        ["Spain", "South Africa", 1],
        ["England", "Angola", 1],
        ["England", "Senegal", 1],
        ["England", "Morocco", 2],
        ["England", "South Africa", 7],
        ["South Africa", "China", 5],
        ["South Africa", "India", 1],
        ["South Africa", "Japan", 3],
        ["Angola", "China", 5],
        ["Angola", "India", 1],
        ["Angola", "Japan", 3],
        ["Senegal", "China", 5],
        ["Senegal", "India", 1],
        ["Senegal", "Japan", 3],
        ["Mali", "China", 5],
        ["Mali", "India", 1],
        ["Mali", "Japan", 3],
        ["Morocco", "China", 5],
        ["Morocco", "India", 1],
        ["Morocco", "Japan", 3],
      ],
      type: "sankey",
      name: "Sankey demo",
    },
  ],
};

const newData = [
  {
    assistanceType: "Cash Assistance",
    amount: 41,
    beneficiaryType: "Businesses",
    beneficiaryNo: 38,
  },
  {
    assistanceType: "Food Type",
    amount: 38,
    beneficiaryType: "Families",
    beneficiaryNo: 28,
  },
];

const oldData = [
  {
    assistanceType: "Cash Assistance",
    amount: 58,
    beneficiaryType: "Businesses",
    beneficiaryNo: 38,
  },
  {
    assistanceType: "Food Type",
    amount: 68,
    beneficiaryType: "Families",
    beneficiaryNo: 28,
  },
];

/*const formattedSankeyData = () => {
  const formattedData = Object.keys(sankeyData).reduce((arr, from) => {
    const weights = data[from];
    return arr.concat(Object.keys(weights).map(to => [from, to, weights[to]]));
  }, []);*/

export function getData() {
  let data = [];

  data.push({
    title: "Timeline",
    data: getRandomArray(10),
  });

  data.push({
    title: "Location",
    data: locationData,
  });

  data.push({
    title: "Channels",
    data: sankeyData,
  });

  data.push({
    title: "Sources",
    data: getRandomArray(5),
  });

  data.push({
    title: "Assistance",
    data: oldData,
  });

  data.push({
    title: "Beneficiaries",
    data: getRandomArray(17),
  });

  data.push({
    title: "Agencies",
    data: getRandomArray(8),
  });

  data.push({
    title: "Type",
    data: aidTypeData,
  });

  return data;
}

export function getNewData() {
  let data = [];

  data.push({
    title: "Timeline",
    data: getRandomArray(10),
  });

  data.push({
    title: "Location",
    data: locationData,
  });

  data.push({
    title: "Channels",
    data: sankeyData,
  });

  data.push({
    title: "Sources",
    data: getRandomArray(3),
  });

  data.push({
    title: "Assistance",
    data: newData,
  });

  return data;
}

/*import { readRemoteFile } from "react-papaparse";

function getRandomArray(numItems) {
  // Create random array of objects
  let names = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let data = [];
  for (var i = 0; i < numItems; i++) {
    data.push({
      label: names[i],
      value: Math.round(20 + 80 * Math.random()),
    });
  }
  console.log(data.length);
  return data;
}

function getRandomDateArray(numItems) {
  // Create random array of objects (with date)
  let data = [];
  let baseTime = new Date("2018-05-01T00:00:00").getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for (var i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random()),
    });
  }
  return data;
}

function getCsvData(data) {
  let finalArray = [];
  let array = [];
  for (var i = 0; i < data.length; i++) {
    array.push({
      label: data[i].label,
      value: +data[i].value,
    });
  }
  console.log(data);
  console.log(array);
  //return array;

  finalArray.push({
    title: "Visits",
    data: parseData(getCsvData),
  });

  console.log(finalArray);
  return finalArray;
}

function parseData(callback) {
  readRemoteFile(require("./data.csv"), {
    header: true,
    download: true,
    skipEmptyLines: true,
    complete: (results) => {
      console.log(results.data);
      callback(results.data);
    },
  });
}

export function getData() {
  let data = [];

  data.push({
    title: "Visits",
    data: parseData(getCsvData),
  });

  console.log(data);
  return data;
}

export function getData() {
  let data = [];

  data.push({
    title: "Visits",
    data: getRandomArray(10),
  });

  console.log(data);
  return data;
}*/
