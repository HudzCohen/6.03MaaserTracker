import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddIncomePage = () => {
    
    const navigate = useNavigate();

    const [sources, setSources] = useState([]);
    const [selectedSource, setSelectedSource] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const loadSources = async () => {
            const {data} = await axios.get('/api/source/getsources');
            setSources(data);
          }

        loadSources();
    }, []);

    const onAddIncomeClick =  async () => {
        await axios.post('/api/actions/addincome', {amount, date: selectedDate, sourceId: selectedSource.id });
        setSelectedSource(null);
        setAmount('');
        setSelectedDate(new Date());
        navigate('/income');
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Income
            </Typography>
            <Autocomplete
                options={sources}
                getOptionLabel={(source) => source.name}
                fullWidth
                margin="normal"
                renderInput={(params) => <TextField {...params} label="Source" variant="outlined" />}
                value={selectedSource}
                onChange={(e, selectedSourceValue) => setSelectedSource(selectedSourceValue)}
            />
            <TextField
                label="Amount"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
                value={amount}
                onChange={ e => setAmount(e.target.value) }
            />
             <TextField
                label="Date"
                type="date"
                value={dayjs(selectedDate).format('YYYY-MM-DD')}
                onChange={e => setSelectedDate(e.target.value)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button variant="contained" color="primary" onClick={onAddIncomeClick}>Add Income</Button>
        </Container>
    );
}

export default AddIncomePage;
