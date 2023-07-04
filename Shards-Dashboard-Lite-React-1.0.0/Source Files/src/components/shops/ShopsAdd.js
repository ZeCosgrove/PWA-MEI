import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "../common/PageTitle";
import axios from "axios";

import { toast } from "react-toastify";

const ShopsAdd = () => {
  const [name, setName] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [length, setLength] = useState();
  const [width, setWidth] = useState();

  const handleCreate = async e => {
    e.preventDefault();

    const bodyParameters = {
      name: name,
      realWorldCoordinates: [+latitude, +longitude],
      layout: {
        upperLeft: [0, 0],
        upperRight: [0, +length],
        bottomLeft: [+width, 0],
        bottonRigh: [+width, +length]
      }
    };

    try {
      console.log(bodyParameters);

      const res = await axios.post(
        `http://localhost:3000/api/v1/shop-layouts`,
        bodyParameters
      );

      toast.success(`Loja "${res.data.name}" criada com sucesso`);
      setName("");
      setLatitude("");
      setLongitude("");
      setLength("");
      setWidth("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Lojas" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Adicionar Loja</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Nome</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Latitude</label>
                      <input
                        type="text"
                        className="form-control"
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Longitude</label>
                      <input
                        type="text"
                        className="form-control"
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Comprimento</label>
                      <input
                        type="text"
                        className="form-control"
                        value={length}
                        onChange={e => setLength(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Largura</label>
                      <input
                        type="text"
                        className="form-control"
                        value={width}
                        onChange={e => setWidth(e.target.value)}
                      />
                    </div>
                  </div>
                  <p />
                  <div className="col-md-12">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleCreate}
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ShopsAdd;
