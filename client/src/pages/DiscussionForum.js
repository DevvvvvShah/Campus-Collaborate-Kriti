import React from 'react'
import { MainDiscussion } from '../components/DiscussionForum/MainDiscussion'
import { SideBar } from '../components/SideBar/SideBar'

const DiscussionForum = () => {
    return (
        <div className='flex flex-col md:flex-row px-[2%] bg-[#132D46] min-w-fit min-h-[100vh] gap-5 sm:flex-row'>
            <MainDiscussion />
            <SideBar title="FAQs"/>
        </div>
    );
};

export default DiscussionForum;
