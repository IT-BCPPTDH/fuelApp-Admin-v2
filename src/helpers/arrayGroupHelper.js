import TimeSheetJson from '../data/time-entry-data'

const dtNumbers = [
  'DT4017',
  'DT4019',
  'DT4022',
  'DT4023',
  'DT4025',
  'DT4035',
  'DT4039',
  'DT4041',
  'DT4043',
  'DT4044',
  'DT4045',
  'DT4046',
  'DT3245',
  'DT3251',
  'DT3253',
  'DT3254',
  'DT3255',
  'DT3256',
  'DT3257',
  'DT3261',
  'DT3262',
  'DT3263',
  'DT3264',
  'DT3266',
  'DT3268',
  'DT3269',
  'DT3270',
  'DT3272',
  'DT3273',
  'DT2439',
  'DT2440',
  'DT2442',
  'DT2444',
  'DT2445',
  'DT2411',
  'DT2446'
]
const dbActivity = [
  {
    Code: 'B1',
    Activity: 'Breakdown - Breakdown'
  },
  {
    Code: 'B2',
    Activity: 'Breakdown - Ground Test'
  },
  {
    Code: 'B3',
    Activity: 'Breakdown - PM Service'
  },
  {
    Code: 'B4',
    Activity: 'Breakdown - Travel Delay PLM'
  },
  {
    Code: 'S1',
    Activity: 'Idle - Rain'
  },
  {
    Code: 'S2',
    Activity: 'Idle - Slippery'
  },
  {
    Code: 'S3',
    Activity: 'Idle - SaFEty Talk'
  },
  {
    Code: 'S4',
    Activity: 'Idle - Shift Change/Prestart Check'
  },
  {
    Code: 'S5',
    Activity: 'Idle - Rest and Meal'
  },
  {
    Code: 'S6',
    Activity: 'Idle - Daily Pray'
  },
  {
    Code: 'S7',
    Activity: 'Idle - Blasting'
  },
  {
    Code: 'S8',
    Activity: 'Idle - Survey/Sample'
  },
  {
    Code: 'S9',
    Activity: 'Idle - SaFEty Fatique Test'
  },
  {
    Code: 'S10',
    Activity: 'Idle - Friday Pray'
  },
  {
    Code: 'S11',
    Activity: 'Idle - Sunday Pray'
  },
  {
    Code: 'S12',
    Activity: 'Idle - Fasting'
  },
  {
    Code: 'S13',
    Activity: 'Idle - Foggy'
  },
  {
    Code: 'S14',
    Activity: 'Idle - Public Holiday'
  },
  {
    Code: 'D1',
    Activity: 'Idle - No Operator'
  },
  {
    Code: 'D2',
    Activity: 'Idle - Operator Fatique'
  },
  {
    Code: 'D3',
    Activity: 'Idle - Waiting Operator'
  },
  {
    Code: 'D4',
    Activity: 'Idle - No Truck'
  },
  {
    Code: 'D5',
    Activity: 'Idle - No Equipment Support'
  },
  {
    Code: 'D6',
    Activity: 'Idle - Lighting Plant Problem'
  },
  {
    Code: 'D7',
    Activity: 'Idle - Washing Equipment'
  },
  {
    Code: 'D8',
    Activity: 'Idle - Front/Road/Disposal Maint.'
  },
  {
    Code: 'D9',
    Activity: 'Idle - Stokcpile Full/Crusher Maint.'
  },
  {
    Code: 'D10',
    Activity: 'Idle - No Working Area'
  },
  {
    Code: 'D11',
    Activity: 'Idle - Refuelling/Greasing'
  },
  {
    Code: 'D12',
    Activity: 'Idle - Blockade'
  },
  {
    Code: 'D13',
    Activity: 'Idle - Dust'
  },
  {
    Code: 'D14',
    Activity: 'Idle - Standby Accident'
  },
  {
    Code: 'D15',
    Activity: 'Idle - Stop Loading DT Refuelling'
  },
  {
    Code: 'D16',
    Activity: 'Idle - No Stock/Material'
  },
  {
    Code: 'D17',
    Activity: 'Idle - No Job'
  },
  {
    Code: 'D18',
    Activity: 'Idle - Others'
  },
  {
    Code: 'D19',
    Activity: 'Idle - Toilet'
  },
  {
    Code: 'D20',
    Activity: 'Idle - Queuing'
  },
  {
    Code: 'D21',
    Activity: 'Idle - No Digger'
  },
  {
    Code: 'D22',
    Activity: 'Idle - Tyre Check'
  },
  {
    Code: 'D23',
    Activity: 'Idle - Cleaning Vessel Truck'
  },
  {
    Code: 'W1',
    Activity: 'Working - Working Production - OB'
  },
  {
    Code: 'W2',
    Activity: 'Working - Working Production - OB Blast'
  },
  {
    Code: 'W3',
    Activity: 'Working - Working Production - OB Freedig'
  },
  {
    Code: 'W4',
    Activity: 'Working - Working Production - Mud Solid'
  },
  {
    Code: 'W5',
    Activity: 'Working - Working Production - Mud Liquid'
  },
  {
    Code: 'W6',
    Activity: 'Working - Working Production - TS Inpit'
  },
  {
    Code: 'W7',
    Activity: 'Working - Working Production - TS Outpit'
  },
  {
    Code: 'W8',
    Activity: 'Working - Working Production - Coal'
  },
  {
    Code: 'W9',
    Activity: 'Working - Working Production - Non Prod'
  },
  {
    Code: 'W10',
    Activity: 'Working - Coal Cleaning'
  },
  {
    Code: 'W11',
    Activity: 'Working - Pit Support'
  },
  {
    Code: 'W12',
    Activity: 'Working - General Support'
  },
  {
    Code: 'W13',
    Activity: 'Working - General Work'
  },
  {
    Code: 'W14',
    Activity: 'Working - Enviro Support'
  },
  {
    Code: 'W15',
    Activity: 'Working - Land Clearing'
  },
  {
    Code: 'W16',
    Activity: 'Working - Loading Coal at ROM'
  },
  {
    Code: 'W17',
    Activity: 'Working - Maintenance ROM Port'
  },
  {
    Code: 'W18',
    Activity: 'Working - PLM Support'
  },
  {
    Code: 'W19',
    Activity: 'Working - Test Pit'
  },
  {
    Code: 'W20',
    Activity: 'Working - Travel Blasting'
  },
  {
    Code: 'W21',
    Activity: 'Working - Travel Delay Non PLM'
  },
  {
    Code: 'W22',
    Activity: 'Working - Travel for Blasting'
  },
  {
    Code: 'W23',
    Activity: 'Working - Travel Loading Point'
  },
  {
    Code: 'W24',
    Activity: 'Working - Waiting Truck'
  },
  {
    Code: 'W25',
    Activity: 'Working - Working Support'
  },
  {
    Code: 'W26',
    Activity: 'Working - Hauling Coal to Port'
  },
  {
    Code: 'W27',
    Activity: 'Working - Dump Maintenance OB'
  },
  {
    Code: 'W28',
    Activity: 'Working - Dump Maintenance TS Inpit'
  },
  {
    Code: 'W29',
    Activity: 'Working - PIT Road Maintenance (HRM)'
  },
  {
    Code: 'W30',
    Activity: 'Working - Pit Road Maintenance'
  },
  {
    Code: 'W31',
    Activity: 'Working - PLR Maintenance'
  },
  {
    Code: 'W32',
    Activity: 'Working - Haul Road Mntc TS outpit'
  },
  {
    Code: 'W33',
    Activity: 'Working - Pit Lighting Inpit'
  },
  {
    Code: 'W34',
    Activity: 'Working - Pit Lighting OB'
  },
  {
    Code: 'W35',
    Activity: 'Working - Pit Lightning Coal'
  },
  {
    Code: 'W36',
    Activity: 'Working - Slurry Pump'
  },
  {
    Code: 'W37',
    Activity: 'Working - Blasting OB'
  },
  {
    Code: 'W38',
    Activity: 'Working - Drill & Blast Coal'
  },
  {
    Code: 'W39',
    Activity: 'Working - Drill and Blast Support'
  },
  {
    Code: 'W40',
    Activity: 'Working - Drilling for Blasting'
  },
  {
    Code: 'W41',
    Activity: 'Working - Project'
  },
  {
    Code: 'W42',
    Activity: 'Working - Rehandling Coal at ROM Port'
  },
  {
    Code: 'W43',
    Activity: 'Working - Stockpile ROM Maintenance'
  },
  {
    Code: 'W44',
    Activity: 'Working - Rehabilitation'
  },
  {
    Code: 'W45',
    Activity: 'Working - PAF Treatment'
  },
  {
    Code: 'W46',
    Activity: 'Working - CSR Activities'
  },
  {
    Code: 'W47',
    Activity: 'Working - Drop Structure'
  },
  {
    Code: 'W48',
    Activity: 'Working - Warehouse Support'
  },
  {
    Code: 'W49',
    Activity: 'Working - KPC Equipment'
  },
  {
    Code: 'W50',
    Activity: 'Working - Maintenance Groundtest'
  },
  {
    Code: 'W51',
    Activity: 'Working - Mobilization'
  },
  {
    Code: 'W52',
    Activity: 'Working - Others (diluar tanggungan DH)'
  },
  {
    Code: 'W53',
    Activity: 'Working - Rental'
  }
]
const statisCol = [
  { index: 7, activity: 'B1' },
  { index: 8, activity: 'B2' },
  { index: 9, activity: 'B3' },
  { index: 10, activity: 'B4' },
  { index: 12, activity: 'W1' },
  { index: 13, activity: 'W2' },
  { index: 14, activity: 'W3' },
  { index: 15, activity: 'W4' },
  { index: 16, activity: 'W5' },
  { index: 17, activity: 'W6' },
  { index: 18, activity: 'W7' },
  { index: 19, activity: 'W8' },
  { index: 20, activity: 'W9' },
  { index: 21, activity: 'W10' },
  { index: 22, activity: 'W11' },
  { index: 23, activity: 'W12' },
  { index: 24, activity: 'W13' },
  { index: 25, activity: 'W14' },
  { index: 26, activity: 'W15' },
  { index: 27, activity: 'W16' },
  { index: 28, activity: 'W17' },
  { index: 29, activity: 'W18' },
  { index: 30, activity: 'W19' },
  { index: 31, activity: 'W20' },
  { index: 32, activity: 'W21' },
  { index: 33, activity: 'W22' },
  { index: 34, activity: 'W23' },
  { index: 35, activity: 'W24' },
  { index: 36, activity: 'W25' },
  { index: 37, activity: 'W26' },
  { index: 38, activity: 'W27' },
  { index: 39, activity: 'W28' },
  { index: 40, activity: 'W29' },
  { index: 41, activity: 'W30' },
  { index: 42, activity: 'W31' },
  { index: 43, activity: 'W32' },
  { index: 44, activity: 'W33' },
  { index: 45, activity: 'W34' },
  { index: 46, activity: 'W35' },
  { index: 47, activity: 'W36' },
  { index: 48, activity: 'W37' },
  { index: 49, activity: 'W38' },
  { index: 50, activity: 'W39' },
  { index: 51, activity: 'W40' },
  { index: 52, activity: 'W41' },
  { index: 53, activity: 'W42' },
  { index: 54, activity: 'W43' },
  { index: 55, activity: 'W44' },
  { index: 56, activity: 'W45' },
  { index: 57, activity: 'W46' },
  { index: 58, activity: 'W47' },
  { index: 59, activity: 'W48' },
  { index: 60, activity: 'W49' },
  { index: 61, activity: 'W50' },
  { index: 62, activity: 'W51' },
  { index: 63, activity: 'W52' },
  { index: 64, activity: 'W53' },
  { index: 66, activity: 'S1' },
  { index: 67, activity: 'S2' },
  { index: 68, activity: 'S3' },
  { index: 69, activity: 'S4' },
  { index: 70, activity: 'S5' },
  { index: 71, activity: 'S6' },
  { index: 72, activity: 'S7' },
  { index: 73, activity: 'S8' },
  { index: 74, activity: 'S9' },
  { index: 75, activity: 'S10' },
  { index: 76, activity: 'S11' },
  { index: 77, activity: 'S12' },
  { index: 78, activity: 'S13' },
  { index: 79, activity: 'S14' },
  { index: 81, activity: 'D1' },
  { index: 82, activity: 'D2' },
  { index: 83, activity: 'D3' },
  { index: 84, activity: 'D4' },
  { index: 85, activity: 'D5' },
  { index: 86, activity: 'D6' },
  { index: 87, activity: 'D7' },
  { index: 88, activity: 'D8' },
  { index: 89, activity: 'D9' },
  { index: 90, activity: 'D10' },
  { index: 91, activity: 'D11' },
  { index: 92, activity: 'D12' },
  { index: 93, activity: 'D13' },
  { index: 94, activity: 'D14' },
  { index: 95, activity: 'D15' },
  { index: 96, activity: 'D16' },
  { index: 97, activity: 'D17' },
  { index: 98, activity: 'D18' },
  { index: 99, activity: 'D19' }
]

