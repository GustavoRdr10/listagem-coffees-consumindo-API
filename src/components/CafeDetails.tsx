import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import styled from '@mui/material/styles/styled';

export type Cafe = {
  title: string;
  type: string | 'Hot' | 'Iced';
}
type CafeDetailsProps = {
  cafes: Cafe[];
  setFilteredCafes: (updatedCafes: Cafe[]) => void;
};

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

const StyledCard = styled(Card)({
  maxWidth: 1500,
  margin: 'auto',
  border: '1px solid black',
  marginTop: '20px'
});

const TextFieldContainer = styled('div')({
  marginBottom: '20px',
  marginTop: '50px',
  marginLeft: '30px',
});

const ButtonSave = styled(Button)({
  marginLeft: 'auto',
  top: '-320px',
  marginTop: '-38px',
  backgroundColor: '#FF7F00',
  color: 'white',
  '&:hover': {
    backgroundColor: '#ff8c00',
  },
});

const ButtonDelete = styled(Button)({
  marginLeft: '1250px',
  top: '-320px',
  marginTop: '-38px',
  backgroundColor: '#FF7F00',
  color: 'white',
  '&:hover': {
    backgroundColor: '#ff8c00',
  },
});

const CafeDetails = ({ cafes, setFilteredCafes }: CafeDetailsProps) => {
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();
  const [showSaveSnackbar, setShowSaveSnackbar] = useState<boolean>(false);
  const [editedCafe, setEditedCafe] = useState<Cafe | null>({ title: '', type: 'Hot' });
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  useEffect(() => {
    const cafe = cafes.find(cafe => cafe.title === title);
    if (cafe) {
      setEditedCafe(cafe);
    }
  }, [cafes, title]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (editedCafe) {
      setEditedCafe({
        ...editedCafe,
        [name]: value
      });
    }
  };

  const handleSaveClick = () => {
    try {
      if (editedCafe) {
        const updatedCafes = cafes.map(cafe => cafe.title === editedCafe.title ? editedCafe : cafe);
        setFilteredCafes(updatedCafes);
        setShowSaveSnackbar(true);
        setSnackbarMessage('Café salvo com sucesso!');
      }
      navigate('/cafes');
    } catch (error: any) {
      alert(`Ocorreu um erro ao salvar o café: ${error.message}`);
      console.error(error);
    }
  };

  const handleDeleteClick = () => {
    if (editedCafe) {
      const updatedCafes = cafes.filter(cafe => cafe.title !== editedCafe.title);
      setFilteredCafes(updatedCafes);
      setEditedCafe(null);
      setShowSnackbar(true);
      setSnackbarMessage('Café excluído com sucesso!');
    }
    setShowDeleteDialog(false);
    navigate(-1);
  };

  const handleBackClick = () => {
    navigate(-1);
  };
  if (!editedCafe) {
    return <div>Café não encontrado</div>
  }

  const CustomParagraph = styled('p')({
    fontWeight: 'bold',
    borderBottom: '2px solid #FF7F00',
    borderColor: '#ccc',
    backgroundPosition: '0 calc(100% - 20px)',
    backgroundRepeat: 'repeat-x',
    textDecorationThickness: '0.25px',
    textDecorationOffset: '10px',
    marginTop: '10px',
    paddingBottom: '18px',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 8,
      bottom: '1px',
      width: '7.5%',
      height: '8px',
      top: '29px',
      backgroundColor: 'orange'
    },
    marginLeft: '35px',
  });

  const Container = styled(Box)({
    width: '98%',
    display: 'inline-block',
    paddingTop: '-1px',
  });

  const RightAlignedButton = styled(Button)(({ theme }) => ({
    position: 'absolute',
    top: '38px',
    left: '30px',
    marginRight: '20px',
    color: theme.palette.text.primary,
  }));

  const StyledParagraph = styled('p')({
    marginTop: '10px',
    fontSize: '24px',
    fontWeight: 'bold',
  });

  const CustomTypography = styled(Typography)<{ component: string }>({
    display: 'flex',
    alignItems: 'center',
    marginLeft: '35px',
    marginTop: '5px',
  });

  return (
    <StyledCard>
      <CardContent>
        <Container>
          <CustomTypography variant="h5" component="h2">
            Detalhes do Café
            <RightAlignedButton onClick={handleBackClick} startIcon={<ArrowBackIcon />} />
          </CustomTypography>
          <CustomParagraph>Dados gerais</CustomParagraph>
        </Container>
        <StyledParagraph></StyledParagraph>
        <TextFieldContainer>
          <StyledTextField
            label="Nome"
            name="title"
            value={editedCafe.title}
            disabled
          />
        </TextFieldContainer>
        <div>
          <TextFieldContainer>
            <StyledTextField
              label="Tipo"
              name="type"
              value={editedCafe.type}
              onChange={handleInputChange}
              select
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 400,
                    },
                  },
                  MenuListProps: {
                    style: {
                      width: '100px',
                    },
                  },
                },
              }}
            >
              <MenuItem value="Hot">Hot</MenuItem>
              <MenuItem value="Iced">Iced</MenuItem>
            </StyledTextField>
          </TextFieldContainer>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ButtonDelete variant="contained" onClick={handleDeleteClick}>Excluir</ButtonDelete>
          <ButtonSave variant="contained" onClick={handleSaveClick}>Salvar</ButtonSave>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ButtonDelete variant="contained" onClick={() => setShowDeleteDialog(true)}>Excluir</ButtonDelete>
          <ButtonSave variant="contained" onClick={handleSaveClick}>Salvar</ButtonSave>
        </div>
        <Dialog
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
        >
          <DialogTitle>Excluir café?</DialogTitle>
          <DialogContent>
            <Typography>Deseja realmente excluir o café?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDeleteDialog(false)}>Cancelar</Button>
            <Button onClick={handleDeleteClick} variant="contained" color="error">Excluir</Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </StyledCard >
  );
};

export default CafeDetails;

