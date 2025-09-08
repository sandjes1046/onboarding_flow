import {Button, Card, IconButton, Menu, MenuItem, TextField, Toolbar} from '@mui/material';
import React, {useState, useEffect, FormEvent} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import '../App.css'
import {useNavigate} from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useSelector, useDispatch} from 'react-redux'
import {getUser} from '../controllers/userController'
import {clearUser} from '../models/userSlice'
function Step1() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [triangleIn, setTriangleIn] = useState(false);
  const [appearField, setAppearField] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showVisibility, setShowVisibility] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  
  useEffect(() => {
    setEmail('');
    setPassword('');
    dispatch(clearUser())

    setTimeout(() => setTriangleIn(true), 100);
    setTimeout(() => setAppearField(true), 120);
    setTimeout(() => setShowTitle(true), 300); 

  }, []);



  const handleSubmit = async(e) => {
    e.preventDefault();
    if(email && password){
      dispatch(getUser({email,password,navigateLogin:navigate('/login', { replace: false } ),navigateWizard:navigate('/wizard', { replace: false } )}))
    }
    
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
         
      <Toolbar className='flex justify-end' sx={{ boxShadow: '0 4px 10px 0 rgba(0,0,0,0.15)',}}>
        <Button TouchRippleProps={{className: 'custom-ripple'}} sx={{
          zIndex:1,
          '&:hover': {
            boxShadow: '0 4px 16px 0 #ff69b4', // Pink shadow on hover
            backgroundColor: '#ff69b4',    // Keep background color on hover
          },
        }} 
        color="primary" onClick={handleMenuOpen}>
          <MenuIcon sx={{color:'black'}}/>
        </Button>
        <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleMenuClose}>
          <MenuItem TouchRippleProps={{className: 'custom-ripple'}}> Log In </MenuItem>
          <MenuItem  TouchRippleProps={{className: 'custom-ripple'}} onClick={() => { handleMenuClose() }}> <KeyboardReturnIcon/> </MenuItem>

        </Menu>
      </Toolbar>

      {/* Pink triangle background */}
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: '50vh solid transparent',
          borderBottom: '50vh solid transparent',
          borderLeft: triangleIn ? '60vw solid #ff69b4' : '0 solid #ff69b4',
          position: 'absolute',
          left: 0,
          top: 0,
          filter: 'drop-shadow(4px 0 16px rgba(0,0,0,0.3))', // Add this line
          zIndex: 0,
          transition: 'border-left-width 0.8s cubic-bezier(.77,0,.18,1)', // Smooth swipe

        }}
      />  

      <div className="absolute inset-0 flex flex-col items-center justify-center align-center">
        <h1 
          style={{
            transition: 'opacity 1s cubic-bezier(.77,0,.18,1), transform 1s cubic-bezier(.77,0,.18,1)',
            opacity: showTitle ? 1 : 0,
            transform: showTitle ? 'translateY(0)' : 'translateY(-40px)',
          }}  
          className=" flex flex-col h-2/3 justify-center text-center text-[80px] sm:text-[120px] text-gray-800"
        >
          Welcome 
        </h1>

        <div className='h-full'>
          <Card
          className='flex flex-col items-center justify-center gap-8'
          sx={{
            padding:'16px',
            transform: appearField ? 'translateX(0)' : 'translateX(100vw)',
            transition: 'transform 0.7s cubic-bezier(.77,0,.18,1)',
          }}>
            <span className=' text-[25px] sm:text-[30px] text-gray-800'>Register</span>
            <form className='flex flex-col gap-4' autoComplete='off' onSubmit={handleSubmit}>
              <TextField required value={email} onChange={(e) => {setEmail(e.target.value)}} autoComplete= "new-email" type='email' label="Email" variant="outlined"  sx={{ width: '100%', maxWidth: 300 }} />
              <TextField required value={password} onChange={(e) => {setPassword(e.target.value)}} autoComplete="new-password" label="Password" variant="outlined"  
                type={showVisibility ? "text" : "password"}
                sx={{ width: '100%', maxWidth: 300 }}
                slotProps={{
                  input:{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton sx={{padding:0 }} onClick={() => setShowVisibility(!showVisibility)}>
                          {
                            showVisibility ?
                            <Visibility />
                            :
                            <VisibilityOff />
                          }
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                
                }}
              />
              <Button
                variant="contained"
                color="primary"
                type='submit'
                sx={{ width: '100%', maxWidth: 300, backgroundColor:'black',
                  '&:hover': {
                    boxShadow: '0 4px 16px 0 #ff69b4', // Pink shadow on hover
                    backgroundColor: '#ff69b4',    // Keep background color on hover
                  },
                }}
                
              >
                Next
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Step1;
