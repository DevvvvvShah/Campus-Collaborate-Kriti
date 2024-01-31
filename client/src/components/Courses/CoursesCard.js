import React from 'react'

const CourseCard = () => {
    return (
        <div className='rounded-lg p-3 bg-[#1A1E29] h-fit sm:h-fit sm:pb-[1rem] flex flex-col'>
            <div className='flex flex-col'>
                <div className='flex justify-between items-center'>
                    <div className='font-bold text-2xl'>
                        Course Title
                    </div>
                    <div className='flex gap-2'>
                        <div className='bg-[#666972] px-2 rounded-md font-bold h-fit text-[0.875rem]'>
                            🔗Link
                        </div>
                        <div className='flex w-fit h-fit justify-end text-white items-center py-0.5 px-2 rounded-full border-[1px] border-white font-bold text-[0.75rem]'>
                            <img src="images/union.png" alt="Description" className="object-cover object-center w-[0.75rem] h-[0.75rem]" />
                            <img src="images/usersmall.png" alt="Description" className="object-cover object-center w-[0.75rem] h-[0.75rem]" />  
                            420  
                        </div>                        
                    </div>
                </div>
                <div className='flex gap-0.5 justify-start items-center text-xs'>
                    <div className='text-[#CCC]'>By: </div>
                    <div className='bg-[#CCC] w-[10px] h-[10px] rounded-full relative'>
                    </div>                    
                    <div>John</div>
                </div>
                <div className='flex text-black my-3'>
                    <SkillsTiles value="DSA" />
                    <SkillsTiles value="Python" />
                    <SkillsTiles value="C++" />
                </div>
                <div className='text-sm'>
                    Description goes here, you may describe your project in short.
                </div>
            </div>
        </div>
    );
};

function SkillsTiles(prop) {
    return (
      <div className="flex justify-center items-center mr-[0.3rem] bg-[#46D97E] rounded-xl">
        <span className="px-[0.3rem] py-[0.5px] text-xs font-semibold">{prop.value}</span>
      </div>
    );
}

export { CourseCard };
