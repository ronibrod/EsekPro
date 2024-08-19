import * as XLSX from 'xlsx';
import React, { useState, useEffect } from 'react';
import { LineChart, lineElementClasses, markElementClasses } from '@mui/x-charts/LineChart';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { Box, Button, ButtonGroup, ToggleButton, ToggleButtonGroup, IconButton, Paper, Typography, Slider, Stack, TextField, InputAdornment, Popover, FormControlLabel, Checkbox } from '@mui/material';
import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import CheckIcon from '@mui/icons-material/Check';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import SelectChartIcon from '@mui/icons-material/ShowChart';
import StraightenIcon from '@mui/icons-material/Straighten';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import TimelineIcon from '@mui/icons-material/Timeline';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getChartSeriesByTimeDiv } from './Logic';
import { CustomOverlay, PieChartComponent, BarChartComponent, ScatterChartComponent, LineChartComponent } from './chartTypes';
import Colors from '../../../helpers/colors';

const minDistance = 4;

const lighterColors = [
  '#FF677D', '#2980B9', '#69D2E7', '#31A2AC', '#FFABAB',
  '#FFC3A0', '#FFDDC1', '#D4A5A5', '#797F9A', '#61C0BF',
  '#AB8256', '#D9BF77', '#ACD8AA', '#FFE176', '#8A9B0F',
  '#FA6900', '#16A085', '#E74C3C', '#9B59B6', '#3498DB',
  '#2ECC71', '#F39C12', '#E67E22', '#1ABC9C', '#F1C40F',
];

const timeDivOptions = {
  // hourly: 'שעתית',
  daily: 'יומית',
  weekly: 'שבועית',
  monthly: 'חודשית',
  yearly: 'שנתית',
};

