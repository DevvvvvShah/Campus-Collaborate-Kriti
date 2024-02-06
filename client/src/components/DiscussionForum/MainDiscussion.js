import React,{useEffect} from 'react'
import { DiscussionSection } from './DiscussionSection'
import {getDiscussions} from '../../fetch/discussions';

const MainDiscussion = (props) => {
    const discussions = props.discussions;        
    return (
        <div className='md:ml-[27vw] pl-[10%] pr-[10%] pt-16 md:pl-[3%] md:pr-[10%]'>
            <DiscussionSection discussions={discussions}/>
        </div>
    );
};

export { MainDiscussion };
