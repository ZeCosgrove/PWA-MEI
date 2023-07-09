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
import ImageDisplayer from "../imageDisplayer/ImageDisplayer";

const Products = () => {
  const [refresh, isToRefresh] = useState(0);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [category, setCategory] = useState();
  const [shop, setShop] = useState();
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
    let filterProduct = new String();
    let filterCategory = new String();
    let filterShop = new String();

    if (product != undefined && product != "") {
      filterProduct = `&product=${product}`;
    }
    if (category != undefined && category != "") {
      filterCategory = `&category=${category}`;
    }
    if (shop != undefined && shop != "") {
      filterShop = `&shop=${shop}`;
    }

    axios
      .get(
        `http://localhost:3000/api/v1/products?page=${page}&perPage=5${filterProduct}${filterCategory}${filterShop}`
      )
      .then(response => {
        setProducts(response.data.object);
        setPagination({
          next: response.data.next,
          previous: response.data.previous,
          page: page
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, [page, refresh, product, category, shop]);

  const handleDelete = async e => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/categories/${e.target.id}`
      );

      toast.success("Categoria eliminada com sucesso");
      isToRefresh(refresh + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async e => {
    navigate(`/products/${e.target.id}`);
  };

  const handleAdd = async e => {
    navigate(`/products/add`);
  };

  const DisplayData = products.map(info => {
    return (
      <tr key={info._id}>
        {/* <td>{info._id}</td> */}
        <td className="d-flex justify-content-center">
          {info.image && info.image.data && (
            <ImageDisplayer imageData={info.image.data} height={55} />
          )}
        </td>
        <td>{info.name}</td>
        <td>{info.price}</td>
        <td>{info.quantity}</td>
        <td>{info.category.name}</td>
        <td>{info.shop.name}</td>
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
        <div className="col-md-8">
          <PageTitle sm="4" title="Produtos" className="text-sm-left" />
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
      <div className="row">
        <div className="col-md-3">
          <input
            class="navbar-search form-control"
            type="text"
            placeholder="Filtrar por Produto..."
            aria-label="Search"
            value={product}
            onChange={e => setProduct(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            class="navbar-search form-control"
            type="text"
            placeholder="Filtrar por Categoria..."
            aria-label="Search"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            class="navbar-search form-control"
            type="text"
            placeholder="Filtrar por Loja..."
            aria-label="Search"
            value={shop}
            onChange={e => setShop(e.target.value)}
          />
        </div>
      </div>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom"></CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Img
                    </th>
                    <th scope="col" className="border-0">
                      Nome
                    </th>
                    <th scope="col" className="border-0">
                      Preço
                    </th>
                    <th scope="col" className="border-0">
                      Quantidade
                    </th>
                    <th scope="col" className="border-0">
                      Categoria
                    </th>
                    <th scope="col" className="border-0">
                      Loja
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

export default Products;
