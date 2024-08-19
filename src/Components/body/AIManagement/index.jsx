import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Stack, List, ListItem, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import Colors from '../../../helpers/colors';
import Header from '../../Basic/Header';
import Side from '../../Basic/Side';
import AICharts from './AICharts';
import DefineAIChart from './DefineAIChart';
import _range from 'lodash/range';


const backEndUrl = import.meta.env.VITE_API_URL_BACK_END_URL

const userName = 'lizCafeteria';

const AIManagement = () => {
  const [listOfChartData, setListOfChartData] = useState([]);
  const [existProducts, setExistProducts] = useState([]);

  useEffect(() => {
    setListOfChartData([]);
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
    // console.log(dataForNewChart);
    const { data } = await Axios.get(`${backEndUrl}/getLstmSales`, {
      params: {
        query: JSON.stringify(dataForNewChart),
      },
    });

    // console.log(data)

    const lineData = data;
    const XAxisData = {
      serial: _range(1, data.length + 1),
      date: data.map(day => new Date(day.date)),
    };

    const newChartData = {
      info: {
        chartId: `id_${listOfChartData.length}_${String(new Date())}`,
        name: 'מכירות',
        lineLength: data.length,
      },
      chartData: {
        lineData,
        XAxisData,
      },
      // chartData: createSaleDataToChart(dataForNewChart, data),
    };

    // console.log(newChartData);
    setListOfChartData(dataForChart => [...dataForChart, newChartData]);
  };

  const handleDeleteChart = (chartId) => {
    setListOfChartData(dataForChart => dataForChart.filter(chart => chart.info.chartId !== chartId));
  };

  return (
    <Stack height="100%" width="100%" >
      <List sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        {listOfChartData.map((dataForChart, index) => (
          <ListItem key={index} sx={{ width: '50%', height: 500, textAlign: 'center' }}>
            <AICharts dataForChart={dataForChart} handleDeleteChart={handleDeleteChart} />
          </ListItem>
        ))}

        <ListItem key={'lastItem'} sx={{ width: '50%', height: 500, textAlign: 'center' }}>
          <DefineAIChart onSubmit={handleAddChart} existProducts={existProducts} />
        </ListItem>
      </List>
    </Stack>
  );
};

export default AIManagement;
