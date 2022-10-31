import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Shaun's Practice Full Stack
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();




export default function Login( )  {

  const [ email, setEmail ] = useState<FormDataEntryValue | null>('');
  const [ password, setPassword ] = useState<FormDataEntryValue | null>('');
  const [ error, setError ] = useState<any>(false);
  const [ loading , setLoading ] = useState(false);

  let navigate = useNavigate();

  function cleanUp() {
    setLoading(false)
    setEmail('')
    setPassword('')
  }



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {

      setLoading(true)
      const { data } = await axios.post(
        'https://data.mongodb-api.com/app/data-bjbni/endpoint/data/v1', //api/login
        {
          email, 
          password
        }
      );
      localStorage.setItem('userInfo', JSON.stringify(data))
      console.log(data)
      navigate('/wall');

    } catch (error: any) {
      console.log(error.response.data.message)
      setError(true)

    } finally {
      cleanUp()
    }
  };





  return (
    <ThemeProvider theme={theme}>
      <Container  maxWidth="xs"
        sx={{
          height: 'calc(100vh - 380px)'
        }}>
        {loading && <Loader /> }
        {error && <Error setError={setError} />}
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {/* Forgot password? */}
                </Link>
              </Grid>
              <Grid item>
                  <Link component={RouterLink} to='/register' 
                        variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>  
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

