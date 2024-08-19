import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, Stack, List, ListItem, Paper, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Colors from '../../../helpers/colors';
// import Header from '../../Basic/Header';
// import Side from '../../Basic/Side';
// import AICharts from './AICharts';
// import DefineAIChart from './DefineAIChart';
// import _range from 'lodash/range';


// const backEndUrl = import.meta.env.VITE_API_URL_BACK_END_URL

const userName = 'wwwwwwwwwwwwwwwwwwwwwww';

const WorkersManagement = () => {
  const [listOfWorkers, setListOfWorkers] = useState([]);
  const [cards, setCards] = useState([]);
  // const [existProducts, setExistProducts] = useState([]);

  useEffect(() => {
    const getListOfWorkers = async (userName) => {
      const { data } = await Axios.get(`${backEndUrl}/getAllWorkers`, {
        params: {
          query: JSON.stringify({ userName }),
        },
      });

      setListOfWorkers(data)
    };

    getListOfWorkers(userName);
  }, []);

  const handleAddCard = async (workerName) => {
    const { data } = await Axios.get(`${backEndUrl}/getWorker`, {
      params: {
        query: JSON.stringify(userName),
      },
    });

    // console.log(data)
    const newCard = data;
    setCards(cards => [...cards, newCard]);
  };

  const handleDeleteCard = (cardId) => {
    setCards(cards => cards.filter(card => card.info.cardId !== cardId));
  };

  return (
    <Stack height="100%" width="100%" >
      <List sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        {cards.map((card, index) => (
          <ListItem key={index} sx={{ width: '50%', height: 500, textAlign: 'center' }}>
            {/* <AICharts dataForChart={dataForChart} handleDeleteChart={handleDeleteChart} /> */}
          </ListItem>
        ))}

        <ListItem key={'lastItem'} sx={{ width: '50%', height: 500, textAlign: 'center' }}>
          <Paper
            sx={{
              width: '100%',
              height: '100%',
              padding: 4,
              overflowY: 'auto',
              bgcolor: `${Colors[10]}AA`,
              borderRadius: 2,
              boxShadow: 5,
              '&::-webkit-scrollbar': {
                width: '5px',
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
            <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant='h3' sx={{ mt: 2, color: Colors[7] }}>
                הצגת עובד
              </Typography>

              <Stack sx={{ ml: 3, mt: '20%' }}>
                <Autocomplete
                  disablePortal
                  options={[]}
                  sx={{
                    width: 200,
                    '& .MuiAutocomplete-endAdornment': {
                      right: 'unset',  // Reset the default right positioning
                      left: 0,         // Move to the left
                    },
                    '& .MuiAutocomplete-inputRoot': {
                      paddingLeft: '5px',  // Adjust padding to prevent overlap with the icon
                    },
                  }}
                  renderInput={(params) => (
                    <Stack sx={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                      <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        {...params}
                        variant="standard"
                        label='שם'
                        sx={{ '& .MuiInputLabel-root': { right: '5px', left: 'unset', transformOrigin: 'top right' }, }}
                      />
                    </Stack>
                  )}
                />
              </Stack>

              <Stack sx={{ mt: '5%' }}>
                <Button onClick={() => setIsAddNewChartOpen(true)} variant='contained' sx={{ height: 100, width: 100, borderRadius: '50%', bgcolor: Colors[6], ':hover': { bgcolor: Colors[7] }, transition: 'background-color 0.3s' }}>
                  <AddIcon style={{ fontSize: 100 }} />
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </ListItem>
      </List>
    </Stack>
  );
};

export default WorkersManagement;
