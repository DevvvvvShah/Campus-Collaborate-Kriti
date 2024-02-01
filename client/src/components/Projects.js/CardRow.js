import React from 'react';
import Card from './Card';
import UseMediaQuery from '../../hooks/useMediaQuery';

const CardRow = () => {
    const md = UseMediaQuery('(max-width: 768px)');

    return (
        <div className='flex gap-0 justify-center'>
            <Card />
            {md ? '' : <Card />}
        </div>
    );
};

export default CardRow;
