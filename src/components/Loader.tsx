import React from "react";
import { Spinner } from "react-bootstrap";

const Loader: React.FC = () => {
  return <Spinner animation="border" role="status" />;
};

export default Loader;
