import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { List, ListItem, Stack } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import _range from 'lodash/range';
import Charts from './Charts';
import DefineChart from './DefineChart';
import Colors from '../../../helpers/colors';
import './styles.css';

const EsekDBUrl = import.meta.env.VITE_API_URL_ESEK_DB;
const userName = 'lizCafeteria';

const ChartManagement = () => {
  const [listOfChartData, setListOfChartData] = useState([]);
  const [existProducts, setExistProducts] = useState([]);

  useEffect(() => {
    const getProductsAndCategories = async (userName) => {
      try {
        const { data } = await Axios.get(`${EsekDBUrl}/getAllProducts`, {
          params: {
            query: JSON.stringify({ userName }),
          },
        });
        setExistProducts(data);
      } catch (error) {
        console.error('Error fetching products and categories:', error);
      }
    };

    getProductsAndCategories(userName);
  }, []);

  const handleAddChart = async (dataForNewChart) => {
    try {
      const { data } = await Axios.get(`${EsekDBUrl}/getSales`, {
        params: {
          query: JSON.stringify(dataForNewChart),
        },
      });

      const lineData = data;
      const XAxisData = _range(1, data.length + 1);

      const newChartData = {
        info: {
          chartId: `id_${listOfChartData.length}_${String(new Date())}`,
          name: 'מכירות',
          lineTitle: ['S'],
        },
        chartData: {
          lineData,
          XAxisData,
        },
      };

      setListOfChartData((dataForChart) => [...dataForChart, newChartData]);
    } catch (error) {
      console.error('Error adding chart:', error);
    }
  };

  const handleDeleteChart = (chartId) => {
    setListOfChartData((dataForChart) => dataForChart.filter((chart) => chart.info.chartId !== chartId));
  };

  return (
    <Stack height="100%" width="100%">
      <List sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        <TransitionGroup component={null}>
          {listOfChartData.map((dataForChart, index) => (
            <CSSTransition key={dataForChart.info.chartId} timeout={500} classNames="flip">
              <ListItem key={index} sx={{ width: '50%', height: 500, textAlign: 'center' }}>
                <Charts dataForChart={dataForChart} handleDeleteChart={handleDeleteChart} />
              </ListItem>
            </CSSTransition>
          ))}

          <CSSTransition key="lastItem" timeout={500} classNames="flip">
            <ListItem key={'lastItem'} sx={{ width: '50%', height: 500, textAlign: 'center' }}>
              <DefineChart onSubmit={handleAddChart} existProducts={existProducts} />
            </ListItem>
          </CSSTransition>
        </TransitionGroup>
      </List>
    </Stack>
  );
};

export default ChartManagement;
