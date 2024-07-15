import React, { useState } from 'react';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.png';
import image7 from '../assets/image7.png';
import image8 from '../assets/image8.png';
import image9 from '../assets/image9.png';

const Designs = () => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(Array(12).fill(false));
  const [feedbacks, setFeedbacks] = useState(Array(12).fill(''));
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleGoBack = () => {
    navigate("/");
  };

  const handleLike = (index) => {
    const newLikes = [...likes];
    newLikes[index] = !newLikes[index];
    setLikes(newLikes);
  };

  const handleShowModal = (index) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentIndex(null);
  };

  const handleFeedbackChange = (e) => {
    const newFeedbacks = [...feedbacks];
    newFeedbacks[currentIndex] = e.target.value;
    setFeedbacks(newFeedbacks);
  };

  const handleFeedbackSubmit = () => {
    console.log(`Feedback for image ${currentIndex + 1}: ${feedbacks[currentIndex]}`);
    handleCloseModal();
  };


  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
  ];

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>New Designs</h2>
        <button className="btn btn-secondary" onClick={handleGoBack}>
          <i className="fas fa-arrow-left"></i> Go Back
        </button>
      </div>
      <div className="row">
        {images.map((image, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Card>
              <Card.Img variant="top" src={image} />
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Button
                    variant={likes[index] ? "danger" : "outline-danger"}
                    onClick={() => handleLike(index)}
                  >
                    {likes[index] ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
                    {likes[index] ? " Liked" : " Like"}
                  </Button>
                </div>
                <div>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleShowModal(index)}
                  >
                    <i className="fas fa-comment"></i> Feedback
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <Link to="/contest">
          <Button variant="success" className="mb-3">Participate in Contest</Button>
        </Link>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="feedback">
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={feedbacks[currentIndex] || ''}
                onChange={handleFeedbackChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFeedbackSubmit}>
            Submit Feedback
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Designs;
