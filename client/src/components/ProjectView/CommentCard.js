import React , {useState,useEffect}from 'react';
import fetchProfileFromServer from '../../fetch/profile';
import { putUpvote } from '../../fetch/comments';

const CommentCard = (props) => {
    const [hoursAgo, setHoursAgo] = React.useState('');
    const [profile, setProfile] = React.useState({});
    const [upvotes,setUpvotes] = React.useState(props.comments.likes.length);
    const [upvoted,setUpvoted] = React.useState(false);

    useEffect(() => {
        const postingTime = props.comments.timeOfPost;
        const currentTime = new Date();
        const timeDifference = currentTime - new Date(postingTime);

        let timeAgo = '';
        if (timeDifference < 60000) { // Less than 1 minute
            const secondsAgo = Math.floor(timeDifference / 1000);
            timeAgo = `${secondsAgo} seconds ago`;
        } else if (timeDifference < 3600000) { // Less than 1 hour
            const minutesAgo = Math.floor(timeDifference / 60000);
            timeAgo = `${minutesAgo} minutes ago`;
        } else if (timeDifference < 86400000) { // Less than 1 day
            const hoursAgo = Math.floor(timeDifference / 3600000);
            timeAgo = `${hoursAgo} hours ago`;
        } else { // More than 1 day
            const daysAgo = Math.floor(timeDifference / 86400000);
            timeAgo = `${daysAgo} days ago`;
        }

        setHoursAgo(timeAgo);
    }, []);

    useEffect(() => {
        fetchProfileFromServer(localStorage.getItem('user')).then((res) => {
            if(props.comments) {
                console.log(props.comments);
                if (props.comments.likes.includes(res._id)) {
                    console.log('upvoted');
                    setUpvoted(true);
                }
                else{
                    console.log('not upvoted');
                    setUpvoted(false);
                }
            }
        }).catch(error => {
            console.error(error);
        });
    }, [props.comments]);

    const handleUpvote = () => {
        putUpvote(props.comments._id).then((res) => {
            console.log(res);
            setUpvotes(res.data.likes.length);
            setUpvoted(!upvoted);
        }).catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        fetchProfileFromServer(props.comments.userId).then((res) => {
           setProfile(res);
            console.log(res);
        }).catch(error => {
            console.error(error);
        });

    }, []);    

    return (
        <div className='w-full text-black p-5 bg-white shadow-lg rounded-lg mb-2'>
            <div className='grid grid-cols-1 md:grid-cols-12 md:gap-2 gap-1'>
            <div className='md:col-span-1 md:mr-auto items-center flex'>
                    <div className='bg-[#CCC] mx-auto md:max-w-[50px] md:max-h-[50px] md:w-[3.5vw] md:h-[3.5vw] md:min-w-[32px] md:min-h-[32px] h-[45px] w-[45px] shadow rounded-full relative'>
                    </div>
                </div>
                <div className='md:col-span-8 flex flex-col md:items-start md:justify-center items-center' >
                    <div className='flex gap-2'>
                        <div className='text-[1rem] font-semibold'>
                            {profile && profile.name}
                        </div>
                        <div className='flex items-center'>
                            <img src="images/verify.png" alt="Description" className="object-cover object-center w-[1.125rem] h-[1.125rem]" />
                        </div>
                    </div>
                    <div className='text-[0.75rem] text-[#0016DA] align-bottom'>
                        {profile && profile.email}
                    </div>
                </div>
                <div className='md:col-span-3 flex flex-col items-end align-top'>
                    <div className='text-[0.875rem] text-[#0016DA]'>
                        {hoursAgo}
                    </div>
                </div>
                <div className='md:col-span-1'></div>
                <div className='md:col-span-8'>
                    <div className='text-[1rem]'>
                        {props.comments && props.comments.content}
                    </div>
                </div>
                <div className='flex justify-end md:col-span-3 items-center'>
                </div>                         
                <div className='md:col-span-1'>
                </div>
                <div className='md:col-span-8'>
                </div>      
                <div className='md:col-span-3 flex justify-end'>
                    <div className='flex w-fit h-fit gap-4 justify-end text-black align-center items-center py-0.5 px-2 rounded-full border-[1px] border-white'>
                        <div className='flex gap-1 align-center items-center'>
                            <img src={`images/${upvoted ? 'upvote' : 'emptyUpvote'}.svg`} 
                                alt="Description" 
                                className="object-cover object-center w-[0.875rem] h-[0.875rem]" 
                                onClick={handleUpvote}
                            />
                            <div className='text-[0.875rem]'>{upvotes}</div>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
