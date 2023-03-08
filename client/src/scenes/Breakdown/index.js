import React from 'react'
import { Box,useTheme } from '@mui/material';
import Header from 'components/Header';
import BreakDownChart from 'components/BreakdownChart';
import { useGetAdminsQuery } from 'state/api';
import { DataGrid } from '@mui/x-data-grid';
function Breakdown() {
  const theme = useTheme();
  const {data,isLoading}=useGetAdminsQuery();
  console.log(data)
  return (
    <Box m="1.5rem 2.5rem">
    <Header
     title="BREAKDOWN"
     subtitle="Breakdown of sales by category"
    />
  <Box
  
  mt="40px"
  height="75vh"
  >
  <BreakDownChart/>
  </Box>
    </Box>
  )
}

export default Breakdown