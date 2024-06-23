import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';

import TemperatureChart from './TemperatureChart';
import DefineChart from './DefineChart';
import createSaleDataToChart from './Logic';

const backEndUrl = import.meta.env.VITE_API_URL_BACK_END_URL

const userName = 'lizCafeteria';
const listOfGraphs = [1];
const fakeData = [
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
];

const Graphs = () => {
  const [dataForChart, setDataForChart] = useState([]);
  const [existProducts, setExistProducts] = useState([]);

  useEffect(() => {
    setDataForChart([fakeData]);
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
    const query = {
      ...(dataForNewChart.subject.type === 'byProduct' && { products: dataForNewChart.subject.products }),
      ...(dataForNewChart.subject.type === 'byCategory' && { categories: dataForNewChart.subject.categories }),
      startTime: dataForNewChart.relevantTime.start,
      endTime: dataForNewChart.relevantTime.end,
    };

    const { data } = await Axios.get(`${backEndUrl}/getSales`, {
      params: {
        query: JSON.stringify(query),
      },
    });

    console.log(dataForNewChart, data);

    const newChartData = createSaleDataToChart(dataForNewChart, data);

    console.log(newChartData);
    setDataForChart(dataForChart => [...dataForChart, newChartData]);
  };

  return (
    <Stack bgcolor={grey[500]}>
      <List sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        {dataForChart.map((chartData, index) => (
          <ListItem key={index} sx={{ width: '50%', height: 500, textAlign: 'center' }}>
            <TemperatureChart chartData={chartData} />
          </ListItem>
        ))}

        <ListItem key={'lastItem'} sx={{ width: '50%', height: 500, textAlign: 'center' }}>
          <DefineChart onSubmit={handleAddChart} existProducts={existProducts} />
        </ListItem>
      </List>
    </Stack>
  );
};

export default Graphs;
