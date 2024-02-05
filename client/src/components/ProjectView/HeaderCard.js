import React, { useEffect,useState } from 'react';
import fetchProfileFromServer from '../../fetch/profile';

const HeaderCard = (props) => {
    const [poster, setPoster] = useState({});


    useEffect(() => {
        fetchProfileFromServer(props.project.creatorId).then((response) => {
            setPoster(response.data);
            console.log('Poster:', response.data);
        }).catch((error) => {
            console.error('Error fetching poster:', error);
        });
    }, [props.project.posterId]);

    return (
        <div className="mt-[16vh] flex flex-col w-[80vw] bg-white">
            <div className='relative bg-[#FFFFFF] w-[80vw] z-10 flex flex-col mx-auto px-[5vw] overflow-hidden rounded-l-xl rounded-t-xl'
            style={{boxShadow: '0px 0px 15px 0px #CCCCCC'}}>
                <img src="images/dots1.svg" className='absolute top-0 left-0 w-[25vw]' alt="dots" />
                <img src="images/dots2.svg" className='absolute bottom-0 right-0 w-[45.8vw] ' alt="dots" />
                <img src = "images/stars.svg" className='absolute ml-[5vw] bottom-0 left-0 w-[10vw] h-[10vh]' alt="stars" />
                <div className='pt-[10vh] pb-[15vh]'>
                    <div className='flex gap-2'>
                        <div>
                            11-Feb-2021
                        </div>
                        .
                        <div>
                            GitHub
                        </div>
                    </div>
                    <div className='text-[3rem] font-bold'>
                        {props.project.title}
                    </div>
                    <div className='flex mt-[3vh] gap-3'>
                        <div className='items-center flex'>
                            <div className='bg-[#CCC] mx-auto md:max-w-[60px] md:max-h-[60px] md:w-[4.5vw] md:h-[4.5vw] md:min-w-[32px] shadow md:min-h-[32px] h-[45px] w-[45px] rounded-full relative'>
                            </div>
                        </div>
                        <div className="flex flex-col md:items-start md:justify-center items-center">
                            <div className='flex gap-2'>
                                <div className='text-[1rem] font-semibold'>
                                    {poster.name}
                                </div>
                                <div className='flex items-center'>
                                    <img src="images/verify.png" alt="Description" className="object-cover object-center w-[1.125rem] h-[1.125rem]" />
                                </div>
                            </div>
                            <div className='text-[0.75rem] text-[#0016DA] align-bottom'>
                                {poster.title}
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
            <div className='relative ml-auto bg-[#FFFFFF] w-[30vw] flex gap-8 px-[5vw] overflow-hidden rounded-b-xl'
            style={{boxShadow: '0px 0px 15px 0px #CCCCCC'}}>            
                <div className='flex items-center'>
                    <img src="images/view.svg" className='w-[2rem] h-[2rem]' alt="Project" />
                    <div className='text-[1rem]'>
                        512
                    </div>                       
                </div>
                <div className='flex items-center'>
                    <img src="images/upArrow.svg" className='w-[2rem] h-[2rem]' alt="star" />
                    <div className='text-[1rem]'>
                        24
                    </div>
                </div>
                <div className='flex items-center'>
                    <img src="images/downArrow.svg" className='w-[2rem] h-[2rem]' alt="star" />
                    <div className='text-[1rem]'>
                        5
                    </div>
                </div>            
            </div>
        </div>
    );
};

export default HeaderCard;
