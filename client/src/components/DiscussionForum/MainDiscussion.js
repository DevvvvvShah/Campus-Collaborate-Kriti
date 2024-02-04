import React,{useEffect} from 'react'
import { DiscussionSection } from './DiscussionSection'
import {getDiscussions} from '../../fetch/discussions';

const MainDiscussion = (props) => {
    const [discussions, setDiscussions] = React.useState([]);
    useEffect(() => {
        console.log("Running useEffect");
        getDiscussions()
            .then((res) => {
                setDiscussions(res.data);
                //console.log(res.data);
            })
            .catch((error) => {
                console.error(error);
            });            
    }, []);            
    return (
        <div className='md:ml-[27vw] pl-[10%] pr-[10%] pt-16 md:pl-[3%] md:pr-[10%]'>
            <DiscussionSection discussions={discussions}/>
        </div>
    );
};

export { MainDiscussion };
