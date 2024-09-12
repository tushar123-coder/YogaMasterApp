import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import dummyImg from '../../../assets/home/girl.jpg'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function PopularTeacher() {
    const axiosFetch=useAxiosFetch();
    const [instructor,setInstructor]=useState([]);
    useEffect(()=>{
            axiosFetch.get('/popular-instructors').then((data)=>{
                setInstructor(data.data);
            }).catch((err)=>{
                console.log(err);
                
            })
            
        },[])
  return (
    <div className='md:w-[80%] mx-auto my-36'>
     <div>
        <h1 className='text-5xl font-bold text-center dark:text-white'>Our <span className='text-secondary'>Amazing</span> Teachers</h1>
        <div className='w-[40%] text-center mx-auto my-4'>
            <p className='text-gray-500'>Explore our Popular Classes. Here is some popular classes based on How many student enrolled </p>
        </div>
     </div>

     {
        instructor? <>
        <div className='grid mb-28 md:grid-cols-2 lg:grid-cols-4 w-[90%] gap-4 mx-auto'>
            {
                instructor?.slice(0,4).map((teacher,index)=>(
                    <div key={index} className='flex flex-col dark:border dark:border-gray-300 dark:text-white hover:-translate-y-2 duration-200 cursor-pointer shadow-md py-8 px-10 md:px-8 rounded-md'>
                        <div className='flex flex-col gap-6 md:gap-8'>
                            <img className='rounded-full border-4 border-gray-300 h-24 w-24 mx-auto' src={teacher?.instructor?.photoUrl || `${dummyImg}`} alt="" />
                       
                           <div className='flex flex-col text-center'>
                            <p className='font-medium text-lg dark:text-white text-gray-800'>{teacher?.instructor?.name}</p>
                            <p className='text-gray-500 whitespace-nowrap'>Instructor</p>
                            <p className='text-gray-500 mb-4 whitespace-nowrap'>Total Students: {teacher?.totalEnrolled}</p>

                            <div className='flex flex-row gap-4 items-center justify-center'>
                                <FaLinkedin className='text-secondary h-6 w-6' />
                                <FaInstagram className='text-secondary h-6 w-6' />
                                <FaFacebook  className='text-secondary h-6 w-6'/>
                            </div>
                           </div>
                       
                       
                        </div>
                    </div>
                ))
            }
        </div>
        </>:<> <p>No instructor available.</p> </>
     }
    </div>
  )
}

export default PopularTeacher
