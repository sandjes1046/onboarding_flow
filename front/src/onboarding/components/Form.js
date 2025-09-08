import { TextField, Button } from '@mui/material';
import FormTextField from './FormTextField';
import { useForm } from "react-hook-form";
import AddressFields from './AddressFields';
import SubmitButtons from './SubmitButtons';
import { useEffect } from 'react';

export default function Form({setLoading,  onSubmit, fieldAnswers, setFieldAnswers,user,defaultValues={}}){

    const initDefaultValues = () => {
        let defaultValues = {};
        for(const key in user.fields){
            if(key === "address"){
                defaultValues['street'] = fieldAnswers['street'] || '';
                defaultValues['city'] = fieldAnswers['city'] || '';
                defaultValues['state'] = fieldAnswers['state'] || '';
                defaultValues['zip'] = fieldAnswers['zip'] || '';
            }
            else{
                defaultValues[key] = fieldAnswers[key] || '';
            }
        }
        return defaultValues;
    }

    const { handleSubmit, control,reset } = useForm({
        defaultValues: initDefaultValues()
    });

    useEffect(() => {
    if (user.status === "completed" && Object.keys(user.fields || {}).length > 0) {
        reset(user.answers);
        setFieldAnswers({ ...user.answers });
        setLoading(false);
    }
    }, [user, reset]);
   

    return(
        
            <form  className='flex flex-col gap-16' onSubmit={handleSubmit(onSubmit)}>
                {
                    Object.keys(user.fields).map((key) => {

                        if(key === "birthday")
                        {
                            return(
                                <FormTextField
                                    key={key}
                                    name={key}
                                    label={user.fields[key].title}
                                    type="date"
                                    control={control}
                                    slotProps={{ inputLabel: { shrink: true} }}
                                    fullWidth={true}
                                    //value={moment(fieldAnswers[key]).format("YYYY-MM-DD")|| ''}
                                    rules={{ required: "Birthday is required" }}
                                />
                            )
                        }

                        if(key === "address")
                        {
                            return(
                                <AddressFields control={control} fieldAnswers={fieldAnswers} setFieldAnswers={setFieldAnswers} key={key} rules={{required:'Enter your '}}/>
                            )
                        }

                        if(key === "about_me")
                        {
                            return(

                                <FormTextField
                                    key={key}
                                    name={key}
                                    label={user.fields[key].title}
                                    type="text"
                                    placeholder="Tell us about yourself"
                                    multiline={true}
                                    rows={5}
                                    control={control}
                                    slotProps={{ inputLabel: { shrink: true} }}
                                    fullWidth={true}
                                    //value={moment(fieldAnswers[key]).format("YYYY-MM-DD")|| ''}
                                    rules={{ required: "This field is required", maxLength: { value: 500, message: "Maximum length is 500 characters" } }}
                                />
                            )
                        }
                    })                       
                }

                <SubmitButtons user={user} setLoading={setLoading}/>
            </form>
               
    )
}