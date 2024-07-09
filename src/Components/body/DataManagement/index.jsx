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
    <Stack dir='rtl'>
      <Header />

      <Stack flexDirection='row'>
        <Side />

        <Stack bgcolor={Colors[1]} width='100%' height='100vh' alignItems='center'>
          <Stack
            sx={{
              mt: 10,
              height: 200,
              width: 300,
              borderRadius: 5,
              background: Colors[2],
              border: 2,
              borderColor: Colors[4],
              borderStyle: 'dashed',
              textAlign: 'center',
              justifyContent: 'center'
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Typography color={grey[200]}>הכנס לכאן קובץ או לחץ לפתיחת תיקיות</Typography>
          </Stack>

          <Stack mt={5}>
            <Button variant='outlined'>
              <Typography color={grey[200]}>שליחה</Typography>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DataManagement;
