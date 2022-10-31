import { Typography,TextField,Button,Box,Container,CssBaseline, Paper
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useState, useEffect } from 'react'; 
import PostFinish from "../components/PostFinish";

export default function Post() {


  const [ tag, setTag ] = useState('');
  const [ tag2, setTag2 ] = useState('');
  const [ header, setHeader ] = useState('');
  const [ content, setContent ] = useState('');
  const [ success, setSuccess ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ name, setName ] = useState('')
  const [ last, setLast ] = useState('')
  const [ postFinish, setPostFinish ] = useState<boolean>(false);
  console.log(`${isLoading} issLoading and Sucess ${success} are yet to be plugged in `)

  // GET NAMES FROM LOCALSTORAGE 
  useEffect(() => {
    let currentUser = JSON.parse(localStorage.getItem('userInfo') || '{}');
    if (currentUser.data) {
      setName(currentUser.data.msg.firstName)
      setLast(currentUser.data.msg.lastName)
    }
    if (currentUser.firstName) {
      setName(currentUser.firstName)
    }

  }, [])


  // GET LAST NAME FROM GET REQUEST IF PREVIOUS USER 
  async function getLastName() {
    const getName = await axios.get(`http://localhost:5000/api/bloggers/`, {
    })
    if (!last) {
      if (getName.data){
        let PATTERN = `${name}`;
        let filtered = getName.data.filter(function (data: any) { return data.firstName.includes(PATTERN); });
        setLast(filtered[0].lastName)
      }
    }
  }
  // COULDNT GET THE NAME TO RENDER BEFORE THE GET REQUEST
  useEffect(() => {
    const timer = setTimeout(() => {
      getLastName()
    }, 50) 
    return () => clearTimeout(timer)
    // eslint-disable-next-line
  }, [])




  type Pays = {
    firstName: string,
    lastName?: string,
    tag: string,
    tag2: string,
    header: string,
    body: string
  }
  const payload: Pays = {
    firstName: name,
    lastName: last,
    tag: tag,
    tag2: tag2,
    header: header,
    body: content
  }


  async function handleBlogPost (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true)
      const data = await axios.post('http://localhost:5000/api/users/blogposts/', {
        ...payload
      });
      console.log(`successful blog posting ${data}`)
      setSuccess(true)

    } catch (error: any) {
      console.log(error.response.data.message)
      console.log('blog opst failed')
    } finally {
      setIsLoading(false)
    }
  }


  return (
  <React.Fragment>
  <CssBaseline />
    <Container maxWidth="xl" sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey'
    }}>

    {postFinish && 
      <PostFinish setPostFinish={setPostFinish}
      />}

      <Paper elevation={3} sx={{
        position: 'relative',
        width: `80%`, 
        minWidth: '400px',
        maxHeight: '700px',
        p: 3, 
        borderRadius: 3, 
        color: '#1A2027', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 5,
        ":hover": {
          boxShadow: 8,
          },
        }}
        >
          <Typography variant='h1' 
                  sx={{
                    
                  }}>
              Create your 
              <span style={{
                background: 'linear-gradient(to right, #007FFF, #0059B2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '700'
              }}> BLOG </span> 
            </Typography>

      <Box component="form"  onSubmit={handleBlogPost}  sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '300px',
            width: '70%',
          }}>

        <Box sx={{
          display: 'flex',
          gap: '2rem',
          width: '100%',
          justifyContent: 'flex-start',
        }}>
          <TextField
          onChange={(e) => setTag(e.target.value)}
          type="text"
          label="Tag 1"
          variant="outlined"
          sx={{
            maxWidth: '150px',
          }}
        />
        <TextField
          onChange={(e) => setTag2(e.target.value)}
          type="text"
          label="Tag 2"
          variant="outlined"
          sx={{
            maxWidth: '150px',
          }}
        />
      </Box>
      <br />
        <TextField
          onChange={(e) => setHeader(e.target.value)}
          type="text"
          label="Catchy heading"
          variant="outlined"
          sx={{
            width: '100%',
            minWidth: '300px',
          }}
        />
        <br />
        <TextField
          onChange={(e) => setContent(e.target.value)}
          type="text"
          label="Write article"
          variant="outlined"    
          multiline
          rows={10}
          sx={{
            width: '100%',
            minWidth: '300px',
          }}
        />
        <br />
        <br />
        <Button 
                onClick={() => setPostFinish(true)}
                variant="contained" color="primary" type="submit" size="large" 
                sx={{
                  backgroundColor: 'primary.light', 
                  fontWeight: 600,
                }}
            
            >
          POST
        </Button>
      </Box>
      </Paper>
  </Container>
  </React.Fragment>
  );
}