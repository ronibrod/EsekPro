import React, { useState } from 'react';
import { LineChart, lineElementClasses, markElementClasses } from '@mui/x-charts/LineChart';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { Box, IconButton, Paper, ToggleButton, ToggleButtonGroup, Typography, Slider, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import SelectChartIcon from '@mui/icons-material/ShowChart';
import Colors from '../../../helpers/colors';

const minDistance = 4;

const lighterColors = [
  '#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D',
  '#D4A5A5', '#797F9A', '#31A2AC', '#61C0BF',
  '#AB8256', '#D9BF77', '#ACD8AA', '#FFE176'
];

const Charts = ({ dataForChart, handleDeleteChart }) => {
  const { info, chartData } = dataForChart;

  const [chartType, setChartType] = useState('line');
  const [value, setValue] = useState([0, chartData.length]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectChartType, setSelectChartType] = useState('line');
  const [showSlider, setShowSlider] = useState(false);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], chartData.length - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // const toggleSelectChartType = () => {
  //   setSelectChartType((selectChartType + 1) % 4);
  // };

  const handleChartType = (event, newChartType) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  const toggleSlider = () => {
    setShowSlider(!showSlider);
  };

  const pieData = chartData.lineData.map((item, index) => ({
    id: String(item, index),
    value: item,
    label: String(index),
    color: lighterColors[index % lighterColors.length],
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: isFullScreen ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        zIndex: isFullScreen ? 1000 : 1,
        backgroundColor: isFullScreen ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
      }}
    >
      <Paper sx={{
        width: isFullScreen ? '80%' : '100%',
        height: isFullScreen ? 'auto' : '100%',
        padding: 2,
        position: isFullScreen ? 'fixed' : 'relative',
        overflow: 'auto',
        bgcolor: Colors[10],
        borderRadius: 2,
        boxShadow: 5,
      }}>
        <Stack direction='row' justifyContent='space-between' justifyItems='center' alignItems='center'>
          <IconButton color="primary" onClick={() => handleDeleteChart(info.chartId)}>
            <CloseIcon />
          </IconButton>

          <Typography variant="h5">
            {info.name}
          </Typography>

          <IconButton color="primary" onClick={toggleFullScreen}>
            {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Stack>

        <Stack>
          <Stack dir='ltr'>
            {
              selectChartType === 'line' &&
              <LineChart
                height={350}
                series={[{ data: chartData.lineData, label: info.lineTitle[0], id: 'lineDataId' }]}
                xAxis={[{ scaleType: 'point', data: chartData.XAxisData }]}
                grid={{ vertical: true, horizontal: true }}
                sx={{
                  [`.${lineElementClasses.root}`]: { strokeWidth: 1 },
                  '.MuiLineElement-series-lineDataId': { strokeWidth: (chartData.length > 50 ? 0.4 : 1) },
                  [`.${markElementClasses.root}`]: { display: 'none' },
                }}
              />
            }

            {
              selectChartType === 'pie' &&
              <PieChart
                height={350}
                series={[
                  {
                    data: pieData,
                    id: 'pieDataId',
                    arcLabel: (item) => `${item.label}(${item.value})`,
                    highlightScope: { highlighted: 'item', faded: 'global' },
                    arcLabelMinAngle: 1,
                    innerRadius: 25,
                    outerRadius: 160,
                    paddingAngle: 0,
                    cornerRadius: 3,
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'black',
                    fontSize: 10,
                  },
                }}
              />
            }

            {
              selectChartType === 'bar' &&
              <BarChart
                height={350}
                series={[{ data: chartData.lineData, label: info.lineTitle[0], id: 'barDataId' }]}
                xAxis={[{ scaleType: 'band', data: chartData.XAxisData }]}
                grid={{ vertical: true, horizontal: true }}
                sx={{
                  '& .MuiBar-root': { strokeWidth: 1 },
                }}
              />
            }

            {
              selectChartType === 'scatter' &&
              <ScatterChart
                height={350}
                series={[{ data: chartData.lineData.map((d, i) => ({ x: chartData.XAxisData[i], y: d })), label: info.lineTitle[0], id: 'scatterDataId' }]}
                xAxis={[{ scaleType: 'point', data: chartData.XAxisData }]}
                grid={{ vertical: true, horizontal: true }}
                sx={{
                  '& .MuiScatter-root': { strokeWidth: 1 },
                }}
              />
            }
          </Stack>

          <Stack alignItems='start'>
            <Stack direction="row" width='100%' alignItems="center" display='flex'>
              <Stack direction="row" width='100%' alignItems="center">
                <IconButton color="primary" onClick={toggleSlider}>
                  <TuneIcon />
                </IconButton>
              </Stack>

              <Stack direction="row" width='100%' justifyContent="center">
                <Stack dir='ltr'>
                  <ToggleButtonGroup
                    value={chartType}
                    exclusive
                    onChange={handleChartType}
                    aria-label="chart type"
                  >
                    {['bar', 'line', 'scatter', 'pie'].map((type) => (
                      <ToggleButton key={type} value={type} width={5} onClick={() => setSelectChartType(type)}>
                        {type}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Stack>
              </Stack>

              {/* {
                  <IconButton color="primary" onClick={toggleSelectChartType}>
                    <SelectChartIcon />
                  </IconButton>
                } */}
            </Stack>
          </Stack>

          {
            showSlider && (
              <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={chartData.length}
                sx={{
                  mx: 'auto',
                  height: 2,
                  width: '70%',
                  color: grey[700],
                  '& .MuiSlider-thumb': {
                    width: 4,
                    height: 16,
                    borderRadius: 0,
                    backgroundColor: grey[500],
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: grey[900],
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: grey[700],
                  },
                  '& .MuiSlider-valueLabel': {
                    backgroundColor: grey[700],
                    color: 'white',
                  },
                }}
              />
            )
          }
        </Stack>
      </Paper>
    </Box >
  );
};

export default Charts;
