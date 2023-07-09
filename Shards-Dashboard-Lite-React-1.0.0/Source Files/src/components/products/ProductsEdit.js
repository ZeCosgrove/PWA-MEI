import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "../common/PageTitle";
import axios from "axios";

import { toast } from "react-toastify";
import ImageDisplayer from "../imageDisplayer/ImageDisplayer";

const ProductsEdit = () => {
  const [id, setProductId] = useState();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [category, setCategory] = useState();
  const [location, setLocation] = useState();
  const [shop, setShop] = useState();
  const [image, setImage] = useState();

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

    const parts = window.location.href.split("/");
    var getId = parts[parts.length - 1];
    setProductId(getId);

    axios.get(`http://localhost:3000/api/v1/products/id/${getId}`).then(res => {
      setName(res.data.name);
      setDescription(res.data.description);
      setPrice(res.data.price);
      setQuantity(res.data.quantity);
      setLocation(res.data.location);
      setCategory(res.data.category.name);
      setShop(res.data.shop.name);
      setImage(res.data.image.data);
    });
  }, []);

  const handleEdit = async e => {
    e.preventDefault();

    const bodyParameters = {
      name: name,
      description: description,
      price: +price,
      quantity: +quantity,
      location: +location,
      category: category,
      shop: shop
    };

    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/products/${id}`,
        bodyParameters
      );

      toast.success(`Produto "${res.data.name}" editado com sucesso`);
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
              <h6 className="m-0">Editar Produto</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-2">
                    {image && <ImageDisplayer imageData={image} height={100} />}
                  </div>
                  <div className="col-md-10">Input para receber image?</div>
                  <div className="col-md-2"></div>
                  <div className="col-md-6">
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
                        {loadCategory.map(option => (
                          <option key={option._id} value={option.name}>
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

export default ProductsEdit;
