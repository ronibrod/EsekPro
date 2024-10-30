import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import Colors from '../../../helpers/colors';

const roles = ['שוק', 'פיננסים', 'פיתוח'];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: randomRole(),
    shiftDate: randomCreatedDate(),
    startTime: '15:41',
    endTime: '23:12',
    totalTime: '7:42',
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: randomRole(),
    shiftDate: randomCreatedDate(),
    startTime: '15:37',
    endTime: '23:05',
    totalTime: '7:37',
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: randomRole(),
    shiftDate: randomCreatedDate(),
    startTime: '17:33',
    endTime: '00:46',
    totalTime: '6:55',
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: randomRole(),
    shiftDate: randomCreatedDate(),
    startTime: '15:46',
    endTime: '23:28',
    totalTime: '7:23',
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: randomRole(),
    shiftDate: randomCreatedDate(),
    startTime: '15:40',
    endTime: '23:09',
    totalTime: '7:34',
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        הוסף רשומה
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [isInDeleteMode, setIsInDeleteMode] = React.useState(false);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleConfirmDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: 'shiftDate',
      headerName: 'תאריך',
      type: 'date',
      width: 120,
      minWidth: 80,
      maxWidth: 180,
      editable: false,
      align: 'right',
      headerAlign: 'left',
    },
    {
      field: 'startTime',
      headerName: 'כניסה',
      type: 'string',
      width: 100,
      minWidth: 80,
      maxWidth: 150,
      editable: true,
      align: 'right',
      headerAlign: 'left',
    },
    {
      field: 'endTime',
      headerName: 'יציאה',
      type: 'string',
      width: 120,
      minWidth: 80,
      maxWidth: 150,
      editable: true,
      align: 'right',
      headerAlign: 'left',
    },
    {
      field: 'totalTime',
      headerName: 'סה"כ',
      type: 'string',
      width: 120,
      minWidth: 80,
      maxWidth: 150,
      editable: false,
      align: 'right',
      headerAlign: 'left',
    },
    {
      field: 'edit',
      type: 'actions',
      headerName: 'ערוך',
      width: 100,
      minWidth: 80,
      maxWidth: 150,
      align: 'left',
      headerAlign: 'left',
      cellClassName: 'edit',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="שמור"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="בטל"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="ערוך"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />
        ];
      },
    },
    {
      field: 'delete',
      type: 'actions',
      headerName: 'מחק',
      width: 100,
      minWidth: 80,
      maxWidth: 150,
      align: 'left',
      headerAlign: 'left',
      cellClassName: 'delete',
      getActions: ({ id }) => {
        if (isInDeleteMode) {
          return [
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="מחק"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleConfirmDeleteClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="לא למחוק"
              className="textPrimary"
              onClick={() => setIsInDeleteMode(false)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="מחק"
            onClick={() => setIsInDeleteMode(true)}
            color="inherit"
          />
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: '360px',
        width: '100%',
        overflow: 'auto',
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
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        localeText={{
          toolbarDensity: 'צפיפות',
          toolbarDensityLabel: 'צפיפות',
          toolbarDensityCompact: 'קומפקטי',
          toolbarDensityStandard: 'סטנדרטי',
          toolbarDensityComfortable: 'נוח',
        }}
      />
    </Box>
  );
}
