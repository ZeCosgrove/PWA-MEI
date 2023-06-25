import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "shards-react";

const Errors = () => {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate("/");
  }

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <div className="error">
        <div className="error__content">
          <h2>404</h2>
          <h3>Page not found</h3>
          <p>
            A página a que está a tentar aceder não existe ou outro erro
            ocorreu.
          </p>
          <Button pill onClick={handleGoBack}>
            &larr; Voltar
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Errors;
