import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import vendors from '../../../../tempData';

export class VendorsList extends Component {
  static propTypes = {
    vendors: PropTypes.array.isRequired
  };

  renderList() {
    return this.props.vendors.map((vendor) => {
      return (
        <li key={vendor.id}>{vendor.fullName}</li>
      );
    });
  }

  render() {
    return (
      <ul>
        {this.renderList()}
      </ul>
    );
  }
}

const mapStateToProps = () => ({
  vendors
});

export default connect(mapStateToProps)(VendorsList);
