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

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Canvas from "../canvas/Canvas";

const ShopsInner = () => {
  const [refresh, isToRefresh] = useState(0);
  const [id, setShopID] = useState([]);
  const [innerShop, setInnerShop] = useState(undefined);
  const [shop, setShop] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const parts = window.location.href.split("/");
    var getId = parts[parts.length - 1];
    setShopID(getId);

    axios
      .get(`http://localhost:3000/api/v1/shop-layouts/${getId}`)
      .then(res => {
        console.log(res.data.layout.innerLayout);
        setInnerShop(res.data.layout.innerLayout);
        setShop(res.data.layout);
      });
  }, [refresh]);

  const handleAdd = async e => {
    navigate(`/shops/inner/add/${id}`);
  };

  const handleDelete = async e => {
    e.preventDefault();

    const bodyParameters = {
      identifier: +e.target.parentNode.parentNode.parentNode.getAttribute(
        "itemID"
      )
    };

    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/shop-layouts/remove-inner-layout/${id}`,
        bodyParameters
      );

      toast.success(`Layout "${res.data.name}" alterado com sucesso`);
      isToRefresh(refresh + 1);
    } catch (err) {
      console.log(err);
    }
  };

  let DisplayData = "Sem dados para apresentar";

  console.log("Here: " + innerShop + ".END.");
  console.log(innerShop !== undefined);

  if (innerShop !== undefined) {
    DisplayData = innerShop.map(shop => {
      return (
        <p>
          <div className="card" itemID={shop.identifier}>
            <div className="card-body row">
              <div className="col-md-1">{shop.identifier}</div>
              <div className="col-md-3">
                Ponto Inicial: {shop.upperLeft[0]}; {shop.upperLeft[1]}
              </div>
              <div className="col-md-3">
                Ponto Final: {shop.bottonRigh[0]}; {shop.bottonRigh[1]}
              </div>
              <div className="col-md-4">
                <div class="form-check form-switch">
                  É obstáculo
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    checked={!shop.isObstacle}
                  />
                </div>
              </div>
              <div className="col-md-1">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleDelete}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </p>
      );
    });
  }

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <div className="col-md-8">
          <PageTitle sm="4" title="Loja" className="text-sm-left" />
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
            <CardHeader className="border-bottom">
              <h6 className="m-0">Editar Loja</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <div className="modal-body">
                <div className="row">{DisplayData}</div>
              </div>
            </CardBody>
            <Canvas layout={shop} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ShopsInner;
