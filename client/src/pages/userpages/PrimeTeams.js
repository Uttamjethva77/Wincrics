import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:3000';

const PrimeTeams = () => {
    const [userData, setUserData] = useState(null);
    const [blogsData, setBlogsData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const storedUserData = JSON.parse(localStorage.getItem('userdata'));

            if (!storedUserData) {
                toast.error('Login required.');
                navigate('/login');
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

                    const paymentResponse = await fetch(`${API_URL}/payment/${userLoginData.user.id}`);
                    const paymentData = await paymentResponse.json();

                    const paymentDate = new Date(paymentData.payment_at);
                    const today = new Date();

                    if (today > paymentDate) {
                        navigate('/packages');
                        toast.error('Your plan has expired. Please renew your subscription.');
                    } else {
                        const blogsResponse = await fetch(`${API_URL}/blogs`);
                        const blogsData = await blogsResponse.json();
                        setBlogsData(blogsData);
                    }
                } else {
                    navigate('/profile');
                    toast.error('Please verify your account.');
                }
            } catch (error) {
                console.error('Error during login:', error);
                toast.error('An error occurred during login.');
                navigate('/login');
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
            {blogsData && (
                <Box marginTop={2} sx={{backgroundColor:"#DEDFE7"}}>
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
