import React from 'react'

const DiscussionHeader = () => {
    return (
        <div className='mb-5 '>
            <div className='flex flex-col justify-between items-center pb-3  md:flex-row'>
                <div className='text-2xl text-white text-center md:text-left font-semibold mb-2 md:mb-0'>
                    Discussion Forum
                </div>
                <div className="flex text-[#46D97E] items-center rounded-full border-2 border-[#46D97E] px-4 py-0.5 font-bold h-fit ml-0 md:ml-10">
                    <img src="images/add.png" alt="Description" className="object-cover object-center w-4" />
                    <div className='text-center text-md md:text-base ml-2'>Ask a question.</div>
                </div>
            </div>
            <hr className='border-white border-[0.0625rem]' />
        </div>
    );
};

export { DiscussionHeader };
