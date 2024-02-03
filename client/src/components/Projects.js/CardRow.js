import React from 'react';
import Card from './Card';
import UseMediaQuery from '../../hooks/useMediaQuery';

const CardRow = (props) => {
    const md = UseMediaQuery('(max-width: 768px)');
    let projects = props.projects;


    return (
        <div className='flex gap-0 justify-center'>
            <Card project={projects[0]} />
            {md ? '' : <Card project ={projects[1]} />}
        </div>
    );
};

export default CardRow;
