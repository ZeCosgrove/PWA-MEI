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
  const [refresh, setRefresh] = useState(0);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [pagination, setPagination] = useState({
    next: null,
    previous: null,
    page: 0
  });
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  const UserSystemState = {
    0: "Criado",
    1: "Ativo",
    2: "Inativo",
    3: "Eliminado"
  };

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
  }, [page, refresh]);

  const handleDelete = async e => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/users/delete/${e.target.id}`
      );

      toast.success(`Utilizador "${res.data.name}" eliminado com sucesso`);
      setRefresh(refresh + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async e => {
    navigate(`/users/${e.target.id}`);
  };

  const handleActivate = async e => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/users/systemState/update/${e.target.id}`,
        { systemState: 1 }
      );

      toast.success(`Utilizador "${res.data.name}" ativado com sucesso`);
      setRefresh(refresh + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const DisplayData = users.map(info => {
    return (
      <tr key={info._id}>
        <td>{info.name}</td>
        <td>{info.email}</td>
        <td>{UserSystemState[info.systemState]}</td>
        <td>
          <Button
            className="mb-2 mr-1 btn-secondary"
            id={info._id}
            onClick={handleActivate}
            disabled={info.systemState === 1}
          >
            Ativar
          </Button>
        </td>
        <td>
          <Button
            className="mb-2 mr-1 btn-third"
            id={info._id}
            onClick={handleEdit}
            disabled={info.systemState !== 1}
          >
            Editar
          </Button>
        </td>
        <td>
          <Button
            className="mb-2 mr-1 btn-primary"
            id={info._id}
            onClick={handleDelete}
            disabled={info.systemState !== 1}
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
                      Nome
                    </th>
                    <th scope="col" className="border-0">
                      Email
                    </th>
                    <th scope="col" className="border-0">
                      Estado no Sistema
                    </th>
                    <th scope="col" className="border-0">
                      Ativar
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
