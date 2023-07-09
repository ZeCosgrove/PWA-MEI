import React, { useState } from "react";
import { useSignOut } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

const UserActions = () => {
  const [visible, setVisible] = useState(false);
  const signOut = useSignOut();
  const navigate = useNavigate();

  const toggleUserActions = () => {
    setVisible(!visible);
  };

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
      <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
        <span className="d-none d-md-inline-block">
          {JSON.parse(localStorage.getItem("_auth_state")).name}
        </span>
      </DropdownToggle>
      <Collapse tag={DropdownMenu} right small open={visible}>
        <DropdownItem divider />
        <DropdownItem
          tag={Link}
          // to="/login"
          className="text-danger"
          onClick={handleLogout}
        >
          <i className="material-icons text-danger">&#xE879;</i> Terminar Sessão
        </DropdownItem>
      </Collapse>
    </NavItem>
  );
};

export default UserActions;
