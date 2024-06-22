import React from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { grey } from '@mui/material/colors';

const Header = () => {
    return (
        <Stack sx={{ height: '8%', backgroundColor: grey[600], justifyContent: 'center', textAlign: 'center' }}>
            <Typography variant='h6'>
                CalculShop
            </Typography>
        </Stack>
    );
};

export default Header;
