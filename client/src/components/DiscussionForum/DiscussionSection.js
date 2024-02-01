import React, { useEffect } from 'react'
import { DiscussionUnit } from './DiscussionUnit';

const DiscussionSection = (props) => {
    const [units,setUnits] = React.useState([]);
    
    useEffect(() => {
        props.discussions.map((discussion) => {
            setUnits((units) => [...units, <DiscussionUnit discussion={discussion}/>]);
        });
    }, [props.discussions]);

    return (
        <div className='min-h-[60vh] sm:h-fit sm:pb-[1rem] mb-[2rem] flex flex-col gap-2'>
            {units}      
        </div>
    );
};

export { DiscussionSection };
