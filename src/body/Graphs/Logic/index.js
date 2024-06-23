const createSaleDataToChart = (definitionData, saleData) => {
  const chartData = [];
  // console.log('definitionData: ', definitionData);
  // console.log('saleData: ', saleData);

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

  if (definitionData.XAxis.type === 'byFrequency') {
    listOfSalesByTimeDivision.forEach(salesInTime => {
      chartData.push({
        lineData: salesInTime.listOfSales.length,
        XAxisData: salesInTime.time.timeDisplay,
      });
    });
  }

  return chartData;
};

const createListOfTimeByDivision = (relevantTime, division) => {
  let currentTime = relevantTime.start;

  const listOfTimeByDivision = [];
  while (currentTime < relevantTime.end) {
    let nextTime = new Date(currentTime);
    let timeDisplay;

    switch (division) {
      case 'hourly':
        nextTime.setHours(currentTime.getHours() + 1);
        timeDisplay = String(currentTime.getHours());
        break;
      case 'daily':
        nextTime.setDate(currentTime.getDate() + 1);
        timeDisplay = String(currentTime.getDate());
        break;
      case 'weekly':
        nextTime.setDate(currentTime.getDate() + 7);
        timeDisplay = String(currentTime.getDate());
        break;
      case 'monthly':
        nextTime.setMonth(currentTime.getMonth() + 1);
        timeDisplay = String(currentTime.getMonth());
        break;
      case 'yearly':
        nextTime.setFullYear(currentTime.getFullYear() + 1);
        timeDisplay = String(currentTime.getFullYear());
        break;
      default:
        nextTime.setDate(currentTime.getDate() + 1);
        timeDisplay = String(currentTime.getDate());
        break;
    };

    listOfTimeByDivision.push({
      startTime: currentTime,
      endTime: nextTime,
      timeDisplay,
    });

    currentTime = new Date(nextTime);
  };

  return listOfTimeByDivision;
};

export default createSaleDataToChart;
