import React from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import './HomePage.css';

const Homepage = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/designs');
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              onClick={() => navigate('/')}
              className="font-weight-bold text-dark home-link"
              style={{ color: 'black' }}
              activeStyle={{ color: 'pink', fontWeight: 'bold' }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={handleExploreClick}
              className="font-weight-bold text-dark explore-link"
              style={{ color: 'black' }}
              activeStyle={{ color: 'pink', fontWeight: 'bold' }}
            >
              Explore
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
        <div className="d-flex flex-wrap justify-content-center">
          <motion.img
            src={img1}
            alt="Design 1"
            className="m-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ width: '250px', height: '400px', objectFit: 'cover' }}
          />
          <motion.img
            src={img2}
            alt="Design 2"
            className="m-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ width: '200px', height: '250px', objectFit: 'cover' }}
          />
          <motion.img
            src={img3}
            alt="Design 3"
            className="m-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            style={{ width: '300px', height: '350px', objectFit: 'cover' }}
          />
          <motion.img
            src={img4}
            alt="Design 4"
            className="m-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            style={{ width: '150px', height: '200px', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
