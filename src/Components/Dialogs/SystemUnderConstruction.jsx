import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, Divider, IconButton, Paper, Slider, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Colors from '../../helpers/colors';

const SystemUnderConstructionDialog = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  }

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Dialog open={isOpen} onClose={handleClose} dir="rtl" sx={{ bgcolor: `${Colors[11]}AA` }}>
      <Stack p={4} width={600} height={400} bgcolor={Colors[1]} alignItems='center' justifyContent='space-between' textAlign='center'>
        <Stack>
          <Typography variant="h4" color={Colors[13]}>
            {'המערכת לא הצליחה לבצע את המבוקש'}
          </Typography>

          <Stack width='100%' p={2}>
            <Divider variant="middle" flexItem />
          </Stack>
        </Stack>

        <Typography variant="h5" color={Colors[5]}>
          {'ייתכן ומערכת כרגע בשיפוצים, וכתוצאה מכך חלק מהאפשרויות חסומות.'}
        </Typography>

        <Button variant='outlined' onClick={handleClose}>
          {'הבנתי'}
        </Button>
      </Stack>
    </Dialog>
  );
};

export default SystemUnderConstructionDialog;
