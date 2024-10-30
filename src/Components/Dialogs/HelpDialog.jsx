import React, { useState } from 'react';
import { Box, Dialog, Divider, IconButton, Paper, Slider, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import Colors from '../../helpers/colors';

const HelpDialog = () => {
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false)

  const handleHelpClick = () => {
    setIsHelpDialogOpen(!isHelpDialogOpen);
  };

  return (
    <Stack>
      <IconButton onClick={handleHelpClick} sx={{ color: Colors[5] }}>
        <HelpIcon />
      </IconButton>
      <Dialog open={isHelpDialogOpen} onClose={() => setIsHelpDialogOpen(false)} dir="rtl">
        <Stack p={4} width={600} height={500} alignItems='center'>
          <Typography variant="h4" color={Colors[7]}>
            {'עזרה'}
          </Typography>

          <Stack width='100%' p={2}>
            <Divider variant="middle" flexItem />
          </Stack>
        </Stack>
      </Dialog>
    </Stack>
  );
};

export default HelpDialog;
