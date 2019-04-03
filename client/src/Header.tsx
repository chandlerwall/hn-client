import React from "react";
import { Button, Glyphicon, Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink, Route } from "react-router-dom";

interface HeaderProps {
  requestNewData(): void;
}

export class Header extends React.PureComponent<HeaderProps> {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to="/">hn-offline</NavLink>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to="/day">
            <NavItem eventKey={1}>day</NavItem>
          </LinkContainer>

          <LinkContainer to="/week">
            <NavItem eventKey={2}>week</NavItem>
          </LinkContainer>

          <LinkContainer to="/month">
            <NavItem eventKey={3}>month</NavItem>
          </LinkContainer>
        </Nav>

        <Route
          render={({ location }) => {
            return location.pathname.indexOf("/story") === -1 ? (
              <Navbar.Form pullRight>
                <Button
                  bsStyle="primary"
                  onClick={() => this.props.requestNewData()}
                >
                  <Glyphicon glyph="refresh" />
                </Button>
              </Navbar.Form>
            ) : null;
          }}
        />
      </Navbar>
    );
  }
}
