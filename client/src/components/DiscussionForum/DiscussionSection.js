import React from 'react'
import { DiscussionUnit } from './DiscussionUnit';

const DiscussionSection = () => {
    return (
        <div className='rounded-lg bg-[#1A1E29] min-h-[60vh] sm:h-fit sm:pb-[1rem] mb-[2rem] flex flex-col'>
            <DiscussionUnit />
            <hr className='mt-[0.5rem] border-white' /> 
            <DiscussionUnit />
            <hr className='mt-[0.5rem] border-white' /> 
            <DiscussionUnit />        
        </div>
    );
};

export { DiscussionSection };
