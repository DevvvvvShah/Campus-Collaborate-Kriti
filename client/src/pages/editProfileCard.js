import React from "react";
import {
  InputField,
  DivField,
  TextField,
  MultiCreate,
  MultiSelect,
} from "../components/InputField";

const EditProfileCard = () => {
  //Connect to Backend
  const name = "abcd";
  const rollNumber = "220222222";
  const emailId = "abcd@iitg.ac.in";
  const [selectedSkills, setSelectedSkills] = React.useState([]);
  const [altEmail, setAltEmail] = React.useState("");
  const [contactNumber, setContactNumber] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [socials, setSocials] = React.useState([]);

  const handleSubmit = () => {
    return;
  };

  const handleCancel = () => {
    return;
  };

  return (
    <div className="w-screen min-h-fit flex justify-center items-center px-4">
      <div className="sm:min-w-[550px] sm:my-10 h-fit bg-[#FFFFFF] shadow-xl rounded-lg p-4 my-5">
        <h2 className="text-center font-bold text-2xl p-4">
          Edit Your Profile
        </h2>
        <div className="flex flex-col items-center">
          <div className="w-[40%] flex flex-col items-center">
            <div>
              <div className="border-8 border-[white] shadow-2xl bg-[url('/public/profile.jpg')] bg-cover w-[9rem] h-[9rem] rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-col w-[60%] pl-2">
            <div>
              <DivField label="Name:" data={name} />
              <DivField label="Roll Number:" data={rollNumber} />
              <DivField label="Outlook Email ID:" data={emailId} />
              <InputField
                label="Alt Email ID:"
                value={altEmail}
                setValue={setAltEmail}
              />
              <InputField
                label="Contact Number:"
                value={contactNumber}
                setValue={setContactNumber}
              />
              <MultiCreate
                label="Social Media"
                value={socials}
                setValue={setSocials}
              />
              <TextField label="Bio" value={bio} setValue={setBio} />
              <MultiSelect
                label="Skills:"
                value={selectedSkills}
                setValue={setSelectedSkills}
              />
              <div className="flex">
                <button className="ml-auto mr-[20px] text-[#46D97E] text-[12px] font-bold rounded-lg px-4 py-1 border-[1.5px] border-[#46D97E]">
                  Add Project
                </button>
              </div>
              <br />
              <div className="flex">
                <button
                  className="bg-[#46D97E] ml-auto text-white text-[12px] font-bold rounded-lg px-4 py-1"
                  onSubmit={handleSubmit}
                >
                  Submit
                </button>
                <button
                  className="ml-[10px] mr-[20px] text-[#46D97E] text-[12px] font-bold rounded-lg px-4 py-1 border-[1.5px] border-[#46D97E]"
                  onSubmit={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileCard;
