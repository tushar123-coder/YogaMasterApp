import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../hooks/useAxiosFetch';
import dummyImg from '../../assets/home/girl.jpg'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


function instructors() {
  const axiosFetch = useAxiosFetch();
  const [instructor, setInstructor] = useState([]);
  useEffect(() => {
    axiosFetch.get('/instructors').then((data) => {
      setInstructor(data.data);
    }).catch((err) => {
      console.log(err);

    })

  }, [])

  console.log(instructor);

  return (
    <div className='md:w-[80%] mx-auto my-36'>
      {
        instructor ? <>
          <div className='grid mb-28 md:grid-cols-2 lg:grid-cols-4 w-[90%] gap-4 mx-auto ' >
            {
              instructor?.map((teacher, index) => (
                <div key={index} className='flex flex-col dark:border dark:border-gray-300 dark:text-white hover:-translate-y-2 duration-200 cursor-pointer shadow-md py-8 px-10 md:px-8 rounded-md'>
                  <div className='flex flex-col gap-6 md:gap-8'>
                    <img className='rounded-full border-4 border-gray-300 h-24 w-24 mx-auto' src={teacher?.photoUrl || `${dummyImg}`} alt="" />

                    <div className='flex flex-col text-center'>
                      <p className='font-medium text-lg dark:text-white text-gray-800'>{teacher?.name}</p>
                      <p className='text-gray-500 whitespace-nowrap text-xs'>Instructor</p>
                    </div>

                    <div className='max-w-full  overflow-hidden'>
                      <div className='text-xs grid grid-cols-[auto_1fr] gap-4'>
                        <div className='font-semibold'>Address</div>
                        <div>{teacher.address}</div>

                        <div className='font-semibold'>Phone</div>
                        <div>{teacher.phone}</div>

                        <div className='font-semibold'>Email</div>
                        <div>{teacher.email}</div>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            }
          </div>
        </> : <> <p>No instructor available.</p> </>
      }
    </div>
  )
}

export default instructors
