import { TextField } from '@mui/material';
import { Controller } from "react-hook-form";

export default function AddressFields({fieldAnswers,setFieldAnswers,key,rules,control}){
    return(
        <div className='flex flex-col justify-center gap-4'  key={key}>

            <Controller
            key={key+'_street'}
            name={'street'}
            control={control}
            rules={{required:rules.required+'street'}}
            render={({ field, fieldState }) => (
                    <TextField 
                    {...field}
                    type='text' 
                    label={'Street'} 
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}  
                    slotProps={{
                        inputLabel: { shrink: true}
                    }}
                    />
                )}
            />

            <Controller
            key={key+'_city'}
            name={'city'}
            control={control}
            rules={{required:rules.required+'city'}}
            render={({ field, fieldState }) => (
                    <TextField 
                    {...field}
                    type='text' 
                    label={'City'} 
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}  
                    slotProps={{
                        inputLabel: { shrink: true}
                    }}
                    />
                )}
            />

            <Controller
            key={key+'_state'}
            name={'state'}
            control={control}
            rules={{required:rules.required+'state'}}
            render={({ field, fieldState }) => (
                    <TextField 
                    {...field}
                    type='text' 
                    label={'State'} 
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}  
                    slotProps={{
                        inputLabel: { shrink: true}
                    }}
                    />
                )}
            />

            <Controller
            key={key+'_zip'}
            name={'zip'}
            control={control}
            rules={{required:rules.required+'zip'}}
            render={({ field, fieldState }) => (
                    <TextField 
                    {...field}
                    slotProps={{
                        inputLabel: { shrink: true},
                        htmlInput:{type:'number',
                    sx:{
                        '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                            WebkitAppearance: 'none',
                            margin: 0,
                            },
                            MozAppearance: 'textfield',
                            }
                        }}
                    } 
                    label={'Zip'}  
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}  
                    onChange={(e) => {
                    const val = e.target.value;
                    // Allow only digits, max 5
                    if (/^\d{0,5}$/.test(val)) {
                    field.onChange(val);
                    setFieldAnswers({ ...fieldAnswers, zip: val });
                    }
                    }}
                    onKeyDown={(e) => {
                        // prevent e, +, -, .
                        if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                        e.preventDefault();
                        }
                    }}
                />
                )}
            />

            
        </div>
    )
}