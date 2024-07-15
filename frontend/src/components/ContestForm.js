import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ContestForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('description', description);

    try {
      const response = await axios.post('http://localhost:3001/api/contest', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Form submitted:', response.data);
      setSubmissionStatus('success');
      setName('');
      setImage(null);
      setDescription('');
      setTimeout(() => {
        setSubmissionStatus(null); 
        navigate('/designs');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionStatus('error');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Submit Your Entry</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/designs')}>
          <i className="fas fa-arrow-left"></i> Go Back
        </button>
        
      </div>
      {submissionStatus === 'success' && (
        <Alert variant="success" onClose={() => setSubmissionStatus(null)} dismissible>
          Entry submitted successfully!
        </Alert>
      )}
      {submissionStatus === 'error' && (
        <Alert variant="danger" onClose={() => setSubmissionStatus(null)} dismissible>
          Error submitting entry. Please try again later.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Image Upload</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} required />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description of your image"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-3'>
          Submit Entry
        </Button>
      </Form>
    </div>
  );
};

export default ContestForm;
