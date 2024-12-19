import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Stack, List, ListItem, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import Colors from '../../../helpers/colors';
import Header from '../../Basic/Header';
import Side from '../../Basic/Side';
import _range from 'lodash/range';
import AICharts from './AICharts';
import DefineAIChart from './DefineAIChart';
import SystemUnderConstructionDialog from '../../Dialogs/SystemUnderConstruction';

const EsekAIUrl = import.meta.env.VITE_API_URL_ESEK_AI
const EsekDBUrl = import.meta.env.VITE_API_URL_ESEK_DB

const userName = 'lizCafeteria';

const AIManagement = () => {
  const [listOfChartData, setListOfChartData] = useState([]);
  const [existProducts, setExistProducts] = useState([]);
  const [addChartFailed, setAddChartFailed] = useState(false);

  useEffect(() => {
    setListOfChartData([]);
  }, []);

  useEffect(() => {
    const getProdructsAndCategories = async (userName) => {
      const { data } = await Axios.get(`${EsekDBUrl}/getAllProducts`, {
        params: {
          query: JSON.stringify({ userName }),
        },
      });

      setExistProducts(data)
    };

    getProdructsAndCategories(userName);
  }, []);

  const handleAddChart = async (dataForNewChart) => {
    try {
      const { data } = await Axios.get(`${EsekAIUrl}/getLstmSales`, {
        params: {
          query: JSON.stringify(dataForNewChart),
        },
      });

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

      setListOfChartData(dataForChart => [...dataForChart, newChartData]);
    } catch (error) {
      setAddChartFailed(true);
    }
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

        {
          addChartFailed &&
          <SystemUnderConstructionDialog onClose={() => setAddChartFailed(false)} />
        }
      </List>
    </Stack>
  );
};

export default AIManagement;
