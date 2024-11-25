import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react'
import { useForm } from "react-hook-form";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlinePhone, AiOutlinePicture } from "react-icons/ai";
import { LuMapPin } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../components/headers/social/GoogleLogin';
import { AuthContext } from '../../utilities/provider/Authprovider';
import axios from 'axios';


function Register() {
    const { register, handleSubmit, watch,formState: { errors } } = useForm();
    const navigate=useNavigate();
    const {signUp,updateUserProfile,setError}=useContext(AuthContext)
    const onSubmit = data => 
        {
            setError("");
            signUp(data.email,data.password).then((result)=>
            {
                const user= result.user;
                if(user)
                {
                    return updateUserProfileclea(data.name,data.photoURL).then(()=>
                    {
                        const userImp={
                            name: user?.displayName,
                            email: user?.email,
                            photoURL: user?.photoURL,
                            role:'user',
                            gender: data.gender,
                            phone: data.phone,
                            address: data.address
                        };
                        if(user.email && user.displayName)
                        {
                            return axios.post("http://localhost:4000/new-user",userImp).then(()=>
                            {
                                setError("");
                                navigate('/');
                                return "Registration Successfully"

                            }).catch((err)=>
                            {
                                throw new Error(err);
                            })
                        }
                    }).catch((err)=>
                    {
                        setError(err.code);
                        throw new Error(err)
                    });
                }
            })
        }

        const password=watch('password','');
    return (
        <div className=' flex items-center justify-center pt-14 bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md'>
                <h2 className='text-3xl font-bold text-center mb-6'>Please Register</h2>

                {/* form data */}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex items-center gap-5'>
                        <div className='mb-4'>
                            <label htmlFor="name" className='block text-gray-700 font-bold mb-2'>
                                <AiOutlineUser className='inline-block mr-2 mb-1 text-lg' />
                                Name
                            </label>
                            <input type="text" placeholder='Enter your Name' {...register("name", { required: true })} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="email" className='block text-gray-700 font-bold mb-2'>
                                <AiOutlineMail className='inline-block mr-2 mb-1 text-lg' />
                                Email
                            </label>
                            <input type="email" placeholder='Enter your Email' {...register("email", { required: true })} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' />
                            {errors.email && <span>This field is required</span>}
                        </div>
                    </div>

                    <div className='flex items-center gap-5'>
                        <div className='mb-4'>
                            <label htmlFor="password" className='block text-gray-700 font-bold mb-2'>
                                <AiOutlineLock className='inline-block mr-2 mb-1 text-lg' />
                                Password
                            </label>
                            <input type="password" placeholder='Enter Password' {...register("password", { required: true })} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' />

                        </div>
                        <div className='mb-4'>
                            <label htmlFor="confirmpassword" className='block text-gray-700 font-bold mb-2'>
                                <AiOutlineLock className='inline-block mr-2 mb-1 text-lg' />
                                Confirm Password
                            </label>
                            <input type="password" placeholder='Confirm password' {...register("confirmPassword", { required: true,validate: (value)=> value=== password || "Password is not define" })} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' />
                        </div>
                    </div>

                    <div className='flex items-center gap-5'>
                        <div className='mb-4'>
                            <label htmlFor="phoneNumber" className='block text-gray-700 font-bold mb-2'>
                                <AiOutlinePhone className='inline-block mr-2 mb-1 text-lg' />
                                Phone Number
                            </label>
                            <input type="tel" placeholder='Enter Phone Number' {...register("phone", { required: true })} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="photoURL" className='block text-gray-700 font-bold mb-2'>
                                <AiOutlinePicture className='inline-block mr-2 mb-1 text-lg' />
                                Photo URL
                            </label>
                            <input type="text" placeholder='Photo URL' {...register("photoURL")} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' />
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="gender" className='block text-gray-700 font-bold mb-2'>
                            <AiOutlineUser className='inline-block mr-2 mb-1 text-lg' />
                            Gender
                        </label>
                        
                        <select {...register("gender",{ required: true })}  className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'>
                            <option >Select Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="address" className='block text-gray-700 font-bold mb-2'>
                            <LuMapPin className='inline-block mr-2 mb-1 text-lg' />
                            Address
                        </label>
                        
                        <textarea rows="3" placeholder='Enter address'  {...register("address", { required: true })} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' ></textarea>
                    </div>

                   <div className='text-center'>
                    <button type='submit' className='bg-secondary hover:bg-red-500 text-white py-2 p-4 rounded-md'>Register</button>
                    {
                        errors.password && (
                            <div className='text-red-500 text-sm w-full mt-1'>
                                <p>Password doesn't match</p>
                            </div>
                        )
                    }
                   </div>
                </form>
                <p className='text-center mt-4'>Already have an account? <Link to="/login" className='underline text-secondary'>Login</Link></p>
                <GoogleLogin/>
            </div>
        </div>
    )
}

export default Register
