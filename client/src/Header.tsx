import { Alignment, Navbar } from "@blueprintjs/core";
import React from "react";
import { Link } from "react-router-dom";

export class Header extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <Link to="/">hn-offline</Link>
          </Navbar.Heading>
          <Navbar.Divider />
          <Link to="/day">day</Link>
          <Navbar.Divider />
          <Link to="/week">week</Link>
          <Navbar.Divider />
          <Link to="/month">month</Link>
        </Navbar.Group>
      </Navbar>
    );
  }
}
