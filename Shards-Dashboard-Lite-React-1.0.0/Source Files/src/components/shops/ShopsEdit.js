import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "../common/PageTitle";
import axios from "axios";

import { toast } from "react-toastify";

const ShopsEdit = () => {
  const [id, setShopID] = useState([]);
  const [name, setName] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [length, setLength] = useState();
  const [width, setWidth] = useState();

  useEffect(() => {
    const parts = window.location.href.split("/");
    var getId = parts[parts.length - 1];
    setShopID(getId);

    axios
      .get(`http://localhost:3000/api/v1/shop-layouts/${getId}`)
      .then(res => {
        setName(res.data.name);
        setLatitude(res.data.realWorldCoordinates[0]);
        setLongitude(res.data.realWorldCoordinates[1]);
        setLength(res.data.layout.bottonRigh[0]);
        setWidth(res.data.layout.bottonRigh[1]);
      });
  }, []);

  const handleEdit = async e => {
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
      const res = await axios.patch(
        `http://localhost:3000/api/v1/shop-layouts/${id}`,
        bodyParameters
      );

      toast.success(`Loja "${res.data.name}" editada com sucesso`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Loja" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Editar Loja</h6>
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
                      onClick={handleEdit}
                    >
                      Editar
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

export default ShopsEdit;
