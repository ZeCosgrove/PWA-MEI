import React, { useEffect, useState } from "react";

const BG_STYLE = {
  position: "fixed",
  top: "20px",
  bottom: "0",
  left: "0",
  right: "0",
  backgroundColor: "rgb(0,0,0, 0.7)",
  zIndex: "1000"
};

const MODAL_STYLE = {
  position: "fixed",
  top: "50%",
  right: "50%",
  transform: "translate(-50%,-50%)"
};

const UserEdit = ({ isOpen }) => {
  if (isOpen) {
    return (
      <>
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default UserEdit;
