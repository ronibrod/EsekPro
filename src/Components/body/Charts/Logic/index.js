const createSaleDataToChart = (definitionData, saleData) => {
  const chartData = [];

  if (definitionData.XAxis.type === 'bySequence') {
    const listOfTimeByDivision = createListOfTimeByDivision(definitionData.relevantTime, definitionData.XAxis.timeRelations);

    const listOfSalesByTimeDivision = listOfTimeByDivision.map(time => {
      const listOfSales = [];

      saleData.forEach(sale => {
        if (time.startTime <= new Date(sale.date) && time.endTime >= new Date(sale.date)) {
          listOfSales.push(sale);
        }
      });

      return { time, listOfSales };
    });

    listOfSalesByTimeDivision.forEach(salesInTime => {
      chartData.push({
        lineData: salesInTime.listOfSales.length,
        XAxisData: salesInTime.time.timeDisplay,
      });
    });
  }

  if (definitionData.XAxis.type === 'byPeriod') {
    const listOfSalesByTimeDivision = createListOfsalesByAverage(definitionData.XAxis.timeDivision, saleData);

    listOfSalesByTimeDivision.forEach(salesInTime => {

      chartData.push({
        lineData: salesInTime.listOfSales.length,
        XAxisData: salesInTime.time,
      });
    });
  }

  return chartData;
};

const createListOfTimeByDivision = (relevantTime, division) => {
  let currentTime = relevantTime.start;

  let timeDisplay = 1;
  const listOfTimeByDivision = [];
  while (currentTime < relevantTime.end) {
    let nextTime = new Date(currentTime);

    switch (division) {
      case 'hourly':
        nextTime.setHours(currentTime.getHours() + 1);
        // timeDisplay = String(currentTime.getHours());
        break;
      case 'daily':
        nextTime.setDate(currentTime.getDate() + 1);
        // timeDisplay = String(currentTime.getDate());
        break;
      case 'weekly':
        nextTime.setDate(currentTime.getDate() + 7);
        // timeDisplay = String(currentTime.getDate());
        break;
      case 'monthly':
        nextTime.setMonth(currentTime.getMonth() + 1);
        // timeDisplay = String(currentTime.getMonth());
        break;
      case 'yearly':
        nextTime.setFullYear(currentTime.getFullYear() + 1);
        // timeDisplay = String(currentTime.getFullYear());
        break;
      default:
        nextTime.setDate(currentTime.getDate() + 1);
        // timeDisplay = String(currentTime.getDate());
        break;
    };


    listOfTimeByDivision.push({
      startTime: currentTime,
      endTime: nextTime,
      timeDisplay,
    });

    timeDisplay += 1;
    currentTime = new Date(nextTime);
  };

  return listOfTimeByDivision;
};

const createListOfsalesByAverage = (division, saleData) => {
  const salesInTime = [];

  if (division === 'hours') {
    for (let hour = 1; hour <= 24; hour += 1) {
      const salesByHour = saleData.filter(sale => (new Date(sale.date).getHours() + 21) % 24 === hour); // because time UTC
      salesInTime.push({
        listOfSales: salesByHour,
        time: hour,
      });
    }
  }
  if (division === 'days') {
    for (let day = 1; day <= 7; day += 1) {
      const salesByDay = saleData.filter(sale => new Date(sale.date).getDay() + 1 === day);
      salesInTime.push({
        listOfSales: salesByDay,
        time: day,
      });
    }
  }
  if (division === 'months') {
    for (let month = 1; month <= 12; month += 1) {
      const salesByMonth = saleData.filter(sale => new Date(sale.date).getMonth() + 1 === month);
      salesInTime.push({
        listOfSales: salesByMonth,
        time: month,
      });
    }
  }

  return salesInTime;
};

export default createSaleDataToChart;
