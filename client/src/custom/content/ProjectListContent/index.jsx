/* React imports */
import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

/* Custom imports */
import { Col, Row, Anchor } from 'react-bootstrap';

function ProjectContent({
  key, name, description, imageUrl, link,
}) {
  return (
    <Row key={key}>
      <Col xs={12} className="d-flex flex-column justify-content-center align-items-center">
        <Anchor href={link} className="project-card d-flex flex-row align-items-center p-2 mb-1">
          <div className="project-image-frame d-flex justify-content-center align-items-center">
            <img className="project-image" src={imageUrl} alt="project" />
          </div>
          <div className="d-flex flex-column justify-content-start mx-3">
            <div className="project-name">{name}</div>
            <div className="project-description">{description}</div>
          </div>
        </Anchor>
      </Col>
    </Row>
  );
}

ProjectContent.propTypes = {
  key: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

function ProjectListContent({ attributes }) {
  return attributes.map(({ value }) => JSON.parse(value)).map(ProjectContent);
}

ProjectListContent.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })),
};

ProjectListContent.defaultProps = {
  attributes: [],
};

export default ProjectListContent;
