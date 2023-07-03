import React, { useEffect, useState } from "react";
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

const Shops = () => {
  const [refresh, isToRefresh] = useState(0);
  const [shops, setShops] = useState([]);
  const [page, setPage] = useState(0);
  const [pagination, setPagination] = useState({
    next: null,
    previous: null,
    page: 0
  });

  const navigate = useNavigate();

  const handleCounterChange = newCounter => {
    setPage(page + newCounter);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/shop-layouts?page=${page}&perPage=5`)
      .then(response => {
        setShops(response.data.object);
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
      await axios.patch(
        `http://localhost:3000/api/v1/shop-layouts/change-system-state/${e.target.id}`,
        { systemState: 2 }
      );

      toast.success("Loja eliminada com sucesso");
      isToRefresh(refresh + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditMap = async e => {
    navigate(`/shops/inner/${e.target.id}`);
  };

  const handleEditShop = async e => {
    navigate(`/shops/${e.target.id}`);
  };

  const handleAdd = async e => {
    navigate(`/shops/add`);
  };

  const DisplayData = shops.map(info => {
    return (
      <tr key={info._id}>
        <td>{info._id}</td>
        <td>{info.name}</td>
        <td>{info.layout.bottonRigh[0] * info.layout.bottonRigh[1]}</td>
        <td>
          <Button
            className="mb-2 mr-1 btn-secondary"
            id={info._id}
            onClick={handleEditMap}
          >
            Editar
          </Button>
        </td>
        <td>
          <Button
            className="mb-2 mr-1 btn-third"
            id={info._id}
            onClick={handleEditShop}
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
        <div className="col-md-8">
          <PageTitle sm="4" title="Lojas" className="text-sm-left" />
        </div>
        <div className="col-md-4">
          <Button
            className="mb-2 mr-1 btn-primary btn-add float-end"
            onClick={handleAdd}
          >
            Adicionar
          </Button>
        </div>
      </Row>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom"></CardHeader>
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
                      Dimensões
                    </th>
                    <th scope="col" className="border-0">
                      Editar Mapa
                    </th>
                    <th scope="col" className="border-0">
                      Editar Loja
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

export default Shops;
