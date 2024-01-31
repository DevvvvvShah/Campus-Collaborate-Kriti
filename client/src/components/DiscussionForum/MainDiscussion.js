import React from 'react'
import { DiscussionHeader } from './DiscussionHeader'
import { DiscussionSection } from './DiscussionSection'

const MainDiscussion = () => {
    return (
        <div className='w-full md:w-3/4 md:min-w-[60vh] min-w-[90vh] pt-20'>
            <DiscussionHeader />
            <DiscussionSection />
        </div>
    );
};

export { MainDiscussion };
