export const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4bc0c0", "#813405"];

export const convertUnicode = (input) => {
  return input.replace(/\\u(\w{4,4})/g, function (a, b) {
    var charcode = parseInt(b, 16);
    return String.fromCharCode(charcode);
  });
};

export const convertValue = (input) => {
  return Math.abs(Number(input)) >= 1.0e9
    ? (Math.abs(Number(input)) / 1.0e9).toFixed(1) + " B"
    : Math.abs(Number(input)) >= 1.0e6
    ? (Math.abs(Number(input)) / 1.0e6).toFixed(1) + " M"
    : Math.abs(Number(input)) >= 1.0e3
    ? (Math.abs(Number(input)) / 1.0e3).toFixed(1) + " K"
    : Math.abs(Number(input));
};

export const convertToString = (input) => {
  return String(input);
};

export const parseInteger = (input) => {
  return input === "No data"
    ? sentenceCase(input)
    : "₱" + parseInt(input).toLocaleString();
};

export const calculatePercent = (a, b) => {
  return ((a / b) * 100).toFixed(1) + "%";
};

// source: https://love2dev.com/blog/javascript-touppercase-tolowercase/
export const sentenceCase = (str) => {
  str = convertToString(str);

  return str
    .toLowerCase()
    .replace(/[a-z]/i, (letter) => {
      return letter.toUpperCase();
    })
    .trim();
};

// source: https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/
export function titleCase(str) {
  str = str.split(" ");
  for (var i = 0; i < str.length; i++) {
    if (str[i] !== "and" && str[i] !== "the" && str[i] !== "4Ps") {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
  }
  return str.join(" ");
}

export const calculateTotal = (data, filter) => {
  return data
    .filter(({ aidCategory }) => aidCategory === convertToString(filter))
    .reduce((total, item) => total + parseInt(item.value), 0);
};

export const CreateArrayAidCategory = (data) => {
  let newArray = [];
  data.reduce(function (res, item) {
    if (!res[item.aidCategory]) {
      res[item.aidCategory] = {
        index: parseInt(item.index),
        aidCategory: item.aidCategory,
        aidCategoryCode: item.aidCategoryCode,
        value: 0,
      };
      newArray.push(res[item.aidCategory]);
    }
    res[item.aidCategory].value += parseInt(item.value);
    return res;
  }, {});
  return newArray;
};

export const CreateArrayAidType = (data) => {
  let newArray = [];
  data.reduce(function (res, item) {
    if (!res[item.aidType]) {
      res[item.aidType] = {
        index: item.index,
        label: item.aidType,
        link: item.link,
        value: 0,
      };
      newArray.push(res[item.aidType]);
    }
    res[item.aidType].value += parseInt(item.value);
    return res;
  }, {});
  return newArray;
};

export const CreateArrayAgencyType = (data) => {
  let newArray = [];
  data.reduce(function (res, item) {
    if (!res[item.agency]) {
      res[item.agency] = {
        index: item.index,
        label: item.agency,
        agencyAllocated: 0,
        agencyUsed: 0,
      };
      newArray.push(res[item.agency]);
    }
    res[item.agency].agencyAllocated += parseInt(item.agencyAllocated);
    res[item.agency].agencyUsed += parseInt(item.value);

    return res;
  }, {});
  return newArray;
};

export const CreateArrayBeneficiaryType = (data) => {
  let newArray = [];
  data.reduce(function (res, item) {
    if (!res[item.beneficiaryCategory]) {
      res[item.beneficiaryCategory] = {
        label: titleCase(item.beneficiaryCategory),
        // Number of beneficiaries
        beneficiaryValue: 0,
        // Total amount of aid type
        value: 0,
      };
      newArray.push(res[item.beneficiaryCategory]);
    }
    res[item.beneficiaryCategory].value += parseInt(item.value);
    res[item.beneficiaryCategory].beneficiaryValue += parseInt(
      item.beneficiaryValue
    );
    return res;
  }, {});
  return newArray;
};

export const CreateArrayLocation = (data) => {
  let newArray = [];
  data.reduce(function (res, item) {
    if (!res[item.region]) {
      res[item.region] = {
        label: item.region,
        value: 0,
      };
      newArray.push(res[item.region]);
    }
    res[item.region].value += parseInt(item.value);
    return res;
  }, {});
  return newArray;
};

export const CreateArrayChannels = (data) => {
  let newArray = [];
  data.map((d) =>
    newArray.push(new Array(d.aidCategory, d.from, d.to, parseInt(d.weight)))
  );
  return newArray;
};

// Accepts the array and key
export const GroupBy = (array, key) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, []); // empty object is the initial value for result object
};

export const getNewData = (data, aidCategoryItem) => {
  let newArray = [];
  data
    .filter(
      ({ aidCategory }) =>
        aidCategory === convertToString(aidCategoryItem).toLowerCase()
    )
    .map((item) =>
      newArray.push({
        agency: item.agency,
        date: item.date,
        aidType: item.aidType,
        beneficiaryType: item.beneficiaryType,
        value: item.value,
        beneficiaryValue: item.beneficiaryValue,
        shareOfPop: item.shareOfPop,
        link: item.link,
        region: item.region,
        agencyAllocated: item.agencyAllocated,
        agencyUsed: item.agencyUsed,
        agencyStatus: item.agencyStatus,
        from: item.from,
        to: item.to,
        weight: item.weight,
        beneficiaryCategory: item.beneficiaryCategory,
        infoText: item.infoText,
        assistanceType: item.assistanceType,
      })
    );
  return newArray;
};
