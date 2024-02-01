import { prodDependencies } from 'mathjs';
import React from 'react';

const Topbar = (props) => {
    const handleSearch = () => {
        if(window.innerWidth < 768){
            const search = document.querySelector('input');
            search.classList.toggle('hidden');
            const topic = document.querySelector('.topic');
            const profile = document.querySelector('.profile');
            const searchIcon = document.querySelector('.icon');
            if(search.classList.contains('hidden')){
                topic.classList.remove('hidden');
                profile.classList.remove('hidden');
                searchIcon.classList.remove('absolute');
                search.classList.remove('w-[90vw]');
            }
            else{
                topic.classList.add('hidden');
                profile.classList.add('hidden');
                searchIcon.classList.add('absolute');
                search.classList.add('w-[90vw]');
            }
        }
    }

    return (
        <div className="w-full bg-white drop-shadow-md">
            <div className='md:ml-[25vw] ml-[5vw] flex items-center py-[1.5vh] align-center justify-between'>
                <div className='topic md:text-xl md:text-lg h-fit pl-[2vw]'>
                    {props.title}
                </div>
                <div className='flex items-center'>
                    <div className='relative min-w-[2rem] md:max-w-[20rem]'>
                        <img src="images/search.svg" alt="Description" 
                        className="icon md:absolute left-3 top-2 object-cover object-center w-[1rem] h-[1.05rem]" 
                        onClick={handleSearch}/>
                        <input
                            type="text"
                            className='bg-[#EEE] rounded-full md:block hidden px-8 py-1 focus:outline-none'
                            placeholder='Search'
                        />
                    </div>
                    <div className='profile bg-[#CCC] mr-[5vw] ml-[2vw] w-[30px] h-[30px] shadow rounded-full'>
                    </div>
                </div>                
            </div>
        </div>
    );
};

export default Topbar;
