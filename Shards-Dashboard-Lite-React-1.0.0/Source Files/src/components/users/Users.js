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
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [pagination, setPagination] = useState({
    next: null,
    previous: null,
    page: 0
  });
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  const handleCounterChange = newCounter => {
    setPage(page + newCounter);
  };

  if (!isAuthenticated()) {
    navigate("/login");
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/users?page=${page}&perPage=5`)
      .then(response => {
        setUsers(response.data.object);
        setPagination({
          next: response.data.next,
          previous: response.data.previous,
          page: page
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, [page]);

  const handleDelete = async e => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/users/delete/${e.target.id}`
      );

      toast.success(`Utilizador "${res.data.name}" eliminado com sucesso`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async e => {
    navigate(`/users/${e.target.id}`);
  };

  const DisplayData = users.map(info => {
    return (
      <tr key={info._id}>
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
        <PageTitle sm="4" title="Utilizadores" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Utilizadores Ativos</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      #
                    </th>
                    <th scope="col" className="border-0">
                      Nome
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
      <Pagination
        onCounterChange={handleCounterChange}
        pagination={pagination}
      />
    </Container>
  );
};

export default Users;
