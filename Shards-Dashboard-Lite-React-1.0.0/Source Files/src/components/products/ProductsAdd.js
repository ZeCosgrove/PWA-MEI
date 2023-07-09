import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "../common/PageTitle";
import axios from "axios";

import { toast } from "react-toastify";

const ProductsAdd = () => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [category, setCategory] = useState();
  const [location, setLocation] = useState();
  const [shop, setShop] = useState(null);

  const [loadCategory, setLoadCategory] = useState([]);
  const [loadShop, setLoadShop] = useState([]);
  const [innerLayouts, setInnerLayouts] = useState([]);

  useEffect(() => {
    const getCategorys = async () => {
      const res = await axios.get(`http://localhost:3000/api/v1/categories`);
      setLoadCategory(res.data.object);
    };
    const getShops = async () => {
      const res = await axios.get(`http://localhost:3000/api/v1/shop-layouts`);
      setLoadShop(res.data.object);
    };

    getCategorys();
    getShops();
  }, []);

  const handleCreate = async e => {
    e.preventDefault();

    const bodyParameters = {
      name: name,
      description: description,
      price: +price,
      quantity: +quantity,
      category: category,
      location: +location,
      shop: shop,
      systemState: 1
    };

    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/products`,
        bodyParameters
      );

      toast.success(`Produto "${res.data.name}" criada com sucesso`);
      setName("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleShopChange = event => {
    const selectedShopId = event.target.value;
    const selectedShop = loadShop.find(shop => shop._id === selectedShopId);

    setShop(selectedShop._id);
    setInnerLayouts(selectedShop.layout.innerLayout);
  };

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Produtos" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Criar Produto</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-8">
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
                  <div className="col-md-2">
                    <div className="form-group">
                      <label>Preço</label>
                      <input
                        type="text"
                        className="form-control"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <label>Quantidade</label>
                      <input
                        type="text"
                        className="form-control"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Descrição</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Categoria</label>
                      <select
                        className="form-control"
                        value={category}
                        onChange={e => {
                          setCategory(e.target.value);
                        }}
                      >
                        <option value="">Selecione uma categoria</option>
                        {loadCategory.map(option => (
                          <option key={option._id} value={option._id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Loja</label>
                      <select
                        className="form-control"
                        onChange={handleShopChange}
                      >
                        <option value="">Selecione uma Loja</option>
                        {loadShop.map(shop => (
                          <option key={shop._id} value={shop._id}>
                            {shop.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <div className="form-group">
                      <label>Localização</label>
                      <select
                        className="form-control"
                        id="innerLayoutDropdown"
                        onChange={e => setLocation(e.target.value)}
                        disabled={!shop}
                      >
                        <option value="">Select uma localização</option>
                        {innerLayouts.map(innerLayout => (
                          <option
                            key={innerLayout.identifier}
                            value={innerLayout.identifier}
                          >
                            {innerLayout.identifier}
                          </option>
                        ))}
                      </select>
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

export default ProductsAdd;
