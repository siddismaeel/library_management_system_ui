import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Alert} from 'react-bootstrap';

function Alerts({alerts}) {
  
  if (alerts && alerts.length > 0)
    return (<Alert variant={alerts[0].alertType} fade show
                   className={`primary-alert text-${alerts[0].alertType} fixed-top offset-md-3 offset-lg-2 mb-0`}>
      {alerts[0].msg}
    </Alert>)

  return null;
}

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, null)(Alerts);
