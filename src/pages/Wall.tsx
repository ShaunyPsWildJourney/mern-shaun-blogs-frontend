import Card from "../components/blog_posts/Card"
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import * as React from 'react';
import { Typography, Box,  } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from "axios";


export default function Wall() {

  const [ counter, setCounter ] = useState<number>(0);
  const [ blogContent, setBlogContent ] = useState()

  function checkBodies() {
    setCounter(prev => prev += 1 )
  }

  async function content() {
    const config = {
      headers: {
        "Content-type": "application/json",
        "Authorization": "im8pIEUKwNN59iRowAFwClbXrzpwgISkhdcEYcjK4EuQI0TGNq35N7Pk6Slo0Ouz",
        "collection":"bloggers",
        "database":"test",
        "dataSource":"Cluster0",
        "Access-Control-Request-Headers": "*"
      },
    };
    const res = await axios.get(
      'https://data.mongodb-api.com/app/data-bjbni/endpoint/data/v1/', 
        config 
      ) //api/bloggers

    setBlogContent(res.data)
  }
  useEffect(() => {
    content()
  }, [])
  

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" >
        <Box sx={{ 
            bgcolor:  '#f4f5f8'  , 
            transition: 'background-color 0.5s',

          }}>

          <Box sx={{
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                pt: 10,
                mb: 12
                }}>
            <Typography variant='body2' 
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    color: '#0072E5'
                  }}>
              Blog
            </Typography>
            <Typography variant='h1' 
                  sx={{
                    
                  }}>
              The 
              <span style={{
                background: 'linear-gradient(to right, #007FFF, #0059B2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '700'
              }}> latest </span> 
              made up stuff
            </Typography>
          </Box>

{blogContent && 
        <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
              mb: 10,
              transition: 'all 5s'
             
        }}>

        {[...blogContent].map((article: any, index) => {
          return <Card  key={index} 
                        checkBodies={checkBodies} 
                        counter={counter} 
                        tag={article.tag}
                        tag2={article.tag2}
                        header={article.header}
                        body={article.body}
                        date={article.createdAt}
                        name={[article.firstName, article.lastName]}
                        />
        })
        }
        </Box>
}



        </Box>
      </Container>
    </React.Fragment>
      
      
   
  )
}