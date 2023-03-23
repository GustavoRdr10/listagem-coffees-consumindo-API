import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Snackbar, Card, CardContent, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

export type Cafe = {
  title: string;
  type: string;
}

type NewCafeProps = {
  handleNewCafe: (newCafe: Cafe) => void;
}

const PageContainer = styled('div')`
  margin: 20px;
  margin-top: 20px;
`;

const CustomCard = styled(Card)({
  border: '1px solid black',
});

const NewCafe = ({ handleNewCafe }: NewCafeProps) => {
  const navigate = useNavigate();
  const [cafe, setCafe] = useState<Cafe>({ title: '', type: '' });
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCafe({
      ...cafe,
      [name]: value
    });
  };

  const handleSaveClick = () => {
    if (!cafe.title || !cafe.type) {
      setErrorMessage('Preencha todos os campos');
      setOpenErrorSnackbar(true);
      return;
    }
    handleNewCafe(cafe);
    setOpenSuccessSnackbar(true);
    navigate('/');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleErrorSnackbarClose = () => {
    setOpenErrorSnackbar(false);
  }

  const RightAlignedButton = styled(Button)(({ theme }) => ({
    position: 'absolute',
    top: '38px',
    left: '30px',
    marginRight: '20px',
    color: theme.palette.text.primary,
  }));

  const ButtonSave = styled(Button)({
    backgroundColor: '#FF7F00',
    color: 'white',
    top: '-280px',
    right: '50px',
    float: 'right',
    marginTop: '20px',
    '&:hover': {
      backgroundColor: '#ff8c00',
    },
  });

  const CustomTypography = styled(Typography)<{ component: string }>({
    display: 'flex',
    alignItems: 'center',
    marginLeft: '30px',
  });

  const CustomTextField = styled(TextField)({
    "& .MuiSelect-select": {
      minWidth: "177px",
    },
    "& .MuiInput-root": {
      width: "100%",
    },
  });

  const TextFieldContainer = styled('div')({
    marginBottom: '20px',
  });

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
    }
  });

  const Container = styled(Box)({
    width: '98%',
    display: 'inline-block',
    paddingTop: '5px',
  });

  return (
    <PageContainer>
      <CustomCard>
        <CardContent>
          <CustomTypography variant="h5" component="h2">
            Novo Café
            <RightAlignedButton onClick={handleBackClick} startIcon={<ArrowBackIcon />} />
          </CustomTypography>
          <Container>
            <CustomParagraph>Dados gerais</CustomParagraph>
          </Container>
          <div>
            <TextFieldContainer>
              <TextField
                label="Nome"
                name="title"
                value={cafe.title}
                onChange={handleInputChange}
                autoFocus
              />
            </TextFieldContainer>
          </div>
          <div>
            <TextFieldContainer>
              <CustomTextField
                label="Tipo"
                name="type"
                select
                value={cafe.type}
                onChange={handleInputChange}
              >
                <MenuItem value="Hot">Hot</MenuItem>
                <MenuItem value="Iced">Iced</MenuItem>
              </CustomTextField>
            </TextFieldContainer>
          </div>
          <ButtonSave variant="contained" onClick={handleSaveClick}>Salvar</ButtonSave>
          <Snackbar
            open={openErrorSnackbar}
            autoHideDuration={3000}
            onClose={handleErrorSnackbarClose}
            message={errorMessage}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            style={{ marginTop: '50px' }}
          />

        </CardContent>
      </CustomCard>
    </PageContainer>
  );
};

export default NewCafe;
