import {useState,useEffect} from 'react'
import {Table,TableHead,TableBody,TableRow,TableCell, Typography, TableContainer, Paper} from '@mui/material'
import client from '../client'
import { database_admin,database_users } from '../types'

function DataTable () {

    type database= {
        users: database_users[];
        admin: database_admin[];

    }

    const [data,setData] = useState<database>({users:[],admin:[]})

    useEffect(() => {
        async function fetchData(){
                try {
                
            
                    //get DB data
                    

                    const result = await client.get('data/get-data')//{users:[],admin:[]} 
                    setData(result.data)
                } catch (error) {
                    console.log('useEffect error:',error)
                    alert('Refresh and try again')
                }
        }
        fetchData()

    },[])

    return(
        <div className="relative w-screen h-screen overflow-hidden">
            <div className='flex flex-col w-full h-full justify-center align-center items-center gap-y-16'>

                <div className='flex w-4/5'>
                    <TableContainer component={Paper} sx={{maxHeight:500,border:1}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={10} align='center' sx={{borderBottom:3}}>
                                        User Data
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{borderBottom:2}}>
                                        Email
                                    </TableCell>
                                    <TableCell sx={{borderBottom:2}}>
                                        Password
                                    </TableCell>
                                    <TableCell sx={{borderBottom:2}}>
                                        Complete
                                    </TableCell>
                                    <TableCell sx={{borderBottom:2}}>
                                        Step
                                    </TableCell>
                                    <TableCell sx={{borderBottom:2}}>
                                        About Me
                                    </TableCell>
                                    <TableCell sx={{borderBottom:2}}>
                                        Street
                                    </TableCell>
                                    <TableCell sx={{borderBottom:2}}>
                                        City
                                    </TableCell>
                                    <TableCell sx={{borderBottom:2}}>
                                        State
                                    </TableCell>
                                    <TableCell sx={{borderBottom:2}}>
                                        Zip
                                    </TableCell>
                                    <TableCell sx={{borderBottom:2}}>
                                        Birthday
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    data.users.map( (user) => { 
                                        return(
                                            <TableRow>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.password}</TableCell>
                                                <TableCell>{`${user.complete}`}</TableCell>
                                                <TableCell>{user.step}</TableCell>
                                                <TableCell>{user.about_me}</TableCell>
                                                <TableCell>{user.street}</TableCell>
                                                <TableCell>{user.city}</TableCell>
                                                <TableCell>{user.state}</TableCell>
                                                <TableCell>{user.zip}</TableCell>
                                                <TableCell>{user.birthday}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div className='flex w-4/5'>
                    <TableContainer sx={{border:1}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3} align='center' sx={{borderBottom:3}}>
                                        Onboarding Fields
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    data.admin.map((ad) => {
                                        return(
                                            <TableRow>
                                                <TableCell align='center'>
                                                    <Typography>
                                                        {'{birthday'+JSON.stringify(ad.birthday)+"}"}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography>
                                                        {'{address'+JSON.stringify(ad.address)+"}"}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography>
                                                        {'{about_me'+JSON.stringify(ad.about_me)+"}"}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

            </div>
        </div>
    )

}

export default DataTable;