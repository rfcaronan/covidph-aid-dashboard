/* source: Accessible colors https://www.nature.com/articles/nmeth.1618
#cc79a7 rgb(204, 121, 167) reddish purple
#d55e00 rgb(213, 94, 0) vermillion
#0071b2 rgb(0, 113, 178) blue
#f0e442 rgb(240, 228, 66) yellow
#009e74 rgb(0, 158, 116) bluish green
#56b3e9 rgb(86, 179, 233) sky blue
#e69d00 rgb(230, 157, 0) orange
#000000 rgb(0,0,) black


Main colors
#17a2b8 rgb(23, 162, 184) blue green
#0D98BA rgb(13,152,186) blue green
#af3b6e rgb(175, 59, 152) dark pink
#BA3716 rgb(186,55,22) red orange

*/

export const colors = [
  "#0071b2",
  "#e69d00",
  "#f0e442",
  "#cc79a7",
  "#d55e00",
  "#000000",
];

export const convertUnicode = (input) => {
  return input.replace(/\\u(\w{4,4})/g, function (a, b) {
    let charcode = parseInt(b, 16);
    return String.fromCharCode(charcode);
  });
};

export const oneDecimalPlace = (input) => {
  return parseFloat(input).toFixed(1);
};

export const convertValue = (input) => {
  return Math.abs(Number(input)) >= 1.0e9
    ? oneDecimalPlace(Math.abs(Number(input)) / 1.0e9) + "B"
    : Math.abs(Number(input)) >= 1.0e6
    ? oneDecimalPlace(Math.abs(Number(input)) / 1.0e6) + "M"
    : Math.abs(Number(input)) >= 1.0e3
    ? oneDecimalPlace(Math.abs(Number(input)) / 1.0e3) + "K"
    : Math.abs(Number(input));
};

export const convertToString = (input) => {
  return String(input);
};

export const convertToBold = (input) => {
  return input.bold();
};

export const parseInteger = (input) => {
  return input === "No data"
    ? sentenceCase(input)
    : parseFloat(input).toLocaleString();
};

export const parseIntegerMoney = (input) => {
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
  for (let i = 0; i < str.length; i++) {
    if (
      str[i] !== "and" &&
      str[i] !== "the" &&
      str[i] !== "of" &&
      str[i] !== "4Ps"
    ) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
  }
  return str.join(" ");
}

export function lowerCase(str) {
  str = str.split(" ");
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== "4Ps" && str[i] !== "LGUs") {
      str[i] = str[i].charAt(0).toLowerCase() + str[i].slice(1);
    }
  }
  return str.join(" ");
}

export const calculateTotal = (data, filter) => {
  return data
    .filter(({ aidCategory }) => aidCategory === convertToString(filter))
    .reduce((total, item) => total + parseInt(item.value), 0);
};

export const CreateArrayDate = (data) => {
  let newArray = [];

  data.reduce(function (res, item) {
    if (!res[item.date]) {
      res[item.date] = {
        index: item.index,
        label: new Date(item.date),
        //amount: 0,
        value: 0,
      };
      newArray.push(res[item.date]);
    }
    res[item.date].value += parseInt(item.value);
    //res[item.date].value += parseInt(item.shareOfTotalBudget);
    return res;
  }, {});
  newArray.sort(function (a, b) {
    return b.label - a.label;
  });
  return newArray;
};

// Generate total value for

export const myFunc = (total, num) => {
  return total + num;
};

// Filter this.state.data to generate total value for each aid category
export const CreateArrayAidCategory = (data) => {
  let newArray = [];
  data.reduce(function (res, item) {
    if (!res[item.aidCategory]) {
      res[item.aidCategory] = {
        index: parseInt(item.index),
        aidCategory: item.aidCategory,
        aidCategoryCode: item.aidCategoryCode,
        aidType: item.aidType,
        value: 0,
      };
      newArray.push(res[item.aidCategory]);
    }
    res[item.aidCategory].value += parseFloat(item.value);
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
    res[item.aidType].value += parseFloat(item.value);
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
        agencyName: item.agencyName,
        agencyAllocated: 0,
        agencyUsed: 0,
        value: 0,
      };
      newArray.push(res[item.agency]);
    }
    res[item.agency].agencyAllocated += parseFloat(item.agencyAllocated);
    res[item.agency].agencyUsed += parseFloat(item.value);
    res[item.agency].value += parseFloat(item.value);

    return res;
  }, {});
  return newArray;
};

export const CreateArrayBeneficiaryCategory = (data) => {
  let newArray = [];
  data.reduce(function (res, item) {
    if (!res[item.beneficiaryCategory]) {
      res[item.beneficiaryCategory] = {
        index: item.index,
        link: item.link,
        label: item.beneficiaryCategory,
        value: 0,
      };
      newArray.push(res[item.beneficiaryCategory]);
    }
    res[item.beneficiaryCategory].value += parseFloat(item.value);
    return res;
  }, {});
  return newArray;
};

export const CreateArrayBeneficiaryType = (data) => {
  let newArray = [];
  data.reduce(function (res, item) {
    if (!res[item.beneficiaryType]) {
      res[item.beneficiaryType] = {
        index: item.index,
        assistanceType: item.assistanceType,
        infoText: item.assistanceType + ": " + item.infoText,
        beneficiaryType: titleCase(item.beneficiaryType),
        link: item.link,
        label: item.beneficiaryCategory,
        shareOfPop:
          item.shareOfPop === "no data"
            ? sentenceCase(item.shareOfPop)
            : oneDecimalPlace(item.shareOfPop) + "%",
        // Number of beneficiaries
        beneficiaryValue: 0,
        // Total amount of aid type
        value: 0,
      };
      newArray.push(res[item.beneficiaryType]);
    }
    res[item.beneficiaryType].value += parseFloat(item.value);
    res[item.beneficiaryType].beneficiaryValue += parseInt(
      item.beneficiaryValue
    );
    return res;
  }, {});
  return newArray;
};

export const CreateArrayLocation = (data) => {
  let newArray = [];
  data
    .filter(({ region }) => region !== "")
    .reduce(function (res, item) {
      if (!res[item.region]) {
        res[item.region] = {
          label: item.region,
          value: 0,
        };
        newArray.push(res[item.region]);
      }
      res[item.region].value += parseFloat(item.value);
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

export const getNewDataAidCategory = (data, filterItem) => {
  let newArray = [];
  data
    .filter(
      ({ aidCategory }) =>
        aidCategory === convertToString(filterItem).toLowerCase()
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

export const getNewDataAidType = (data, filterItem) => {
  let newArray = [];
  data
    .filter(
      ({ aidType }) => aidType === convertToString(filterItem).toLowerCase()
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

export const getNewDataAgency = (data, filterItem) => {
  let newArray = [];
  data
    .filter(({ agency }) => agency === convertToString(filterItem))
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

export const getNewDataBeneficiary = (data, filterItem) => {
  let newArray = [];
  data
    .filter(
      ({ beneficiaryType }) => beneficiaryType === convertToString(filterItem)
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

export const getNewDataLocation = (data, filterItem) => {
  let newArray = [];
  data
    .filter(({ region }) => region === convertToString(filterItem))
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
