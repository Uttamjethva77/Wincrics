import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://194.238.18.76:3000';

const PrimeTeams = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [blogsData, setBlogsData] = useState(null); // State to store blogs data
    const navigate = useNavigate(); // Using useNavigate for navigation

    useEffect(() => {
        const fetchData = async () => {
            const storedUserData = JSON.parse(localStorage.getItem('userdata'));

            if (!storedUserData) {
                setError('Login required.');
                toast.error('Login required.'); // Show toast message
                setTimeout(() => {
                    navigate('/login'); // Navigate after half a second
                }, 500);
                return;
            }

            try {
                const userLoginResponse = await fetch(`${API_URL}/userlogin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        emailOrMobile: storedUserData.user.email,
                        password: storedUserData.user.password,
                    }),
                });

                const userLoginData = await userLoginResponse.json();

                if (userLoginResponse.ok) {
                    setUserData(userLoginData);

                    // Call /forgotpassword API
                    const forgotPasswordResponse = await fetch(`${API_URL}/forgotpassword`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: userLoginData.user.email,
                        }),
                    });

                    const forgotPasswordData = await forgotPasswordResponse.json();
                    toast.info('OTP sent to your email. Please check your inbox.');

                    // Check if OTP number is "verify"
                    if (forgotPasswordData.otpEntry && forgotPasswordData.otpEntry.otp_number === "verify") {
                        
                        // Log that the account is verified

                        // Call /payment/id API
                        const paymentResponse = await fetch(`${API_URL}/payment/${forgotPasswordData.otpEntry.user_id}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });

                        const paymentData = await paymentResponse.json();
                        

                        // Compare payment_at date with today's date
                        const paymentDate = new Date(paymentData.payment_at);
                        const today = new Date();
                        if (today > paymentDate) {
                            // Plan has expired, navigate to packages and show toast
                            navigate('/packages');
                            toast.error('Your plan has expired. Please renew your subscription.');
                        } else {
                            // Plan is still active
                            

                            // Call /blogs API
                            const blogsResponse = await fetch(`${API_URL}/blogs`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });

                            const blogsData = await blogsResponse.json();
                            setBlogsData(blogsData); // Store blogs data in state
                        }
                    } else {
                        // Move to profile and show toast to verify account
                        navigate('/packages');
                        toast.error('Please verify your account.');
                    }
                } else {
                    setError('Please verify your profile');
                    toast.error('Please verify your profile'); // Show toast message
                    setTimeout(() => {
                        navigate('/profile'); // Navigate after half a second
                    }, 500);
                }
            } catch (error) {
                console.error('Error during login:', error);
                setError('An error occurred during login.');
                toast.error('An error occurred during login.'); // Show toast message
                setTimeout(() => {
                    navigate('/login'); // Navigate after half a second
                }, 500);
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <Box>
            {userData && (
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                    <Typography variant="h5" color="primary" marginTop={10}>Prime Teams</Typography>
                </Slide>
            )}
            {/* Render blogs data if available */}
            {blogsData && (
                <Box marginTop={2}>
                    {blogsData.map(blog => (
                        <Link key={blog.id} to={`/prime-teams/${blog.id}`} style={{ textDecoration: 'none' }}>
                            <Box display="flex" alignItems="center" marginBottom={2} boxShadow={1} p={2} borderRadius={8}>
                                <img src={blog.blogimage} alt={blog.title} width={100} height={100} style={{ marginRight: 16, borderRadius: 8 }} />
                                <Typography variant="body1">{blog.title}</Typography>
                            </Box>
                        </Link>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default PrimeTeams;
