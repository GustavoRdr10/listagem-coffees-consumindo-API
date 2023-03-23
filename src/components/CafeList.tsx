import { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Card, CardHeader, CardContent, TextField, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

export type Cafe = {
    title: string;
    type: string;
}

type CafeListProps = {
    cafes: Cafe[];
    setFilteredCafes: (updatedCafes: Cafe[]) => void;
}

const CafeList = ({ cafes, setFilteredCafes }: CafeListProps) => {
    const [selectedType, setSelectedType] = useState<string>('hot');
    const debounceTimer = useRef<number | null>(null);

    const handleTypeChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
        const type = event.target.value as string;
        setSelectedType(type);
        if (debounceTimer.current !== null) {
            clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = window.setTimeout(() => {
            axios.get(`https://api.sampleapis.com/coffee/${type}`)
                .then(response => {
                    const data = response.data;
                    const cafes = data.map((cafe: any) => ({
                        title: cafe.title,
                        type: cafe.type
                    }));
                    setFilteredCafes(cafes);
                })
                .catch(error => {
                    console.log(error);
                });
        }, 500);
    }, [setFilteredCafes]);

    const StyledTextField = styled(TextField)({
        width: '120px',
        marginLeft: '30px',
        marginBottom: '30px',
        position: 'relative',
        top: '8px',
        '& label': {
            color: 'blue'
        },
        '& select': {
            backgroundColor: 'lightgray'
        }
    });

    const RightAlignedButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'disableElevation' })({
        position: 'absolute',
        top: '40px',
        right: 30,
        marginRight: '20px',
        backgroundColor: '#FF7F00',
        color: 'white',
        '&:hover': {
            backgroundColor: 'darkorange',
        },
    });

    const BlackBorderCard = styled(Card)({
        border: '1px solid black'
    });

    return (
        <BlackBorderCard sx={{ margin: '20px' }}>
            <CardHeader title="Cafés" sx={{ ml: '30px' }} />
            <CardContent>
                <StyledTextField
                    id="type-select"
                    select
                    label="Tipo"
                    value={selectedType}
                    onChange={handleTypeChange}
                >
                    <MenuItem value="hot">Hot</MenuItem>
                    <MenuItem value="iced">Iced</MenuItem>
                </StyledTextField>
                <Link to="/new-cafe">
                    <RightAlignedButton disableElevation>Novo Café</RightAlignedButton>
                </Link>
                <TableContainer component={Paper} sx={{ height: 'calc(100vh - 400px)', overflowY: 'scroll' }}>
                    <Table>
                        <TableHead>
                        </TableHead>
                        <TableBody>
                            {cafes.map((cafe, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>
                                        <Link to={`/cafe/${cafe.title}`}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div style={{ marginRight: '10px' }}>{cafe.title}</div>
                                                <div style={{ fontSize: '12px', color: 'gray' }}>{cafe.type}</div>
                                            </div>
                                        </Link>
                                    </TableCell>
                                    <TableCell>{selectedType.toUpperCase()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            </CardContent>
        </BlackBorderCard>
    );
};

export default CafeList;
