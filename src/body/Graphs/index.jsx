import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';

import TemperatureChart from './TemperatureChart';
import DefineChart from './DefineChart'

const backEndUrl = import.meta.env.VITE_API_URL_BACK_END_URL

const userName = 'lizCafeteria';
const listOfGraphs = [1];
const fakeData = [
  { month: 'Jan', temperature: 30 },
  { month: 'Feb', temperature: 32 },
  { month: 'Mar', temperature: 35 },
  { month: 'Apr', temperature: 40 },
  { month: 'May', temperature: 45 },
  { month: 'Jun', temperature: 50 },
  { month: 'Jul', temperature: 55 },
  { month: 'Aug', temperature: 53 },
  { month: 'Sep', temperature: 48 },
  { month: 'Oct', temperature: 42 },
  { month: 'Nov', temperature: 36 },
  { month: 'Dec', temperature: 32 },
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
    setDataForChart(dataForChart => [...dataForChart, fakeData]);

    const query = {
      ...(dataForNewChart.subject.type === 'byProduct' && { products: dataForNewChart.subject.products }),
      ...(dataForNewChart.subject.type === 'byCategory' && { categories: dataForNewChart.subject.categories }),
      startTime: dataForNewChart.relevantTime.start,
      endTime: dataForNewChart.relevantTime.end,
    };

    console.log(dataForNewChart);

    const { data } = await Axios.get(`${backEndUrl}/getSales`, {
      params: {
        query: JSON.stringify(query),
      },
    });

    console.log(data);
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