//This is working code
const convertKeysToCamelCase = data => {
  return data.map(item => {
    const newItem = {}
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        const camelCaseKey = key
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (match, char) => char.toUpperCase())
        newItem[camelCaseKey] = item[key]
      }
    }
    return newItem
  })
}

const groupDataByUnitNo = data => {
  if (!Array.isArray(data)) {
    console.error('Input data is not an array')
    return {}
  }

  const groupedData = {}

  data.forEach(item => {
    const unitNo = item.unitNo

    if (!groupedData[unitNo]) {
      groupedData[unitNo] = []
    }

    groupedData[unitNo].push(item)
  })

  return groupedData
}

const groupDataByShift = data => {
  const groupedData = {}

  data.forEach(item => {
    const shift = item.shift

    if (!groupedData[shift]) {
      groupedData[shift] = []
    }

    groupedData[shift].push(item)
  })

  return groupedData
}

const groupingUnitOperation = dtArr => {
  const unitOperation = {}

  for (const key in dtArr) {
    if (Object.hasOwnProperty.call(dtArr, key)) {
      const element = dtArr[key]
      if (dtNumbers.includes(key)) {
        unitOperation[key] = groupDataByShift(element)
      }
    }
  }

  let shiftDayData = []
  let shiftNightData = []

  for (const key in unitOperation) {
    if (Object.hasOwnProperty.call(unitOperation, key)) {
      const element = unitOperation[key]
      shiftDayData[key] = element.D
      shiftNightData[key] = element.N
    }
  }

  return {
    dataDay: shiftDayData,
    dataNight: shiftNightData
  }
}

