import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "../common/PageTitle";
import axios from "axios";

import { toast } from "react-toastify";

const ShopsInnerAdd = () => {
  const [name, setName] = useState([]);
  const [xPoint, setXPoint] = useState();
  const [yPoint, setYPoint] = useState();
  const [length, setLength] = useState();
  const [width, setWidth] = useState();
  const [isObstacle, setIsObstacle] = useState();

  const handleCreate = async e => {
    e.preventDefault();

    const parts = window.location.href.split("/");
    var id = parts[parts.length - 1];

    const bodyParameters = {
      upperLeft: [+xPoint, +yPoint],
      upperRight: [+xPoint, +yPoint + +length],
      bottomLeft: [+xPoint + +width, +yPoint],
      bottonRigh: [+xPoint + +width, +yPoint + +length],
      isObstacle: !isObstacle
    };

    try {
      console.log(bodyParameters);

      const res = await axios.patch(
        `http://localhost:3000/api/v1/shop-layouts/add-inner-layout/${id}`,
        bodyParameters
      );

      toast.success(`Layout para Loja"${res.data.name}" alterado com sucesso`);
      setLength("");
      setWidth("");
      setXPoint("");
      setYPoint("");
      setIsObstacle(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleIsObstacle = () => {
    setIsObstacle(!isObstacle);
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
              <h6 className="m-0">Adicionar Layout em Loja</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Ponto X Inicial</label>
                      <input
                        type="text"
                        className="form-control"
                        value={xPoint}
                        onChange={e => setXPoint(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Ponto Y Inicial</label>
                      <input
                        type="text"
                        className="form-control"
                        value={yPoint}
                        onChange={e => setYPoint(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Comprimento</label>
                      <input
                        type="text"
                        className="form-control"
                        value={width}
                        onChange={e => setWidth(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Largura</label>
                      <input
                        type="text"
                        className="form-control"
                        value={length}
                        onChange={e => setLength(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                          checked={isObstacle}
                          onChange={handleIsObstacle}
                        />
                        É obstáculo
                      </div>
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

export default ShopsInnerAdd;
