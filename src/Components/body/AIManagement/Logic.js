const getChartSeriesByTimeDiv = (XAxisData, chartSeries, timeDiv) => {
  const daysMap = new Map(); // To store the first occurrence of each time division
  const chartSeriesByTimeDiv = {};
  chartSeries.forEach(unit => (chartSeriesByTimeDiv[unit.id] = new Map()));
  // console.log(chartSeries);
  XAxisData.forEach((date, index) => {
    let key;
    switch (timeDiv) {
      case 'daily':
        key = date.toISOString().split('T')[0]; // yyyy-mm-dd
        break;
      case 'weekly':
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay()); // Start of the week
        key = startOfWeek.toISOString().split('T')[0];
        break;
      case 'monthly':
        key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`; // yyyy-mm
        break;
      case 'yearly':
        key = date.getFullYear().toString(); // yyyy
        break;
      default:
        throw new Error(`Invalid timeDiv: ${timeDiv}`);
    }
    daysMap.set(key, date);

    chartSeries.forEach(unit => {
      // console.log(chartSeriesByTimeDiv);
      if (!chartSeriesByTimeDiv[unit.id].has(key)) {
        chartSeriesByTimeDiv[unit.id].set(key, 0);
      }
      // console.log(unit);

      chartSeriesByTimeDiv[unit.id].set(key, chartSeriesByTimeDiv[unit.id].get(key) + unit.data[index]);
    });
  });

  // console.log(chartSeriesByTimeDiv);

  // console.log(Object.entries(chartSeriesByTimeDiv));
  const data = {};
  Object.entries(chartSeriesByTimeDiv).map(([key, value]) => {
    data[key] = Array.from(value.values());
  });
  return {
    XAxisData: Array.from(daysMap.values()),
    data: data
};
};

export { getChartSeriesByTimeDiv };
