import React from 'react'
import { SideBar } from '../components/SideBar/SideBar'
import { CoursesHeader } from '../components/Courses/CoursesHeader';
import { CourseCard } from '../components/Courses/CoursesCard';

const Courses = () => {
    return (
        <div className='flex flex-col text-white md:flex-row px-[2%] bg-[#132D46] min-w-fit min-h-[100vh] gap-5 sm:flex-row'>
            <div className='w-full md:w-3/4 md:min-w-[60vh] min-w-[90vh] pt-20'>
            <CoursesHeader />
            <div className='flex flex-col gap-4'>
                <CourseCard />
                <CourseCard />
                <CourseCard />
            </div>
            </div>
            <SideBar title="Popular Courses"/>
        </div>
    );
};

export default Courses;