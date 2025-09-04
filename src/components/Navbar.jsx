import React from 'react'
import { IoCall } from 'react-icons/io5';
import QueryForm from './QueryForm';

const Navbar = ({scene}) => {
    console.log(scene);
    
    return (
        <>
        <header className="w-full absolute top-0 left-0 h-[10vh] px-5 sm:px-10 py-5 z-10 bg-transparent">
            <div className="flex justify-between items-center">
                <div className="logo">
                    <img src="/images/logo.webp" alt="" className='w-[60%] sm:w-[80%]' />
                </div>

                <div className="right_sec flex justify-between items-center gap-4 sm:gap-6">
                    <div className="call text-white cursor-pointer bg-transparent border-white border w-10 h-10 rounded-full flex justify-center items-center p-1">
                        <IoCall size={20} />
                    </div>
                <div className="hamburger space-y-2 cursor-pointer">
                    <div className="w-10 h-[2px]  bg-white" />
                    <div className="w-8 h-[2px] bg-white" />
                </div>
                </div>
            </div>
        </header>
        {/* <QueryForm/> */}
        </>
    )
}

export default Navbar