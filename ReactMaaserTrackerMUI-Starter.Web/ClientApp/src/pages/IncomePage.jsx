import React, { useState } from 'react';
import { Checkbox, Container, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';


const IncomePage = () => {

    const [groupBySource, setGroupBySource] = useState(false);
    const [sourceIncomes, setSourceIncomes] = useState([]);

    useEffect(() => {
        const loadIncomes = async () => {
          const {data} = await axios.get('/api/source/getsourceswithincomes');
          setSourceIncomes(data);
        }

        loadIncomes();
    }, []);

   const incomes = sourceIncomes.flatMap((source) => {
    return source.incomes.map((income) => {
      return {
        id: income.id,
        source: source.name,
        amount: income.amount,
        date: income.date,
      }
    });
   });

    const groupedIncomes = sourceIncomes.map((source) => {
      return {
        source: source.name,
        incomes: source.incomes,
      }
    });

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
      <Typography variant="h2" gutterBottom component="div">
        Income History
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={groupBySource}
            onChange={(event) => setGroupBySource(event.target.checked)}
            name="checkedB"
            color="primary"
          />
        }
        label="Group by source"
      />

      {!groupBySource ? (
        <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incomes.map((income) => (
                <TableRow key={income.id}>
                  <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                    {income.source}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '18px' }}>${income.amount}</TableCell>
                  <TableCell align="right" sx={{ fontSize: '18px' }}>{dayjs(income.date).format("MM/DD/YYYY")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        groupedIncomes.map(({ source, incomes }) => (
          <div key={source} sx={{ width: '80%', maxWidth: '80%' }}>
            <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
              {source}
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incomes.map((income) => (
                    <TableRow key={income.id}>
                      <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                        {source}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: '18px' }}>${income.amount}</TableCell>
                      <TableCell align="right" sx={{ fontSize: '18px' }}>{dayjs(income.date).format("MM/DD/YYYY")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))
      )}
    </Container>
  );
}
//<p className="card-text">Delivery Date: {dayjs(deliveryDate).format("MM/DD/YYYY")}</p>
export default IncomePage;
