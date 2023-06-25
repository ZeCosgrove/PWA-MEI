import React, { useEffect, useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button
} from "shards-react";

import PageTitle from "../common/PageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import UserEdit from "../user-edit-modal/UserEdit";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  if (!isAuthenticated()) {
    navigate("/login");
  }

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("_auth")}` }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/users", config)
      .then(response => {
        setUsers(response.data.object);
      })
      .catch(err => {
        if ((err.response.status = 403)) {
          navigate("/login");
        }
        console.log(err);
      });
  });

  const handleDelete = async e => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/users/delete/${e.target.id}`,
        config
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async e => {
    setOpenModal(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/users/details/${e.target.id}`,
        config
      );
      console.log(res);

      return <UserEdit />;
    } catch (err) {
      console.log(err);
    }
  };

  const DisplayData = users.map(info => {
    return (
      <tr>
        <td>{info._id}</td>
        <td>{info.name}</td>
        <td>{info.email}</td>
        <td>
          <Button
            className="mb-2 mr-1 btn-secondary"
            id={info._id}
            onClick={handleEdit}
          >
            Editar
          </Button>
        </td>
        <td>
          <Button
            className="mb-2 mr-1 btn-primary"
            id={info._id}
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Users" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Active Users</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      #
                    </th>
                    <th scope="col" className="border-0">
                      Name
                    </th>
                    <th scope="col" className="border-0">
                      Email
                    </th>
                    <th scope="col" className="border-0">
                      Editar
                    </th>
                    <th scope="col" className="border-0">
                      Eliminar
                    </th>
                  </tr>
                </thead>
                <tbody>{DisplayData}</tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Pagination />
      <UserEdit isOpen={openModal} />
    </Container>
  );
};

export default Users;
