import React from 'react'
import SkillsTiles from '../profileComponents/SkillsTiles';

const DiscussionUnit = () => {
    const handleTextAreaChange = (e) => {
        var element = e.target;
        element.style.overflow = 'hidden';
        element.style.height = 0;
        element.style.height = element.scrollHeight + 'px';
    };    

    const handleSubmit = () => {
        return;
    }
    
    const [submit,setSubmit] = React.useState('')

    const submitCode =  <div className=''>
                                <button className="bg-[#46D97E] ml-auto text-white text-[12px] font-bold rounded-lg px-4 py-1"
                                        onSubmit={handleSubmit}>
                                    Submit
                                </button>                         
                        </div>

    return (
        <div className='w-full text-white p-4'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-2'>
                <div className='md:col-span-1 ml-[-0.5rem]'>
                    <div className='bg-[#CCC] mx-auto w-[50px] h-[50px] rounded-full relative'>
                    </div>
                </div>
                <div className='md:col-span-8 flex flex-col md:items-start md:justify-end items-center'>
                    <div className='flex gap-2'>
                        <div className='text-[1rem] font-semibold'>
                            ABCD
                        </div>
                        <div className='flex items-center'>
                            <img src="images/verify.png" alt="Description" className="object-cover object-center w-[1.125rem] h-[1.125rem]" />
                        </div>
                    </div>
                    <div className='text-[0.75rem] align-bottom'>
                        @abcd
                    </div>
                </div>
                <div className='md:col-span-3 flex flex-col items-end align-top'>
                    <div className='text-[0.875rem]'>
                        1hr ago
                    </div>
                </div>
                <div className='md:col-span-1'></div>
                <div className='md:col-span-8'>
                    <div className='text-[1.75rem] font-bold'>
                        Why is Lohit the best hostel to learn DSA?
                    </div>
                </div>
                <div className='flex justify-end md:col-span-3 items-center'>
                    <div className='flex w-fit h-fit justify-end text-white items-center py-0.5 px-2 rounded-full border-[1px] border-white font-bold text-[0.75rem]'>
                        <img src="images/union.png" alt="Description" className="object-cover object-center w-[0.75rem] h-[0.75rem]" />
                        <img src="images/usersmall.png" alt="Description" className="object-cover object-center w-[0.75rem] h-[0.75rem]" />  
                        420  
                    </div>
                </div>    
                <div className='md:col-span-1'></div>            
                <div className='md:col-span-8'>
                    <div className='flex text-black ml-[-0.5rem]'>
                        <SkillsTiles value="DSA" />
                        <SkillsTiles value="Python" />
                        <SkillsTiles value="C++" />
                    </div>
                </div>
                <div className='flex justify-end md:col-span-3'>
                    <div className='flex w-fit h-fit justify-end text-white items-center py-0.5 px-2 rounded-full border-[1px] border-white font-semibold text-[0.875rem]'>
                        20+ ANSWERS 
                    </div>                    
                </div>
                <div className='md:col-span-1'></div>  
                <div className='md:col-span-8'>
                    <div className='flex flex-col gap-1 items-end text-black ml-[-0.5rem] mt-[1rem]'>
                        <textarea
                            onChange={handleTextAreaChange}
                            onFocus={() => {setSubmit(submitCode)}}
                            onBlur={() => {setSubmit('')}}
                            rows={1}
                            type="text"
                            placeholder="Answer Here"
                            className="overflow-hidden py-[0.375rem] bg-[#666972] placeholder-[#1A1E29] 
                            placeholder:font-bold p-3 rounded w-[100%] focus:border-[#46D97E] focus:outline-none 
                            focus:border"
                        />     
                        {submit}
                    </div>
                </div>                               
            </div>
        </div>

    );
};

export { DiscussionUnit };