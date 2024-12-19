import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import Colors from '../../../helpers/colors';
import Header from '../../Basic/Header';
import Side from '../../Basic/Side';

const DataManagement = () => {
  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Stack width='100%' height='100%' alignItems='center'>
      <Stack
        sx={{
          mt: 10,
          height: 300,
          width: 500,
          borderRadius: 5,
          background: Colors[0],
          border: 2,
          borderColor: Colors[4],
          borderStyle: 'dashed',
          textAlign: 'center',
          justifyContent: 'center'
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Typography variant='h5' color={Colors[9]}>הכנס לכאן קובץ או לחץ לפתיחת תיקיות</Typography>
      </Stack>

      <Stack mt={5}>
        <Button variant='contained' sx={{ mt: 3, bgcolor: Colors[6], ':hover': { bgcolor: Colors[7] }, transition: 'background-color 0.3s', fontWeight: 'bold' }}>
          <Typography color={Colors[5]}>שליחה</Typography>
        </Button>
      </Stack>
    </Stack>
  );
};

export default DataManagement;
