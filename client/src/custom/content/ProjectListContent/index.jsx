/* React imports */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/* Redux imports */
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { getProjectList } from '../../redux/actions';

function ProjectListContent({ projects, getProjectList_ }) {
  useEffect(() => {
    getProjectList_();
  }, []);

  return projects.map((project) => (
    <Row key={project._id}>
      <Col xs={4}>
        {project.name}
      </Col>
      <Col xs={4}>
        {project.description}
      </Col>
      <Col xs={4}>
        {project.imageUrl}
      </Col>
    </Row>
  ));
}

ProjectListContent.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
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
