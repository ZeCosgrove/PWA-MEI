import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "../common/PageTitle";
import axios from "axios";

import { toast } from "react-toastify";

const UserEdit = () => {
  const [id, setUserId] = useState([]);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [nif, setNif] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [zip, setZip] = useState(null);

  useEffect(() => {
    const parts = window.location.href.split("/");
    var getId = parts[parts.length - 1];
    setUserId(getId);

    axios
      .get(`http://localhost:3000/api/v1/users/details/${getId}`)
      .then(res => {
        setName(res.data.name);
        setEmail(res.data.email);
        setRole(res.data.role);
        setMobile(res.data.mobile);
        setNif(res.data.nif);
        if (res.data.nif !== undefined) {
          setAddress(res.data.address.address);
          setCity(res.data.address.city);
          setZip(res.data.address.zip);
        }
      });
  }, []);

  const handleEdit = async e => {
    e.preventDefault();

    const bodyParameters = {
      name: name,
      email: email,
      role: +role,
      ...(mobile !== null && { mobile: +mobile }),
      ...(nif !== null && { nif: +nif }),
      address: {
        ...(address !== null && { address }),
        ...(city !== null && { city }),
        ...(zip !== null && { zip })
      }
    };

    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/users/${id}`,
        bodyParameters
      );

      toast.success(`Utilizador "${res.data.name}" editado com sucesso`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Utilizadores" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Editar Utilizador</h6>
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
                  <div className="col-md-8">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Role</label>
                      <div className="form-group">
                        <select
                          className="form-control"
                          value={role}
                          onChange={e => {
                            setRole(e.target.value);
                          }}
                        >
                          <option value={0}>Cliente</option>
                          <option value={1}>Staff</option>
                          <option value={2}>Admin</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Telemóvel</label>
                      <input
                        type="text"
                        className="form-control"
                        value={mobile}
                        onChange={e => setMobile(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Nif</label>
                      <input
                        type="text"
                        className="form-control"
                        value={nif}
                        onChange={e => setNif(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label>Morada</label>
                    <input
                      type="text"
                      className="form-control"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Cidade</label>
                    <input
                      type="text"
                      className="form-control"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Código-Postal</label>
                    <input
                      type="text"
                      className="form-control"
                      value={zip}
                      onChange={e => setZip(e.target.value)}
                    />
                  </div>
                  <p />
                  <div className="col-md-12">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      // onClick={() =>
                      //   handleEdit();
                      //   notify()}
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

export default UserEdit;
