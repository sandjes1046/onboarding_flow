import { Stepper,Step,StepLabel} from '@mui/material';
import '../steps.css'


export default function WizardSteps({user}) {
    return(
<div className='flex w-full justify-center pb-32'>
    <Stepper className='custom-stepper' activeStep={user.step === 2 ? 0 : user.step === 3 ? 1 : -1} alternativeLabel>
            <Step>
                <StepLabel>Details</StepLabel>
            </Step>
            <Step>
                <StepLabel>Final</StepLabel>
            </Step>
    </Stepper>
</div> 
    );
}