import React, {useEffect} from 'react';
import Navbar from '../components/Navbar/Navbar';
import Topbar from '../components/Navbar/Topbar';
import Project from '../components/Projects.js/MainProject';    

function Projects() {
    const [isExpanded, setIsExpanded] = React.useState(true);
    const [projects, setProjects] = React.useState([]); 
            
    return (
        <div className='relative flex flex-col md:flex-row bg-[#F8F8F8] w-screen min-h-[100vh]'>
            <Navbar isExpanded = {isExpanded} setIsExpanded= {setIsExpanded} select={{projects:true}}/>          
            <div className='w-full'>
                <Topbar title="Projects"/>
                <Project />
            </div>
            <div className='fixed flex justify-center shadow-lg items-center gap-2 md:bottom-2 md:right-2 bottom-[9vh] right-2
                     w-[180px] h-[45px] bg-[#FFFFFF] rounded-full'>
                    <img
                        src='images/add.svg'
                        alt='add'
                        className={`w-[50%] h-[50%] md:w-fit md:h-[65%] object-contain`}/>
                        <div className='text-[#0016DA] text-[0.875rem] font-semibold'>Add a Project</div>
            </div>     
        </div>            
    );
}

export default Projects;
