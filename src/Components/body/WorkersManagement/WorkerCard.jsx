import React, { useState, useEffect } from 'react';
import { Box, Button, ButtonGroup, Card, CardContent, Divider, ToggleButton, ToggleButtonGroup, IconButton, Paper, Typography, Slider, Stack, Tab, Tabs, TextField, InputAdornment, Popover, FormControlLabel, Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ShiftsTable from './ShiftsTable';
import Colors from '../../../helpers/colors';


const WorkerCard = ({ dataForCard, handleDeleteCard }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [tabValue, setTabValue] = React.useState('details');

  const handleChangeTab = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

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
              {dataForCard.name}
            </Typography>

            <IconButton color="primary" onClick={toggleFullScreen}>
              {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Stack>

          <Stack>
            <Tabs value={tabValue} onChange={handleChangeTab}>
              <Tab value='details' label="פרטים" />
              <Tab value='shifts' label="משמרות" />
              <Tab value='others' label="נוספים" />
            </Tabs>
          </Stack>

          <Divider />

          <Stack>
            {
              tabValue === 'details' &&
              <Stack flexDirection='row'>
                <Stack p={3} gap={2}>
                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'שם :'}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {dataForCard.full_name}
                    </Typography>
                  </Stack>

                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'ת.ז. :'}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {dataForCard.id_number}
                    </Typography>
                  </Stack>

                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'טל\' :'}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {dataForCard.phone_number}
                    </Typography>
                  </Stack>

                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'תאריך לידה :'}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {String(new Date(dataForCard.date_of_birth))}
                    </Typography>
                  </Stack>

                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'כתובת :'}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {dataForCard.address}
                    </Typography>
                  </Stack>

                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'מייל :'}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {dataForCard.mail}
                    </Typography>
                  </Stack>

                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'מצב משפחתי :'}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {dataForCard.marital_status}
                    </Typography>

                    {
                      dataForCard?.children > 0 &&
                      <Typography variant="h6" color={Colors[5]}>
                        {'+ ' + dataForCard.children}
                      </Typography>
                    }
                  </Stack>
                </Stack>

                <Divider orientation="vertical" variant="middle" flexItem sx={{ my:4 }} />

                <Stack p={3} gap={2}>
                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'תפקיד :'}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {dataForCard.role}
                    </Typography>
                  </Stack>

                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'סטטוס עבודה :'}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {dataForCard.work_status}
                    </Typography>
                  </Stack>

                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'סטטוס משרה :'}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {dataForCard.type_of_position}
                    </Typography>
                  </Stack>

                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'ותק :'}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {String(new Date().getFullYear() - new Date(dataForCard.date_of_starting_work).getFullYear())}
                    </Typography>
                    <Typography variant="h6">
                      {'שנים, '}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {String(new Date().getMonth() - new Date(dataForCard.date_of_starting_work).getMonth())}
                    </Typography>
                    <Typography variant="h6">
                      {'חודשים'}
                    </Typography>
                  </Stack>

                  <Stack gap={2} flexDirection='row'>
                    <Typography variant="h6">
                      {'שכר שעתי :'}
                    </Typography>
                    <Typography variant="h6" color={Colors[5]}>
                      {dataForCard.hourly_wage}
                    </Typography>
                  </Stack>

                  <Stack justifyContent='center' mt={5}>
                    <Button >
                      <Typography color={Colors[7]} variant="h6">
                        {'היסטורית עובד'}
                      </Typography>
                      <ArrowLeftIcon fontSize="large" />
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            }

            {
              tabValue === 'shifts' &&
              <ShiftsTable />
            }

            {
              tabValue === 'others' &&
              <Stack p={1} gap={2} flexDirection='row'>
                <Stack mt={2} gap={2} width='20%'>
                  <Stack gap={1} flexDirection='row'>
                    <Typography variant="body2">
                      {'ציון עובד :'}
                    </Typography>
                    <Typography variant="body2" color={Colors[5]}>
                      {dataForCard.work_grade}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack height={340} pr={1} pt={1} width='80%' bgcolor={Colors[0]} borderRadius={3}>
                  {
                    dataForCard.general_note &&
                    <Stack mb={1}>
                      <Typography variant='body1'>
                        {dataForCard.general_note}
                      </Typography>
                    </Stack>
                  }

                  {
                    !(dataForCard.note_history?.length > 0) &&
                    <Stack flexDirection='row' justifyContent='space-between' px={2}>
                      <Typography variant='body2'>
                        {'אין הערות'}
                      </Typography>
                    </Stack>
                  }

                  {
                    dataForCard.note_history?.length > 0 &&
                    <Stack
                      sx={{
                        overflow: 'auto',
                        gap: 1,
                        pl: 1,
                        '&::-webkit-scrollbar': {
                          width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                          boxShadow: `inset 0 0 5px ${Colors[1]}`,
                          borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          background: Colors[4],
                          borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                          background: Colors[5],
                        },
                      }}
                    >
                      {
                        dataForCard.note_history.map((note, index) => (
                          <Card sx={{ minHeight: 100 }}>
                            <CardContent>
                              <Stack flexDirection='row' justifyContent='space-between' px={2}>
                                <Typography variant='body2'>
                                  {index + 1}
                                </Typography>
                                <Typography variant='body2'>
                                  {note.date}
                                </Typography>
                              </Stack>

                              <Divider />

                              <Stack mt={1} textAlign='start'>
                                <Typography variant='body2'>
                                  {note.note}
                                </Typography>
                              </Stack>

                              <Stack mt={1} textAlign='end'>
                                <Typography fontSize={12}>
                                  {note.commenter}
                                </Typography>
                              </Stack>
                            </CardContent>
                          </Card>
                        ))
                      }
                    </Stack>
                  }
                </Stack>
              </Stack>
            }
          </Stack>
        </Stack>
      </Paper>
    </Box >
  );
};

export default WorkerCard;
