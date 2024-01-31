import React, { useEffect } from 'react'
import { MainDiscussion } from '../components/DiscussionForum/MainDiscussion'
import getDiscussions from '../fetch/discussions' 
import Navbar from '../components/Navbar/navbar';
import Topbar from '../components/Navbar/topbar';

const DiscussionForum = (props) => {
    const [isExpanded, setIsExpanded] = React.useState(true);
    const [discussions, setDiscussions] = React.useState([]);

    useEffect(() => {
        getDiscussions().then((res) => {
            setDiscussions(res.data);
            console.log(res.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <div>
            <div className='flex flex-col md:flex-row bg-[#F8F8F8] w-screen min-h-[100vh]'>
                <Navbar isExpanded = {isExpanded} setIsExpanded= {setIsExpanded}/>          
                <div className='w-full'>
                    <Topbar/>    
                    <MainDiscussion discussions={discussions}/>
                </div>
            </div>
        </div>
    );
};

export default DiscussionForum;