function getIndexByActivity (activity) {
  const entry = statisCol.find(entry => entry.activity === activity)
  return entry ? entry.index : null
}
function getActivityCode (activityValue) {
  for (const activity of dbActivity) {
    if (activity.Activity.includes(activityValue)) {
      return activity.Code
    }
  }
  return null
}

const createFinalData = dataDay => {
  const groupedData = [];

  for (const key in dataDay) {
    if (Object.hasOwnProperty.call(dataDay, key)) {
      const element = dataDay[key];
      const myArray = ['-'.repeat(111)];

      const activityDurations = {};

      element.forEach(ele => {
        let dataAct = ele.activity;
        if (ele.activity.includes('Working Production')) {
          dataAct = ele.activity + ' - ' + ele.material;
        }
        const indexAct = getIndexByActivity(getActivityCode(dataAct));

        if (activityDurations[indexAct] === undefined) {
          activityDurations[indexAct] = ele.duration;
        } else {
          activityDurations[indexAct] += ele.duration;
        }

        myArray[0] = ele.unitNo;
        myArray[1] = ele.productModel;
        myArray[2] = ele.productionDate;
        myArray[3] = ele.loc;
        myArray[4] = ele.shift;
        myArray[5] = ele.operatorId;
        myArray[6] = ele.operatorName;
        myArray[indexAct] = parseFloat(activityDurations[indexAct] / 100, 2);
        myArray[105] = ele.smuStart;
        myArray[106] = ele.smuFinish;
        myArray[107] = ele.hm;
      });

      groupedData.push(myArray);
    }
  }

  return groupedData;
};

export function getTimeSheetData () {
  // const keyStructure = [
  //   'unitNo',
  //   'productModel',
  //   'productionDate',
  //   'loc',
  //   'shift',
  //   'operatorId',
  //   'operatorName',
  //   ...Array.from({ length: 4 }, (_, i) => `B${i + 1}`),
  //   'Total',
  //   ...Array.from({ length: 53 }, (_, i) => `W${i + 1}`),
  //   'Total WH',
  //   ...Array.from({ length: 14 }, (_, i) => `S${i + 1}`),
  //   'Total SPO',
  //   ...Array.from({ length: 23 }, (_, i) => `D${i + 1}`),
  //   'Total N-SPO',
  //   'Check',
  //   'Variance'
  // ]

  // console.log(keyStructure)
  const dataNya = TimeSheetJson
  let dataTS = convertKeysToCamelCase(dataNya)
  dataTS = groupDataByUnitNo(dataTS)
  dataTS = groupingUnitOperation(dataTS)

  const dataDay = createFinalData(dataTS.dataDay)
  const dataNight = createFinalData(dataTS.dataNight)

  return [...dataDay, ...dataNight]
}