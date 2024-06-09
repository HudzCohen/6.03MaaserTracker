import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import axios, { all } from 'axios';

const OverviewPage = () => {
  
  const [allAmounts, setAllAmounts] = useState([]);
  const { totalIncome, totalMaaser, maaserObligated, remainingMaaser } = allAmounts;
  
  useEffect(() => {
    const getAmounts = async() => {
      const {data} = await axios.get('/api/actions/overview');
      setAllAmounts(data);
    }

    getAmounts();
  }, []);

  const formatMoney = (amount) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });
    return formatter.format(amount);
}


  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        textAlign: 'center'
      }}
    >
      <Paper elevation={3} sx={{ padding: '120px', borderRadius: '15px' }}>
        <Typography variant="h2" gutterBottom>
          Overview
        </Typography>
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Total Income: {formatMoney(totalIncome)}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Total Maaser: {formatMoney(totalMaaser)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
            Maaser Obligated: {formatMoney(maaserObligated)}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Remaining Maaser obligation: {formatMoney(remainingMaaser)}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default OverviewPage;
