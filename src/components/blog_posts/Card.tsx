import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { Avatar, Typography, Box, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState , useEffect } from 'react'; 
import { useWindowSize } from '@react-hook/window-size';


type IProps = {
  checkBodies: () => void; 
  counter: number;
  tag: string;
  tag2: string;
  header: string;
  body: string;
  date: string;
  name: string[];
}


export default function Card( 
  {checkBodies, counter, tag, tag2, header, body, date, name}: IProps) {

  const [ showBody, setShowBody ] = useState<boolean>(false)
  const [ delayText, setDelayText ] = useState<boolean>(false)
  const [ onlyWidth ] = useWindowSize();

  function handleExpandPost() {

    if (!showBody) {
      checkBodies();
    }
    // eslint-disable-next-line 
    const renderAfteruseEffect = setTimeout(() => {
      setShowBody(prev => !prev)
    }, 5) 


    if (!delayText) {
      const timer = setTimeout(() => {
        setDelayText(prev => !prev)
    }, 250);
    return () => clearTimeout(timer);
    } else {
      setDelayText(prev => !prev)
    }
  }

  useEffect(() => {
    setShowBody(false)
    setDelayText(false)
  }, [counter])

  return (
    <Paper elevation={3} sx={{
          position: 'relative',
          width: !showBody ? '518px' : `${onlyWidth * 0.8}px`, 
          minWidth: '400px',
          maxHeight: !showBody ? '300px' : '700px',
          p: 3, 
          borderRadius: 3, 
          color: '#1A2027', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'space-around',
          transition: 'width 0.4s, max-height 0.6s, maxHeight 0.6s',
          ":hover": {
            boxShadow: 8,
            },
          }}
          
          >
      <Box 
           sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            mb: 2,
            fontWeight: '500',
            
          }}>
        <Chip label={tag.toUpperCase()} 
          sx={{color: '#3E5060', height: '22px'}}/>
        <Chip label={tag2.toUpperCase()} 
          sx={{color: '#3E5060', height: '22px'}}/>     
      </Box>


        <Typography variant='h2' sx={{mb: '5px', fontSize: !showBody ? '1.125rem' : '1.6rem' }}>
        {header}
        </Typography>
      
        {!delayText ?
        <Typography variant='body1'>
          {`${body.substring(0, 110)} . . . . .`}
        </Typography>
        :
        <Box >
          <Typography variant='body1' sx={{mb: 1}}>{body}</Typography>
        </Box>
        }

        <Avatar  sx={{
            mt: '20px',
            mb: '10px',
            height: '34px',
            width: '34px'
            }}>
        </Avatar> 

      <Box  sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '45px'
            }}>
        <Box >
          <Typography variant='body2' 
          > {`${name[0]} ${name[1]}`}
          </Typography>
          <Typography sx={{
            fontSize: '0.75rem'
          }}> 
            {date.substring(0, 10)}
          </Typography>
        </Box>
          <Button onClick={handleExpandPost}
            sx={{
            fontSize: '0.825rem',
            fontWeight: '700',
            textTransform: 'none'
          }}>
            {!showBody ? 'Read More' :'Read Less'}
            <ArrowForwardIosIcon sx={{fontSize: 'small'}}/>
          </Button> 
      </Box>

    </Paper>

  )
}
 


