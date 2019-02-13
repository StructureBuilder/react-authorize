import React, { Component } from 'react';

export default class Unauthorized extends Component {
  render() {
    return (
      <div>You didn't pass the authentication.</div>
    );
  }
}