/* React imports */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

/* Custom imports */
import './index.css';
import { Button, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login } from '../../../core/redux/actions';

const initialFormData = Object.freeze({
  username: '',
  password: '',
});

function LoginFormContent({ login_ }) {
  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login_(formData.username, formData.password, useNavigate());
  };

  return (
    <Col xs={11} md={6} lg={4} xxl={3} className="d-flex flex-column align-items-baseline mx-auto">
      <Form className="w-100" onSubmit={handleSubmit}>

        {/* Username */}
        <Form.Group className="mb-3" onChange={handleChange}>
          <Form.Label>Username</Form.Label>
          <Form.Control name="username" type="text" />
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3" onChange={handleChange}>
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" />
        </Form.Group>

        {/* Submit */}
        <Button type="submit" className="w-100 button-link link mx-0 my-3">
          Log In
        </Button>
      </Form>
    </Col>
  );
}

LoginFormContent.propTypes = {
  login_: PropTypes.func,
};

LoginFormContent.defaultProps = {
  login_: null,
};

const mapDispatchToProps = {
  login_: login,
};

export default connect(null, mapDispatchToProps)(LoginFormContent);
