import { Card, CardContent } from '@mui/material';
import {useState, useEffect, } from 'react';

export default function CardContainer({children}){

    const [appearField, setAppearField] = useState(false);

        useEffect(() => {        
            setTimeout(() => setAppearField(true), 100);            
        }, []);
    
    

    return(
        <div className='flex w-full h-full justify-center align-start items-start'>
            <Card
                sx={{
                    transform: appearField ? 'translateY(0vh)' : 'translateY(100vh)',
                    transition: 'transform 0.7s cubic-bezier(.77,0,.18,1)',
                    width: {  xs: '90%', sm: '70%', md: '50%', lg: '30%' },
                }}
            >
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </div>
    )
}