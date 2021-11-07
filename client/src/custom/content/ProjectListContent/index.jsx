/* React imports */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.css';

/* Custom imports */
import { Col, Row, Anchor } from 'react-bootstrap';

/* Redux imports */
import { connect } from 'react-redux';
import { getProjectList } from '../../redux/actions';

function ProjectListContent({ projects, getProjectList_ }) {
  useEffect(() => {
    getProjectList_();
  }, []);

  return projects.map(({
    key, name, description, imageUrl, link,
  }) => (
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
  ));
}

ProjectListContent.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    link: PropTypes.string,
  })),
  getProjectList_: PropTypes.func,
};

ProjectListContent.defaultProps = {
  projects: [],
  getProjectList_: null,
};

function mapStateToProps(state) {
  return {
    projects: state.custom.projects,
  };
}

const mapDispatchToProps = {
  getProjectList_: getProjectList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContent);
