import React, { useEffect, useState } from "react";

const Pagination = () => (
  <nav aria-label="Page navigation d-flex justify-content-center">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#">
          Anterior
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">
          1
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">
          2
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">
          3
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">
          Próximo
        </a>
      </li>
    </ul>
  </nav>
);

export default Pagination;
