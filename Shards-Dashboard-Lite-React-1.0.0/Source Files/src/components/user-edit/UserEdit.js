import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormSelect
} from "shards-react";

import PageTitle from "../common/PageTitle";
import axios from "axios";

import { toast } from "react-toastify";

const UserEdit = () => {
  const [id, setUserId] = useState([]);

  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [role, setRole] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [nif, setNif] = useState([]);
  const [address, setAddress] = useState([]);
  const [city, setCity] = useState([]);
  const [zip, setZip] = useState([]);

  const UserRoles = [
    {
      id: 0,
      name: "Cliente"
    },
    {
      id: 1,
      name: "Staff"
    },
    {
      id: 2,
      name: "Administrador"
    }
  ];

  const rolesData = UserRoles.map(role => {
    return <option key={role.id}>{role.name}</option>;
  });

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
      // role: role,
      mobile: +mobile,
      nif: +nif,
      address: {
        address: address,
        city: city,
        zip: zip
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
      alert("Error");
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
                      <FormSelect value={role}>{rolesData}</FormSelect>
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
                  {address !== "" && (
                    <>
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
                    </>
                  )}
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
