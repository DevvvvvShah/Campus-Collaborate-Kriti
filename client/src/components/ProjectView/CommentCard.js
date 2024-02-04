import React from 'react';

const CommentCard = () => {
    const [hoursAgo, setHoursAgo] = React.useState(0);
    const [profile, setProfile] = React.useState({});
    const [reply, setReply] = React.useState(false);
    const [comments, setComments] = React.useState(false);

    const handleAreaToggle = () => {
        setReply(!reply);
    };

    const handleCommentsToggle = () => {
        setComments(!comments);
    };

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
                                <button className="bg-[#0016DA] shadow ml-auto text-white text-[12px] font-bold rounded-lg px-4 py-1"
                                        onSubmit={handleSubmit}>
                                    Submit
                                </button>                         
                        </div>

    return (
        <div className='w-full text-black p-5 bg-white shadow-lg rounded-lg mb-2'>
            <div className='grid grid-cols-1 md:grid-cols-12 md:gap-2 gap-1'>
                <div className='md:col-span-1 md:mr-auto items-center flex'>
                    <div className='bg-[#CCC] mx-auto md:max-w-[50px] md:max-h-[50px] md:w-[3.5vw] md:h-[3.5vw] md:min-w-[32px] md:min-h-[32px] h-[45px] w-[45px] shadow rounded-full relative'>
                    </div>
                </div>
                <div className='md:col-span-8 flex flex-col md:items-start md:justify-center items-center'>
                    <div className='flex gap-2'>
                        <div className='text-[1rem] font-semibold'>
                            ABCD
                        </div>
                        <div className='flex items-center'>
                            <img src="images/verify.png" alt="Description" className="object-cover object-center w-[1.125rem] h-[1.125rem]" />
                        </div>
                    </div>
                    <div className='text-[0.75rem] text-[#0016DA] align-bottom'>
                        @abcd
                    </div>
                </div>
                <div className='md:col-span-3 flex flex-col items-end align-top'>
                    <div className='text-[0.875rem] text-[#0016DA]'>
                        14 hr ago
                    </div>
                </div>
                <div className='md:col-span-1'></div>
                <div className='md:col-span-8'>
                    <div className='text-[1rem]'>
                        I comment to myself :P
                    </div>
                </div>
                <div className='flex justify-end md:col-span-3 items-center'>
                </div>    
                <div className='md:col-span-1'></div>
                <div className='md:col-span-8 flex gap-4'>
                    <button className='text-[0.875rem] font-semibold' onClick={handleAreaToggle}>
                        Reply
                    </button>
                    <button className='text-[0.875rem] font-semibold'onClick={handleCommentsToggle}>
                        View Replies
                    </button>
                </div>
                <div className='md:col-span-3 flex justify-end'>
                    <div className='flex w-fit h-fit gap-1 justify-end text-black align-center items-center py-0.5 px-2 rounded-full border-[1px] border-white'>
                        <img src="images/upvote.svg" alt="Description" className="object-cover object-center w-[0.9rem] h-[0.875rem]" />
                        <div className='text-[0.875rem]'>9</div>
                    </div>                    
                </div>
                <div className='md:col-span-1'></div>  
                <div className='md:col-span-8 ml-[2vw]'>
                    <div className={`flex flex-col gap-1 items-end ${reply ? 'block':'hidden'} text-black ml-[-0.5rem] mt-[1rem]`}>
                        <textarea
                            onChange={handleTextAreaChange}
                            onFocus={() => {setSubmit(submitCode)}}
                            onBlur={() => {setSubmit('')}}
                            rows={1}
                            type="text"
                            placeholder="Answer Here"
                            className="overflow-hidden shadow py-[0.375rem] bg-[#E5E5E5] text-black
                            placeholder:font-semibold p-3 rounded-2xl w-[100%] focus:border-[#0016DA] focus:outline-none 
                            focus:border resize-none"
                        />     
                        {submit}
                    </div>
                </div>
                <div className='md:col-span-3'>
                </div>                        
                <div className='md:col-span-1'>
                </div>
                <div className={`md:col-span-11 ml-[2vw] `}>
                    <div className={`${comments ? ' block':' hidden'}`}>
                    More comments here
                    </div>
                </div>                
            </div>
        </div>
    );
};

export default CommentCard;