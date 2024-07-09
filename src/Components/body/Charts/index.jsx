import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';

import Charts from './Charts';
import DefineChart from './DefineChart';
import createSaleDataToChart from './Logic';

const backEndUrl = import.meta.env.VITE_API_URL_BACK_END_URL

const userName = 'lizCafeteria';
const listOfCharts = [1];
const fakeData = {
  info: {
    chartId: `id_0_${String(new Date())}`,
    name: 'טמפרטורה',
    lineTitle: ['T'],
  },
  chartData: [
    { XAxisData: 'Jan', lineData: 30 },
    { XAxisData: 'Feb', lineData: 32 },
    { XAxisData: 'Mar', lineData: 35 },
    { XAxisData: 'Apr', lineData: 40 },
    { XAxisData: 'May', lineData: 45 },
    { XAxisData: 'Jun', lineData: 50 },
    { XAxisData: 'Jul', lineData: 55 },
    { XAxisData: 'Aug', lineData: 53 },
    { XAxisData: 'Sep', lineData: 48 },
    { XAxisData: 'Oct', lineData: 42 },
    { XAxisData: 'Nov', lineData: 36 },
    { XAxisData: 'Dec', lineData: 32 },
  ],
};

const ChartManagement = () => {
  const [listOfChartData, setListOfChartData] = useState([]);
  const [existProducts, setExistProducts] = useState([]);

  useEffect(() => {
    setListOfChartData([fakeData]);
  }, []);

  useEffect(() => {
    const getProdructsAndCategories = async (userName) => {
      const { data } = await Axios.get(`${backEndUrl}/getAllProducts`, {
        params: {
          query: JSON.stringify({ userName }),
        },
      });

      setExistProducts(data)
    };

    getProdructsAndCategories(userName);
  }, []);

  const handleAddChart = async (dataForNewChart) => {
    // const query = {
    //   ...(dataForNewChart.subject.type === 'byProduct' && { products: dataForNewChart.subject.products }),
    //   ...(dataForNewChart.subject.type === 'byCategory' && { categories: dataForNewChart.subject.categories }),
    //   startTime: dataForNewChart.relevantTime.start,
    //   endTime: dataForNewChart.relevantTime.end,
    // };

    const { data } = await Axios.get(`${backEndUrl}/getSales`, {
      params: {
        query: JSON.stringify(dataForNewChart),
      },
    });

    const newChartData = {
      info: {
        chartId: `id_${listOfChartData.length}_${String(new Date())}`,
        name: 'מכירות',
        lineTitle: ['S'],
      },
      chartData: createSaleDataToChart(dataForNewChart, data),
    };

    // console.log(newChartData);
    setListOfChartData(dataForChart => [...dataForChart, newChartData]);
  };

  const handleDeleteChart = (chartId) => {
    setListOfChartData(dataForChart => dataForChart.filter(chart => chart.info.chartId !== chartId));
  };

  return (
    <Stack>
      <List sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        {listOfChartData.map((dataForChart, index) => (
          <ListItem key={index} sx={{ width: '50%', height: 500, textAlign: 'center' }}>
            <Charts dataForChart={dataForChart} handleDeleteChart={handleDeleteChart} />
          </ListItem>
        ))}

        <ListItem key={'lastItem'} sx={{ width: '50%', height: 500, textAlign: 'center' }}>
          <DefineChart onSubmit={handleAddChart} existProducts={existProducts} />
        </ListItem>
      </List>
    </Stack>
  );
};

export default ChartManagement;
