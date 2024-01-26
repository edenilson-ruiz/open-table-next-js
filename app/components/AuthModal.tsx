"use client";


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState, useContext } from 'react';
import AuthModalInputs from './AuthModalInputs';
import { useAuth } from '../../hooks/useAuth';
import { AuthenticationContext } from '../context/AuthContext';
import { Alert, CircularProgress } from '@mui/material';


const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function AuthModal({ isSignIn }: Readonly<{ isSignIn: boolean }>) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { signin, signup } = useAuth();
    const { loading, error } = useContext(AuthenticationContext);

    console.log("Hey render");

    const renderContent = (signInContent: string, signUpContent: string) => {
        return isSignIn ? signInContent : signUpContent
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const [disabled, setDisabled] = useState(true);

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        phone: "",
        password: "",
    });

    useEffect(() => {

        if (isSignIn) {
            if (inputs.password && inputs.email) {
                return setDisabled(false);
            }
        } else {
            if (inputs.firstName && inputs.lastName && inputs.email && inputs.password && inputs.city && inputs.phone) {
                return setDisabled(false);
            }
        }

        setDisabled(true);

    }, [inputs]);

    const handleClick = () => {
        if (isSignIn) {
            signin({
                email: inputs.email,
                password: inputs.password
            }, handleClose);
        } else {
            signup({
                email: inputs.email,
                password: inputs.password,
                firstName: inputs.firstName,
                lastName: inputs.lastName,
                city: inputs.city,
                phone: inputs.phone
            }, handleClose);
        }
    }


    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <button
                className={`${(isSignIn) ? "bg-blue-400 text-white" : ''} border p-1 px-4 rounded mr-3`}
                onClick={handleOpen}
            >
                Sign in
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {loading ? <div className='py-24 px-2 h-[600px] flex justify-center'>
                        <CircularProgress />
                    </div> : (<div className="p-2 h-[600px]">
                        {error ? (<Alert severity='error' className='mb-4'>
                            {error}
                        </Alert>) : null}
                        <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                            <p className='text-sm'>
                                {renderContent("Sign In", "Create Account")}
                            </p>
                        </div>
                        <div className='m-auto'>
                            <h2 className='text-2xl font-ligth text-center'>
                                {renderContent("Log Into Your Account", "Create Your OpenTable Account")}
                            </h2>
                        </div>
                        <AuthModalInputs
                            inputs={inputs}
                            handleChangeInput={handleChangeInput}
                            isSignIn={isSignIn}
                        />
                        <button
                            className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400'
                            disabled={disabled}
                            onClick={handleClick}
                        >
                            {renderContent("Sign In", "Create Account")}
                        </button>
                    </div>)}
                </Box>
            </Modal>
        </div>
    );
}