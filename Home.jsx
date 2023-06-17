import React, { useState, useRef } from 'react';
import './Home.css';
//emailjs import for email testing
import emailjs from 'emailjs-com';

const Home = () => {
    const form = useRef();
    const [user_name, setName] = useState('');
    const [user_email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [errors, setErrors] = useState({});


    //.... form validation logic


    const validateForm = () => {
        const newErrors = {};


        if (!user_name.trim()) {
            newErrors.user_name = 'Name is required';
        }

        if (!user_email.trim()) {
            newErrors.user_email = 'Email is required';
        } else if (!/\S+@\S+\.\S+$/.test(user_email)) {


            newErrors.user_email = 'Email is invalid';
        }

        if (!phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(phone)) {
            newErrors.phone = 'Phone number is invalid';
        }
        // date of birth validatin =>age or <= age
        if (!dob.trim()) {
            newErrors.dob = 'Date of Birth is required';
        }
        // date of brith validate
        const today = new Date();
        const birthDate = new Date(dob);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        )

            if (age < 18) {
                newErrors.dob = 'Age must be 18 or older';
            }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    //from data handle
    const handleSubmit = async (e) => {
        e.preventDefault();
        // form input clear............
        setName('');
        setDob('');
        setEmail('');
        setPhone('');

        //send input data to the backend node js
        const response = await fetch('http://localhost:8080/demo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_name, dob, user_email, phone }),
        });
        //response data 
        const data = await response.json();
        console.log(data)
        //form validation funtion call
        if (validateForm()) {

            console.log('Form submitted');

            // Send email function call
            sendEmail();

            //form data table

        } else {
            console.log('Form validation failed');
        }
    };
    //send email
    const sendEmail = () => {
        emailjs
            .sendForm(
                'service_fimydpg',
                'template_4eiwp3j',
                form.current,
                'QG1Xq6vajEO6FRh6B'
            )
            .then(
                (result) => {
                    console.log(result.text);
                    console.log(' Email is send')
                },
                (error) => {
                    console.log(error.text);
                    console.log('Email not sent plz check')
                }
            );
    };

    return (
        <>
            <div className="singup_container">
                <div className="singup_from_container">
                    <div className="right">
                        <form className="form_container" onSubmit={handleSubmit} ref={form}>

                            <h1> User form</h1>
                            <div>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    //value={user_name}

                                    onChange={(e) => setName(e.target.value)}
                                    name="user_name"
                                />
                                {errors.user_name && <span>{errors.user_name}</span>}
                            </div>

                            <div>
                                <label>Email:</label>
                                <input
                                    type="text"
                                    // value={user_email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="user_email"
                                />
                                {errors.user_email && <span>{errors.user_email}</span>}
                            </div>


                            <div>
                                <label>Phone Number:</label>
                                <input
                                    type="text"

                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}

                                />
                                {errors.phone && <span>{errors.phone}</span>}
                            </div>

                            <div>
                                <label>Date of Birth:</label>
                                <input
                                    type="Date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}

                                />
                                {errors.dob && <span>{errors.dob}</span>}
                            </div>

                            <div>
                                <label>Text Email</label>
                                <textarea name="message" placeholder='Email text here ' className='tex' />

                            </div>

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;



