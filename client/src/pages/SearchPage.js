import React,{ useEffect, useState }  from 'react';
import Navbar from '../components/Navbar/Navbar';
import Topbar from '../components/Navbar/Topbar';
import fetchProfilesBySearch from '../fetch/search';
import ProfileUnit from '../components/Search/ProfileUnit';

function SearchPage() {
    const [isExpanded, setIsExpanded] = useState(true);
    const [search, setSearch] = useState("");
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        fetchProfilesBySearch(search)
        .then((res) => setProfiles(res))
        .catch((err) => console.log(err));
    }, [search]);
    


  
    return (
      <div className="relative flex flex-col md:flex-row bg-[#F8F8F8] w-screen min-h-[100vh]">
        <Navbar
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          select={{ search: true}}
        />
        <div className="w-screen">
          <Topbar title="Search" />
          
          <div className="ml-[40vw] flex  m-10 w-[40vw] h-[4vh] border-2 border-gray-300 rounded-xl">
            <img
                src="images/search.svg"
                alt="search icon"
                className="w-[1rem] h-[1rem] m-2 hover:cursor-pointer"
                />
            <input type="text" placeholder="Search for users" className='w-full focus:outline-none' onChange={(e) => setSearch(e.target.value)} />
          </div>

            <div className="ml-[40vw] w-[40vw]">
                {profiles.map((profile) => (
                    <ProfileUnit key={profile.id} user={profile} />
                ))}
            </div>
            
        </div>
      </div>
    );
  }

export default SearchPage;
