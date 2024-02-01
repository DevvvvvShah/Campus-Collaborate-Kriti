import React from 'react'
import Select from 'react-select';

const reactSelectStyle = {
    control: (baseStyles,state) => ({
        ...baseStyles,
        width: 'fit-content',
        height: '0.5rem',
        minHeight: '1.875rem',
        textAlign: 'center',
        fontSize: '12px',
        appearance: 'none',
        border: '1.5px solid #FFFFFF',
        borderRadius: '0.5rem',
        padding: '0px 2px 0px 2px',
        lineHeight: 'tight',
        outline: 'none',
        boxShadow: 'none',
        backgroundColor:'#FFFFFF',                
        ':focus': {
            border: '1.5px solid #00FF00',
            boxShadow: 'none',
        },
        ':hover' : {
            border: '1.5px solid #46D97E',
            boxShadow: 'none',
            backgroundColor: '#FFFFFF',
        },
    }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: state.isFocused ? '#46D97E' : baseStyles.backgroundColor, // Change option background color on focus
        color: state.isSelected ? 'white' : baseStyles.color, // Change option text color when selected
        fontSize: '12px',
    }),
    menu: (baseStyles,state) => ({        
        ...baseStyles,
        zIndex: 2,
      }),
    indicatorSeparator:(baseStyles) => ({
        ...baseStyles,
        display: 'none',
    }),
    dropdownIndicator:(baseStyles) => ({
        ...baseStyles,
        padding: '0px'
    }),
}

const CoursesHeader = () => {
    const sortByOptions = ['Title','Date','Author'];
    const filter = ['C++','DSA','DBMS'];
    return (
        <div className='mb-5 flex flex-col'>
            <div className='flex flex-col justify-between items-center pb-3  md:flex-row'>
                <div className='text-[1.75rem] leading-[2.125rem] text-white text-center md:text-left font-semibold mb-2 md:mb-0'>
                    Courses
                </div>
                <div className="flex text-[#46D97E] items-center rounded-full border-2 border-[#46D97E] px-3 py-0.5 font-bold h-fit md:ml-10">
                    <div className='text-center text-md md:text-base'>Add a review</div>
                </div>
            </div>
            <hr className='border-white border-[0.0625rem]' />
            <div className='flex justify-end gap-1 text-black mt-2'>
                    <Select
                        className="basic-single"
                        styles={reactSelectStyle}
                        classNamePrefix="select"
                        placeholder="Sort By"
                        defaultValue={sortByOptions[0]}
                        isSearchable={false}
                        options={sortByOptions.map((e)=> ({label:e,value:e}))}
                    />                    
                    <Select
                        className="basic-single"
                        styles={reactSelectStyle}
                        classNamePrefix="select"
                        placeholder="Filter"
                        isMulti
                        isClearable={false}
                        defaultValue={filter[0]}
                        isSearchable={false}
                        options={filter.map((e)=> ({label:e,value:e}))}                       
                    />  
                </div>            
        </div>
    );
};

export { CoursesHeader };
