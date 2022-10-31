import { CssBaseline, Container, Box, Stack, Paper, styled, Divider, Typography } 
from "@mui/material";
import React from "react";






export default function Profile() {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



return (
  <React.Fragment>
  <CssBaseline />
    <Container maxWidth={false} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        height: 'calc(100vh - 380px)',
        mt: 10
        // width: '100%'
    }}>
      <Box sx={{
        border: '2px solid lightblue',
        height: '100%',
        width: '30%',
        backgroundColor: 'white',
      }}>
        <Stack
          direction="column"
          justifyContent="flex-start"
          // spacing={4}
          divider={<Divider orientation="horizontal" flexItem />}
          sx={{
            height: '100%',
            width: '100%',
            backgroundColor: 'lightgrey',
          }}
        >
          <Item sx={{height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            Personal Details</Item>
          <Item sx={{height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            Your Posts</Item>
          <Item sx={{height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            Something</Item>
          <div style={{flexGrow: 1}}></div>
          <Item sx={{height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            Logout</Item>

        </Stack>
      </Box>

      <Box sx={{
        border: '2px solid lightblue',
        height: '100%',
        width: '70%',
        backgroundColor: 'white',
      }}>
        <Typography variant='h1' textAlign='center' sx={{mt: 20}}>
          Work in progress
        </Typography>
      </Box>



    </Container>
  </React.Fragment>
)
}