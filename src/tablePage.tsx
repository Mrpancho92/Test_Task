import { DataGrid } from '@mui/x-data-grid';
import {GridRowSelectionModel, GridRowId} from '@mui/x-data-grid';
import { MouseEvent } from 'react';
import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface GridCellEditCommitParams {
    id: GridRowId;
    field: string;
    value: string | number | boolean | Date | null | undefined | object;
  }
//   const Container =  styled.div`
//   width: 80%;
// `;




const useStyles = makeStyles({
    root: {
    //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //   border: 0,
    //   borderRadius: 3,
    //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    //   color: 'white',
    //   height: 48,
    //   padding: '0 30px',
    width: '100%',

    },
  });
  const useStylesForCustomNoRowsOverlay = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //   border: 0,
    //   borderRadius: 3,
    //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'red',
      margin: '0',
      padding: '0',
      height: '100px'
    // width: '100%',

    },
  });
  const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .no-rows-primary': {
      fill: theme.palette.mode === 'light' ? '#AEB8C2' : '#3D4751',
    },
    '& .no-rows-secondary': {
      fill: theme.palette.mode === 'light' ? '#E8EAED' : '#1D2126',
    },
  }));

  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width={96}
          viewBox="0 0 452 257"
          aria-hidden
          focusable="false"
        >
          <path
            className="no-rows-primary"
            d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
          />
          <path
            className="no-rows-primary"
            d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
          />
          <path
            className="no-rows-primary"
            d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
          />
          <path
            className="no-rows-secondary"
            d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
          />
        </svg>
        <Box sx={{ mt: 2 }}>No rows</Box>
      </StyledGridOverlay>
    );
  }



const TablePage = ({tableData, columns, deleteItem, changeItem }:
    {   tableData:any, 
        columns: any, 
        deleteItem: (rowSelection:GridRowSelectionModel) => void,
        changeItem: (params:any) => void
    }) => {
        const classes = useStyles();
        
        // const obj = {
        //     companySigDate: "2024-02-07T15:19:00.000Z",
        //     companySignatureName: "frfr",
        //     documentName: "frfrf",
        //     documentStatus: "rfrf",
        //     documentType: "frf",
        //     employeeNumber: "frfr",
        //     employeeSigDate: "2024-02-07T15:19:00.000Z",
        //     employeeSignatureName: "frfrf",
        //     id: "fd889ede-e6bb-4042-8d5e-f1a86f52f35e",
        //     filledQuantity: "0.46080898876404497"
        // }
// console.log(tableData);
    return (
        <>
         <div style={{ height: 400, width: '80%' }}>
            <DataGrid
             slots={{
                noRowsOverlay: CustomNoRowsOverlay,
              }}
                rows={tableData}
                // rows={tableData}
                columns={columns}
                //   loading = {tableData? false : true}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                  }}
                autoHeight
                pageSizeOptions={[2,5]}
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange = {deleteItem}  
                editMode="row"
                processRowUpdate = {(a,b) => changeItem(a)}
                onProcessRowUpdateError={(item) => console.log(item)}
                className={classes.root}
            />  
            </div> 
        </>
    )
}
export default TablePage;