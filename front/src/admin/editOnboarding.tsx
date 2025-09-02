import {useState, useEffect} from 'react';
import { Card, Grid, Typography, Box, Button, Toolbar, CardContent, Select, Menu, MenuItem,Alert, Slide } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {useNavigate} from 'react-router-dom';
import '../App.css'
import client from '../client'
import MenuIcon from '@mui/icons-material/Menu';
import {database_admin, OnboardingFields} from '../types'

function EditOnboarding() {

    const [anchorEl, setAnchorEl] = useState<React.MouseEvent<HTMLButtonElement>['currentTarget'] | null>(null);
    const [triangleIn, setTriangleIn] = useState(false);
    const [appearField, setAppearField] = useState(false);
    const [showTitle, setShowTitle] = useState(false);

    const [fields, setFields] = useState<OnboardingFields>({}); //{about_me:{title:'About Me',step:2},birthday:{title:'Birthday',step:3},address:{title:'Address',step:2}}

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showsuccessAlert, setShowSuccessAlert] = useState(false);


    const errorAlert = () => {
        return (
            <Slide 
                direction="right" 
                in={showErrorAlert} 
                mountOnEnter 
                unmountOnExit
            >
                <Alert
                    severity="error"
                    sx={{
                        mt: 2,
                        width: 'fit-content', // Adjust width to content
                        minWidth: 300,
                    }}
                >
                    Make sure each onboarding step has at least one field assigned to it.
                </Alert>
            </Slide>
        );
    }

    const summonErrorAlert = () => {
        setShowErrorAlert(true);
        setTimeout(() => setShowErrorAlert(false), 4000);
    }

    const successAlert = () => {
        return (
            <Slide 
                direction="right" 
                in={showsuccessAlert} 
                mountOnEnter 
                unmountOnExit
            >
                <Alert
                    severity="success"
                    sx={{
                        mt: 2,
                        width: 'fit-content', // Adjust width to content
                        minWidth: 300,
                    }}
                >
                    Onboarding updated successfully!
                </Alert>
            </Slide>
        );
    }

    const summonSuccessAlert = () => {
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 4000);
    }

    const navigate = useNavigate();

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {      
        setTimeout(() => setTriangleIn(true), 100);
        setTimeout(() => setAppearField(true), 120);
        setTimeout(() => setShowTitle(true), 300);

        async function fetchData(){
            //call route to get what fields go here
            //get user data to prefill fields if they exist fieldAnswers
            try {
                const result = await client.get('/admin/get-onboarding');
                setFields(result.data.fields)//{about_me:{title:'About Me',step:2},birthday:{title:'Birthday',step:3},address:{title:'Address',step:2}}
            } catch (error) {
                alert("Refresh and try again")
                console.error("EditOnboarding useEffect Error: ", error);
            }
        }
        fetchData();

    }, []);

    const handleSave = async() => {
        try {
            //validate at least one field is assigned to each step
            let step2 = false
            let step3 = false

            for(const key in fields)
            {
                if(fields[key].step === 2){ step2 = true}
                if(fields[key].step === 3){ step3 = true}
            }

            if(!step2 || !step3)
            {
                summonErrorAlert();
                return;
            }
            else
            {
                //update fields in backend
                await client.put('/admin/save-onboarding', {fields});
                summonSuccessAlert();
                return;
            }

        } catch (error) {
            alert("Refresh and try again")
            console.error("EditOnboarding handleSave Error: ", error);
        }
    }

    return (
        <div className='relative w-screen h-screen overflow-hidden'>

            <div className='absolute top-16 right-0  max-w-lg z-10'>
                {showErrorAlert ? errorAlert() : null}
                {showsuccessAlert ? successAlert() : null}
            </div>

            <Toolbar className='flex justify-end' sx={{ boxShadow: '0 4px 10px 0 rgba(0,0,0,0.15)',}}>
                <Button 
                    TouchRippleProps={{className: 'custom-ripple'}} 
                    sx={{
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
                    <MenuItem TouchRippleProps={{className: 'custom-ripple'}} onClick={() => {navigate('/',{replace: false})}}> Log Out </MenuItem>
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

            <div className='absolute inset-0 flex flex-col items-center justify-center align-center'>
                 <h1 
                    style={{
                        transition: 'opacity 1s cubic-bezier(.77,0,.18,1), transform 1s cubic-bezier(.77,0,.18,1)',
                        opacity: showTitle ? 1 : 0,
                        transform: showTitle ? 'translateY(0)' : 'translateY(-40px)',
                    }}  
                    className=" flex flex-col h-2/3 justify-center text-center text-[55px] sm:text-[120px] text-gray-800"
                >
                    Edit Onboarding 
                </h1>
                
                <div className='flex flex-row h-full w-full justify-center items-start align-center '>
                    <Card className='flex flex-col justify-center' 
                        sx={{boxShadow:'0 4px 16px 0 rgba(0,0,0,0.3)', width:'90%', maxWidth:800,
                            transform: appearField ? 'translateX(0)' : 'translateX(100vw)',
                            transition: 'transform 0.7s cubic-bezier(.77,0,.18,1)'
                        }}
                    >

                        <CardContent sx={{display:'grid', gridTemplateColumns:'1fr 1fr'}}>
                            {
                                Object.keys(fields).map((key) => {
                                    return(
                                        <>
                                            <Box sx={{border:1,textAlign:'center',padding:2}}>
                                                <Typography variant='h5'>{fields[key].title}</Typography>
                                            </Box>

                                            <Box sx={{border:1, justifyContent:'center', alignItems:'center', display:'flex'}}>
                                                <Select
                                                    sx={{maxWidth:150, width:{xs:'60%',sm:'60%', md:'60%',lg:'100%'}, maxHeight:40,height:'100%'}}
                                                    value={fields[key] ? fields[key].step : ''}
                                                    onChange={(e) => {setFields({...fields, [key]:{...fields[key], step:e.target.value}})}}
                                                >
                                                    <MenuItem value={2}>Details (step 2)</MenuItem>
                                                    <MenuItem value={3}>Final (step 3)</MenuItem>
                                                    <MenuItem value={0}>remove</MenuItem>
                                                </Select>
                                            </Box>
                                        </>
                                    )
                                })
                            }
                           
                        </CardContent>

                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ width: '100%', maxWidth: 100, backgroundColor:'black', margin:'0 auto 16px auto',
                            '&:hover': {
                                boxShadow: '0 4px 16px 0 #ff69b4', // Pink shadow on hover
                                backgroundColor: '#ff69b4',    // Keep background color on hover
                            },
                            }}
                            onClick={() => handleSave()}
                        >
                            Save
                        </Button>
                    </Card>
                </div>


            </div>
        </div>
    );
}
export default EditOnboarding;
