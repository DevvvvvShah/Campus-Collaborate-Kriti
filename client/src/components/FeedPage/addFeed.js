import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { Autocomplete, Chip } from '@mui/material';
import { getTechStacks } from '../../fetch/techStacks';
import axios from 'axios';

function AddFeed(props) {
  const [caption, setCaption] = useState('');
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

  const handleAddCourse = () => {
    const formData = new FormData();
    let techStackIds = (selectedTechStacks.map((value, index) => value.id));
    formData.append('creator', localStorage.getItem('user'));
    formData.append('caption', caption);
    techStackIds.forEach((value, index) => {
      formData.append('techStacks', value);
    });
    for (let i = 0; i < selectedFile.length; i++) {
      formData.append('media', selectedFile[i]);
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true // Add withCredentials option
    };    

    props.setIsAddFeed(false);

    axios.post('http://localhost:3001/posts/', formData, config)
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
        <Typography variant="h4" gutterBottom>Add a new Post</Typography>
        <TextField
          label="Caption"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          size="small"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
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
          <Button variant="contained" onClick={handleAddCourse} style={{ backgroundColor: '#0016DA' }}>Add</Button>
          <Button variant="contained"  onClick={() => props.setIsAddFeed(false)} style={{ backgroundColor: '#0016DA' }}>Cancel</Button>
        </div>
      </Box>
    </Container>
  );
}

export default AddFeed;
