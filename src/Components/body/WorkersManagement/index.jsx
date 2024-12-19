import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, Stack, List, ListItem, Paper, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Colors from '../../../helpers/colors';
import workersFakeData from './workersFakeData';
import WorkerCard from './WorkerCard';
// import Header from '../../Basic/Header';
// import Side from '../../Basic/Side';
// import AICharts from './AICharts';
// import DefineAIChart from './DefineAIChart';
// import _range from 'lodash/range';


const EsekDBUrl = import.meta.env.VITE_API_URL_ESEK_DB

const userName = 'lizCafeteria';

const WorkersManagement = () => {
  const [listOfWorkers, setListOfWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getListOfWorkers = async (userName) => {
      const { data } = await Axios.get(`${EsekDBUrl}/getWorkersNames`, {
        params: {
          query: JSON.stringify({ user_name: userName }),
        },
      });

      // const workersFullNames = data.map(worker => worker.full_name);
      setListOfWorkers(data);
    };

    getListOfWorkers(userName);
  }, []);

  const handleAddCard = async (workerName) => {
    if (!workerName) return;

    const [worker] = listOfWorkers.filter(worker => worker.full_name === workerName);
    const { data } = await Axios.get(`${EsekDBUrl}/getWorker`, {
      params: {
        query: JSON.stringify({ user_name: userName, worker_id: worker._id }),
      },
    });

    // const [newCard] = workersFakeData.filter(worker => worker.full_name === workerName);
    setCards(cards => [...cards, data]);
  };

  const handleDeleteCard = (cardId) => {
    setCards(cards => cards.filter(card => card.info.cardId !== cardId));
  };

  return (
    <Stack height="100%" width="100%" >
      <List sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        {cards.map((card, index) => (
          <ListItem key={index} sx={{ width: '50%', height: 500, textAlign: 'center' }}>
            <WorkerCard dataForCard={card} handleDeleteCard={handleDeleteCard} />
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
              <Typography variant='h3' sx={{ mt: 2, color: Colors[13] }}>
                {'הצגת נתוני עובד'}
              </Typography>

              <Stack sx={{ ml: 3, mt: '20%' }}>
                <Autocomplete
                  disablePortal
                  options={listOfWorkers.map(worker => worker.full_name)}
                  getOptionLabel={(option) => option || ""}  // Assuming listOfWorkers is an array of objects with a 'name' field
                  onChange={(event, newValue) => setSelectedWorker(newValue)}
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
                        sx={{ '& .MuiInputLabel-root': { right: '5px', left: 'unset', transformOrigin: 'top right' } }}
                      />
                    </Stack>
                  )}
                />
              </Stack>

              <Stack sx={{ mt: '5%', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                  onClick={() => handleAddCard(selectedWorker)}
                  variant='contained'
                  sx={{
                    height: 100,
                    width: 100,
                    borderRadius: '50%',
                    bgcolor: Colors[6],
                    ':hover': { bgcolor: Colors[7] },
                    transition: 'background-color 0.3s',
                  }}
                >
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
