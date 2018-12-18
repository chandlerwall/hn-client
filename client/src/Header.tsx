import { Alignment, Navbar } from "@blueprintjs/core";
import React from "react";

export class Header extends React.Component {
  render() {
    // TODO: add link for top/day/week/month
    return (
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>hn-offline</Navbar.Heading>
          <Navbar.Divider />
        </Navbar.Group>
      </Navbar>
    );
  }
}