const Charts = ({ dataForChart, handleDeleteChart }) => {
  const { info, chartData } = dataForChart;
  const [isChartDataReady, setIsChartDataReady] = useState(false);
  const [isRenameChartNameOpen, setIsRenameChartNameOpen] = useState(false);
  const [chartType, setChartType] = useState('line');
  const [lineLengthDisplay, setLineLengthDisplay] = useState([0, info.lineLength]);
  const [displayedXAxisData, setDisplayedXAxisData] = useState(chartData.XAxisData.date);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectChartType, setSelectChartType] = useState(0);
  const [showSlider, setShowSlider] = useState(false);
  const [chartName, setChartName] = useState(info.name);
  const [chartSeries, setChartSeries] = useState([]);
  const [timeDiv, setTimeDiv] = useState('daily');
  const [timeDivChartData, setTimeDivChartData] = useState([]);
  const [timeDivXAxisData, setTimeDivXAxisData] = useState(chartData.XAxisData.date);
  const [displayedChartData, setDisplayedChartData] = useState([]);

  const [anchorElTune, setAnchorElTune] = useState(null);
  const [anchorElVisibility, setAnchorElVisibility] = useState(null);
  const [anchorElTimeDiv, setAnchorElTimeDiv] = useState(null);
  const [anchorElDownload, setAnchorElDownload] = useState(null);

  const [checkedLines, setCheckedLines] = useState({
    total_sales: { isChecked: true, hebrewName: 'נתוני אמת' },
    prediction: { isChecked: true, hebrewName: 'תחזית' },
    gap: { isChecked: false, hebrewName: 'הפרש' },
    percentageGap: { isChecked: false, hebrewName: 'הפרש באחוזים' },
    minResidual: { isChecked: false, hebrewName: 'שארית מינימלית' },
    maxResidual: { isChecked: false, hebrewName: 'שארית מקסימלית' },
    residual: { isChecked: false, hebrewName: 'שאריות' },
    cloudcover: { isChecked: false, hebrewName: 'עננות' },
    feel_max_temp: { isChecked: false, hebrewName: 'טמפרטורת חוויה מקסימלית' },
    feel_mean_temp: { isChecked: false, hebrewName: 'טמפרטורת חוויה ממוצעת' },
    feel_min_temp: { isChecked: false, hebrewName: 'טמפרטורת חוויה מינימלית' },
    humidity: { isChecked: false, hebrewName: 'לחות' },
    max_temperature: { isChecked: false, hebrewName: 'טמפרטורה מקסימלית' },
    mean_temperature: { isChecked: false, hebrewName: 'טמפרטורה ממוצעת' },
    min_temperature: { isChecked: false, hebrewName: 'טמפרטורה מינימלית' },
    rain: { isChecked: false, hebrewName: 'גשם' },
    range_time: { isChecked: false, hebrewName: 'טווח זמן' },
    severerisk: { isChecked: false, hebrewName: 'סיכון חמור' },
    snow: { isChecked: false, hebrewName: 'שלג' },
    windspeed: { isChecked: false, hebrewName: 'מהירות רוח' },
    vacation: { isChecked: false, hebrewName: 'חופש' },
    holiday: { isChecked: false, hebrewName: 'חג' },
    unusual: { isChecked: false, hebrewName: 'חריגה' },
  });

  useEffect(() => {
    const series = Object.keys(checkedLines).map((key, index) => {
      const data = chartData.lineData.map(data => data[key]);
      return {
        data,
        label: checkedLines[key].hebrewName,
        id: key,
        isChecked: checkedLines[key].isChecked,
        color: lighterColors[index % lighterColors.length],
      }
    });
    setChartSeries(series);
  }, [chartData, checkedLines]);

  useEffect(() => {
    const adjustedSeries = getChartSeriesByTimeDiv(chartData.XAxisData.date, chartSeries, timeDiv);
    // console.log(adjustedSeries, chartSeries);

    setTimeDivXAxisData(adjustedSeries.XAxisData)
    setTimeDivChartData(adjustedSeries.data);
    // console.log(timeDivChartData, XAxisData);
  }, [chartData, chartSeries, timeDiv]);

  useEffect(() => {
    if (!timeDivChartData) {
      return setIsChartDataReady(false)
    }
    const checkedSeries = chartSeries.filter(line => line.isChecked);
    const newChartData = timeDivXAxisData.slice(lineLengthDisplay[0], lineLengthDisplay[1])
    // console.log(timeDivChartData);
    const displayData = checkedSeries.map(line => {
      const newLineData = timeDivChartData[line.id]?.slice(lineLengthDisplay[0], lineLengthDisplay[1]);
      return {
        ...line,
        data: newLineData,
      };
    });

    console.log(timeDivChartData);
    setDisplayedXAxisData(newChartData);
    setDisplayedChartData(displayData);
    setIsChartDataReady(true)
  }, [timeDivChartData, timeDivXAxisData, lineLengthDisplay]);

  const handleTunePopoverOpen = (event) => {
    setAnchorElTune(event.currentTarget);
    setShowSlider(true);
  };

  const handleTunePopoverClose = () => {
    setAnchorElTune(null);
    setShowSlider(false);
  };

  const handleVisibilityPopoverOpen = (event) => {
    setAnchorElVisibility(event.currentTarget);
  };

  const handleVisibilityPopoverClose = () => {
    setAnchorElVisibility(null);
  };

  const handleTimeDivPopoverOpen = (event) => {
    setAnchorElTimeDiv(event.currentTarget);
  };

  const handleDownloadPopoverOpen = (event) => {
    setAnchorElDownload(event.currentTarget);
  };

  const handleTimeDivPopoverClose = () => {
    setAnchorElTimeDiv(null);
  };

  const handleDownloadPopoverClose = () => {
    setAnchorElDownload(null);
  };

  const handleCheckboxChange = (event) => {
    setCheckedLines({
      ...checkedLines,
      [event.target.name]: {
        ...checkedLines[event.target.name],
        isChecked: event.target.checked,
      },
    });
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const toggleSelectTimeDiv = (event, newTimeDiv) => {
    setTimeDiv(newTimeDiv);
  };

  const toggleSelectChartType = (event, newChartType) => {
    setChartType(newChartType);
  };

  const toggleSelectDownloadType = (type) => {
    if (!displayedChartData || displayedChartData.length === 0) {
      alert("No data available for download");
      return;
    }

    try {
      if (type === '.xlos') {
        downloadDataToXLSX(displayedChartData)
      }
      else if (type === '.csv') {
        const csvData = convertToCSV(displayedChartData);
        downloadDataToCSV("chart-data.csv", csvData);
      }
      else {
        console.log('WTF???');
      }
      console.log(`Downloaded as ${type}`);
    } catch (error) {
      console.log('WTF???');
    }
    handleDownloadPopoverClose()
  };

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]).join(","); // CSV header
    const rows = data.map(row => Object.values(row).join(",")); // Rows as strings

    return [headers, ...rows].join("\n"); // Combine headers and rows
  };

  const downloadDataToCSV = (filename, content) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadDataToXLSX = (data) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "ChartData");

    XLSX.writeFile(wb, "chart-data.xlsx");
  }

  const handleSliderChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;

    let updatedValue = newValue;
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], info.lineLength - minDistance);
        updatedValue = [clamped, clamped + minDistance];
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        updatedValue = [clamped - minDistance, clamped];
      }
    }
    setLineLengthDisplay(updatedValue);
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setChartName(newName);
    info.name = newName;
  };

  const openTunePopover = Boolean(anchorElTune);
  const openVisibilityPopover = Boolean(anchorElVisibility);
  const openTimeDivPopover = Boolean(anchorElTimeDiv);
  const openDownloadPopover = Boolean(anchorElDownload);

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
        <Stack>
          <Stack direction='row' justifyContent='space-between' justifyItems='center' alignItems='center'>
            <IconButton color="primary" onClick={() => handleDeleteChart(info.chartId)}>
              <CloseIcon />
            </IconButton>

            {
              !isRenameChartNameOpen &&
              <Button onClick={() => setIsRenameChartNameOpen(true)}>
                <Typography variant="h5" color={Colors[7]}>
                  {chartName}
                </Typography>
              </Button>
            }
            {
              isRenameChartNameOpen &&
              <TextField
                label="שם הגרף"
                variant="outlined"
                value={chartName}
                onChange={handleNameChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setIsRenameChartNameOpen(false)}
                        edge="end"
                        sx={{ bgcolor: Colors[2] }}
                      >
                        <CheckIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  bgcolor: Colors[1],
                  borderRadius: 1,
                  direction: 'rtl',
                  '& .MuiInputLabel-root': {
                    right: '30px',
                    left: 'unset',
                    transformOrigin: 'top right',
                  },
                  '& .MuiInputBase-root': {
                    direction: 'rtl',
                  },
                  '& .MuiOutlinedInput-input': {
                    textAlign: 'right',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    textAlign: 'right',
                  },
                }}
              />
            }

            <IconButton color="primary" onClick={toggleFullScreen}>
              {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Stack>

          <Stack>

            {
              displayedChartData.length &&
              <Stack dir='ltr'>
                <Stack>
                  {
                    !isChartDataReady ?
                      <CustomOverlay /> :
                      <>
                        {chartType === 'pie' && <PieChartComponent displayedChartData={displayedChartData} XAxisData={displayedXAxisData} />}
                        {chartType === 'bar' && <BarChartComponent displayedChartData={displayedChartData} XAxisData={displayedXAxisData} />}
                        {chartType === 'scatter' && <ScatterChartComponent displayedChartData={displayedChartData} XAxisData={displayedXAxisData} />}
                        {chartType === 'line' && <LineChartComponent displayedChartData={displayedChartData} XAxisData={displayedXAxisData} info={info} />}
                      </>
                  }
                </Stack>
              </Stack>
            }

            {/* <Stack dir='ltr'>
              {chartType === 'line' && (
                <LineChart
                  height={350}
                  series={displayedChartData}
                  xAxis={[{
                    scaleType: 'time',
                    data: XAxisData,
                    valueFormatter: (timestamp, context) => {
                      const date = new Date(timestamp);
                      const day = String(date.getDate());
                      const month = String(date.getMonth() + 1);
                      const year = String(date.getFullYear()).slice(-2);
                      if (context.location === 'tooltip') {
                        // return String(timestamp);
                        return `${day}/${month}/${year}`;
                      }

                      return `${day}/${month}`;
                    }
                  }]}
                  grid={{ vertical: true, horizontal: true }}
                  sx={{
                    [`.${lineElementClasses.root}`]: { strokeWidth: 1 },
                    '.MuiLineElement-series-lineDataId': { strokeWidth: info.lineLength > 50 ? 0.4 : 1 },
                    [`.${markElementClasses.root}`]: { display: 'none' },
                  }}
                  bottomAxis={{
                    labelStyle: {
                      fontSize: 12,
                      transform: `translateY(45px)`
                    },
                    tickLabelStyle: {
                      angle: 45,
                      textAnchor: 'start',
                      fontSize: 10,
                    },
                  }}
                />
              )}

              {chartType === 'pie' && (
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
              )}

              {chartType === 'bar' && (
                <BarChart
                  {...barChartsParams}
                  series={barChartsParams.series.map((series) => ({
                    ...series,
                    highlightScope: {
                      highlighted,
                      faded,
                    },
                  }))}
                />
              )}

              {chartType === 'scatter' && (
                <ScatterChart
                  {...scatterChartsParams}
                  series={scatterChartsParams.series.map((series) => ({
                    ...series,
                    highlightScope: {
                      highlighted,
                      faded,
                    },
                  }))}
                />
              )}
            </Stack> */}

            <Stack alignItems='start'>
              <Stack direction="row" width='100%' alignItems='center' justifyContent='space-between'>
                <Stack direction="row">
                  <IconButton color="primary" onClick={handleTunePopoverOpen}>
                    <StraightenIcon />
                  </IconButton>
                  <Popover
                    id="slider-popover"
                    open={openTunePopover}
                    anchorEl={anchorElTune}
                    onClose={handleTunePopoverClose}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'top',
                    }}
                    transformOrigin={{
                      vertical: 'center',
                      horizontal: 'right',
                    }}
                  >
                    <Stack
                      sx={{ py: 1, width: '500px' }}
                    >
                      <Slider
                        value={lineLengthDisplay}
                        onChange={handleSliderChange}
                        valueLabelDisplay='auto'
                        min={0}
                        max={info.lineLength}
                        sx={{
                          mx: 'auto',
                          height: 2,
                          width: '90%',
                          color: Colors[4],
                          '& .MuiSlider-thumb': {
                            width: 4,
                            height: 16,
                            borderRadius: 0, // square shape
                            backgroundColor: Colors[7],
                          },
                          '& .MuiSlider-track': {
                            backgroundColor: Colors[4],
                          },
                          '& .MuiSlider-rail': {
                            backgroundColor: Colors[4],
                          },
                          '& .MuiSlider-valueLabel': {
                            top: '15px', // Move the value label above the slider
                            backgroundColor: Colors[1],
                            color: Colors[7],
                            // '&:before': {
                            //   display: 'inline', // Hide the default triangle pointer
                            // },
                            // '& *': {
                            //   transform: 'none', // Prevent additional transformation of the value label
                            // },
                          },
                        }
                        }
                      />
                    </Stack>
                  </Popover>

                  <IconButton color="primary" onClick={handleVisibilityPopoverOpen}>
                    <StackedLineChartIcon />
                  </IconButton>
                  <Popover
                    id="visibility-popover"
                    open={openVisibilityPopover}
                    anchorEl={anchorElVisibility}
                    onClose={handleVisibilityPopoverClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'top',
                    }}
                  >
                    <Stack
                      sx={{
                        p: 2,
                        pr: 0,
                        maxHeight: '400px', // Set a max height to make scrolling visible
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                          width: '5px', // Set the width of the scrollbar
                        },
                        '&::-webkit-scrollbar-track': {
                          boxShadow: `inset 0 0 5px ${Colors[1]}`, // Style for the track
                          borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          background: Colors[4], // Color for the scrollbar thumb
                          borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                          background: Colors[5], // Color on hover
                        },
                      }}
                    >
                      {chartSeries.map(series => (
                        <FormControlLabel
                          dir='rtl'
                          key={series.id}
                          control={
                            <Checkbox
                              checked={checkedLines[series.id].isChecked}
                              onChange={handleCheckboxChange}
                              name={series.id}
                            />
                          }
                          label={checkedLines[series.id].hebrewName}
                          sx={{
                            margin: 0, // Remove any margin
                            '& .MuiFormControlLabel-label': {
                              margin: 0, // Ensure label has no margin
                            },
                          }}
                        />
                      ))}
                    </Stack>
                  </Popover>

                </Stack>

                <Stack dir='ltr'>
                  <ToggleButtonGroup
                    value={chartType}
                    exclusive
                    onChange={toggleSelectChartType}
                  >
                    <ToggleButton value={'line'}>
                      <TimelineIcon />
                    </ToggleButton>
                    <ToggleButton value={'scatter'}>
                      <ScatterPlotIcon />
                    </ToggleButton>
                    <ToggleButton value={'pie'}>
                      <PieChartIcon />
                    </ToggleButton>
                    <ToggleButton value={'bar'}>
                      <BarChartIcon />
                    </ToggleButton>
                  </ToggleButtonGroup >
                </Stack>

                <Stack direction="row">
                  <IconButton color="primary" onClick={handleTimeDivPopoverOpen}>
                    <CalendarMonthIcon />
                  </IconButton>
                  <Popover
                    id="time-div-popover"
                    open={openTimeDivPopover}
                    anchorEl={anchorElTimeDiv}
                    onClose={handleTimeDivPopoverClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'bottom',
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                  >
                    <Stack>
                      <ToggleButtonGroup
                        orientation="vertical"
                        value={timeDiv}
                        exclusive
                        onChange={toggleSelectTimeDiv}
                      >
                        {Object.entries(timeDivOptions).map(([key, value]) => (
                          <ToggleButton key={key} value={key}>
                            <Typography>{value}</Typography>
                          </ToggleButton>
                        ))}
                      </ToggleButtonGroup>
                    </Stack>
                  </Popover>
                  <IconButton color="primary" onClick={handleDownloadPopoverOpen}>
                    <SaveAltIcon />
                  </IconButton>
                  <Popover
                    id="download-popover"
                    open={openDownloadPopover}
                    anchorEl={anchorElDownload}
                    onClose={handleDownloadPopoverClose}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'top',
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'top',
                    }}
                  >
                    <Stack>
                      <ButtonGroup
                        orientation="vertical"
                      >
                        {['.xlos', '.csv'].map((type) => (
                          <Button variant='text' key={type} onClick={() => toggleSelectDownloadType(type)}>
                            <Typography color={Colors[5]}>{type}</Typography>
                          </Button>
                        ))}
                      </ButtonGroup>
                    </Stack>
                  </Popover>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Box >
  );
};

export default Charts;
