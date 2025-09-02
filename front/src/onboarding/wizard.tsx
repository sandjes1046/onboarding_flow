import { Stepper,Step,StepLabel, Button, CircularProgress } from '@mui/material';
import {useState, useEffect} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import Step2 from './step2';
import Step3 from './step3';
import './steps.css'
import client from '../client'
import {} from '../types'
import {LocationState} from '../interfaces'

function Wizard() {

    const location = useLocation();
    const navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [step,setStep] = useState(0); 
    
    useEffect(() => {
        async function fetchData() {
            //first check if user is allowed here
            const state = location.state as LocationState;

            console.log(state);
            if(state === null || state?.email === null || state?.password === null){
                //redirect to intro step
                navigate('/', { replace: true } )
            } 
            else
            {
                //if user already completed register they would not get here
                //if user register is not complete they get here

                //get users current step from backend and redirect them to that step
                //set user email,password,step,
                try {
                    
                    const result = await client.get('/user/get-user', { params: { email: state.email,password:state.password } });

                    setEmail(state.email);
                    setPassword(state.password);

                    if(result.data.complete === true)
                    {
                        //user already completed register
                        navigate('/login', { replace: true } )
                    }
                    else
                    {
                        setStep(result.data.step);
                    }
                } catch (error) {
                    alert("Refresh and try again")
                    console.error("Wizard useEffect Error: ", error);
                }
            }   
        }
        fetchData();
        
    }, []);
    
    //if on step 3 they can go back to step 2
    const backButton = () => {
        if(step > 2){
            return(
                <Button 
                    sx={{borderColor:'black',color:'black', width: '50%', maxWidth: 150, backgroundColor:'lightgray',
                        '&:hover': {
                            boxShadow: '0 4px 16px 0 #ff69b4', // Pink shadow on hover
                            backgroundColor: '#ff69b4',    // Keep background color on hover
                        },
                    }} 
                    variant='outlined' onClick={() => setStep(step-1)}
                >
                Back
                </Button>
            )
        }
        return null;
    }

    const wizardStepTwo = () => {
        return(
            <Step2 email={email} step={step} setStep={setStep}/>
        )
    }

    const wizardStepThree = () => {
        return(
            <Step3 backButton={backButton} email={email} step={step} setStep={setStep}/>
        )
    }

    //moves the user along depending on the value of step
    const renderStep = () => {
        switch(step){
            case 2: return wizardStepTwo();
            case 3: return wizardStepThree();
            case 0: return <div className='flex w-full h-full justify-center align-center items-center'><CircularProgress/></div>;
            default: return <div className='flex w-full h-full justify-center align-center items-center'>Invalid Step</div>;
        }
    }


 
    
    return(
        <div className='w-screen h-screen md:overflow-hidden'>
            {/**This is the progress bar that shows above every step after they enter email and password */}
            <div className='flex w-full justify-center pb-32'>
                <Stepper className='custom-stepper' activeStep={step === 2 ? 0 : step === 3 ? 1 : -1} alternativeLabel>
                        <Step>
                            <StepLabel>Details</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Final</StepLabel>
                        </Step>
                </Stepper>
            </div> 

            {renderStep()}
        </div>
    );
}

export default Wizard;