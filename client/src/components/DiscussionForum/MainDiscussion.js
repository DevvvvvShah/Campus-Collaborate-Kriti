import React from 'react'
import { DiscussionSection } from './DiscussionSection'

const MainDiscussion = (props) => {
    return (
        <div className='md:ml-[27vw] pl-[10%] pr-[10%] pt-16 md:pl-[3%] md:pr-[10%]'>
            <DiscussionSection discussions={props.discussions}/>
        </div>
    );
};

export { MainDiscussion };
