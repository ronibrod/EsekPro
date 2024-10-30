import React, { useState, useEffect } from 'react';
import { Box, Button, ButtonGroup, Card, CardContent, Divider, ToggleButton, ToggleButtonGroup, IconButton, Paper, Typography, Slider, Stack, Tab, Tabs, TextField, InputAdornment, Popover, FormControlLabel, Checkbox } from '@mui/material';
import Table from '@mui/joy/Table';
import { CssVarsProvider } from '@mui/joy/styles';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ProfitFakeData from './ProfitFakeData';
import Colors from '../../../helpers/colors';
import _sum from 'lodash/sum'

const ProductCard = ({ dataForCard, handleDeleteCard }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [tabValue, setTabValue] = React.useState('display');
  const [listOfIngredients, setlistOfIngredients] = React.useState([]);

  useEffect(() => {
    const ingredients = dataForCard.ingredients.map(ingredient => {
      return {
        ...ProfitFakeData.ingredients.find(item => item.name === ingredient.name),
        quantity: ingredient.quantity,
      };
    });

    setlistOfIngredients(ingredients)
  }, [dataForCard]);

  const handleChangeTab = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  console.log(listOfIngredients);

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
        overflow: 'hidden',
        bgcolor: Colors[10],
        borderRadius: 2,
        boxShadow: 5,
      }}>
        <Stack>
          <Stack direction='row' justifyContent='space-between' justifyItems='center' alignItems='center'>
            <IconButton color="primary" onClick={() => handleDeleteCard(info.chartId)}>
              <CloseIcon />
            </IconButton>

            <Typography variant="h5" color={Colors[13]}>
              {dataForCard.he}
            </Typography>

            <IconButton color="primary" onClick={toggleFullScreen}>
              {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Stack>

          <Stack>
            <Tabs value={tabValue} onChange={handleChangeTab}>
              <Tab value='display' label="הצגה" />
              <Tab value='update' label="עריכה" />
            </Tabs>
          </Stack>

          <Divider />

          <Stack>
            {
              tabValue === 'display' &&
              <Stack flexDirection='row'>
                <Stack width={'50%'} p={3} gap={2}>
                  <Typography variant="h6" color={Colors[5]}>
                    {'רכיבים'}
                  </Typography>

                  <Stack p={3} gap={2}>
                    <CssVarsProvider sx={{ dir: 'rtl' }}>
                      <Table>
                        <thead>
                          <tr>
                            <th style={{ width: '40%', textAlign: 'right' }}>{'שם רכיב'}</th>
                            <th style={{ textAlign: 'right' }}>{'כמות'}</th>
                            <th style={{ textAlign: 'right' }}>{'מחיר'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            listOfIngredients?.map((item, index) => (
                              <tr key={index}>
                                <td>{item.he}</td>
                                <td>{item.quantity}</td>
                                <td>{item.cost * item.quantity}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </Table>
                    </CssVarsProvider>
                  </Stack>

                  <Divider variant="middle" flexItem sx={{ mt: 2 }} />

                  <Stack direction={'row'} justifyContent={'space-evenly'} p={3} gap={2}>
                    <Typography variant="h6" color={Colors[5]}>
                      {'סה"כ: '}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {_sum(listOfIngredients.map(item => item.cost * item.quantity)).toFixed(1)}
                    </Typography>
                  </Stack>
                </Stack>

                <Divider orientation="vertical" variant="middle" flexItem sx={{ my: 4 }} />

                <Stack py={3} px={4}>
                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'מע"מ: '}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {dataForCard.tax}
                    </Typography>
                  </Stack>

                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'בלאי: '}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {`${dataForCard.failurePercentage}%`}
                    </Typography>
                  </Stack>

                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'זמן הכנה: '}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {dataForCard.preparationTime}
                    </Typography>
                  </Stack>

                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'אקסטרה אחסון: '}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {dataForCard.extraStorage}
                    </Typography>
                  </Stack>

                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'אקסטרה כוח אדם: '}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {dataForCard.extraWorkers}
                    </Typography>
                  </Stack>

                  <Divider flexItem sx={{ mt: 4 }} />

                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'סה"כ עלות: '}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {(dataForCard.cost * 1.2).toFixed(1)}
                    </Typography>
                  </Stack>

                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'מחיר בפועל: '}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {(dataForCard.cost * 1.2 * 4.1).toFixed(1)}
                    </Typography>
                  </Stack>

                  <Divider flexItem sx={{ mb: 4 }} />

                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'הערות: '}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {dataForCard.comments}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            }
          </Stack>
        </Stack>
      </Paper>
    </Box >
  );
};

export default ProductCard;
