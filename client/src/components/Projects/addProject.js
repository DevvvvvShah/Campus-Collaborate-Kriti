import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { Autocomplete, Chip } from '@mui/material';
import { getTechStacks } from '../../fetch/techStacks';
import axios from 'axios';

function AddProject(props) {
  const [techStackIds, setTechStackIds] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [linkToProject, setLinkToProject] = useState('');
  const [description, setDescription] = useState('');
  const [techStacks, setTechStacks] = useState([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);

  useEffect(() => {
    getTechStacks().then((res) => {
      const formattedTechStacks = res.data.map((value, index) => (
        { id: value._id , title: value.name }
      ));
      setTechStacks(formattedTechStacks);
    });
  }, []);

  const handleTechStacksChange = (event, value) => {
    setSelectedTechStacks(value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files);
  };

  const handleAddProject = () => {
    const formData = new FormData();
    setTechStackIds(selectedTechStacks.map((value, index) => value.id));


    formData.append('title', projectName);
    formData.append('githubLink', linkToProject);
    formData.append('description', description);
    techStackIds.forEach((value, index) => {
      formData.append('techStacks', value);
    });
    formData.append('creatorId', localStorage.getItem('user'));
    for (let i = 0; i < selectedFile.length; i++) {
      formData.append('media', selectedFile[i]);
    }


    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true // Add withCredentials option
    };

    axios.post('http://localhost:3001/projects/', formData, config)
      .then(response => {
        // Handle the response from the server
        console.log(response.data);
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <Container component={Paper} maxWidth="sm">
      <Box p={4}>
        <Typography variant="h4" gutterBottom>Add a Project</Typography>
        <TextField
          label="Project Name"
          variant="outlined"
          fullWidth
          size="small"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Link To Project"
          variant="outlined"
          fullWidth
          size="small"
          value={linkToProject}
          onChange={(e) => setLinkToProject(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          size="small"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <Autocomplete
          className='mt-4'
          multiple
          options={techStacks}
          getOptionLabel={(option) => option.title}
          value={selectedTechStacks}
          onChange={handleTechStacksChange}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip label={option.title} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="TechStacks Used" placeholder="Select TechStacks" size="small" />
          )}
        />
        <input type="file" multiple className="pt-4" onChange={handleFileChange} />
        <div className="flex gap-2 justify-between mt-4">
          <Button variant="contained" onClick={handleAddProject} style={{ backgroundColor: '#0016DA' }}>Add</Button>
          <Button variant="contained"  onClick={() => props.setIsAddProject(false)} style={{ backgroundColor: '#0016DA' }}>Cancel</Button>
        </div>
      </Box>
    </Container>
  );
}

export default AddProject;
