import React, { useState } from "react";
import { Navbar, Nav, Container, Table, Alert } from "react-bootstrap";
import axios from "axios";
import mockData from "../src/mockData.json";
import '../src/App.css';

function NavB() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [mock, setMock] = useState(mockData);

  const fetchData = async (endpoint) => {
    try {
      setError(null);
      const response = await axios.get(`http://localhost:5004${endpoint}`);
      setData(response.data);
    } catch (err) {
      setError("Errore nella connessione al database. Questo è il database di prova.");
      setData(mock[endpoint.replace("/", "")]);
    }
  };

  const getTableHeaders = (data) => (data && data.length > 0 ? Object.keys(data[0]).filter(header => header !== "Id") : []);

  const getStatusColor = (stato) => {
    switch (stato) {
      case "In attesa":
        return <span style={{ color: "red", fontSize: "20px" }}>●</span>;
      case "In corso":
        return <span style={{ color: "orange", fontSize: "20px" }}>●</span>;
      case "Completato":
        return <span style={{ color: "green", fontSize: "20px" }}>●</span>;
      default:
        return null;
    }
  };

  const getAssenzaStatus = (giorni) => {
    return giorni > 5 
      ? <span style={{ color: "red", fontSize: "20px" }}>●</span> 
      : <span style={{ color: "green", fontSize: "20px" }}>●</span>;
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar fixed-top">
        <Container>
          <Navbar.Brand href="#" className="text-light fw-bold">
            MyApp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => fetchData("/assenza")} className="text-light">Assenza</Nav.Link>
              <Nav.Link onClick={() => fetchData("/progetto")} className="text-light">Progetto</Nav.Link>
              <Nav.Link onClick={() => fetchData("/wp")} className="text-light">WP</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="table-container">
        {error && <Alert variant="warning">{error}</Alert>}
        {data && (
          <Table striped bordered hover className="custom-table">
            <thead>
              <tr>
                <th>Id</th>
                {getTableHeaders(data).map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
                {data === mock.assenza && <th>Stato</th>}
                {data === mock.progetto && <th>Avanzamento</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{item.Id}</td>
                  {Object.entries(item).map(([key, value], colIndex) => (
                    key !== "Id" && <td key={colIndex}>{value}</td>
                  ))}
                  {data === mock.assenza && <td>{getAssenzaStatus(item.Giorni)}</td>}
                  {data === mock.progetto && <td>{getStatusColor(item.Stato)}</td>}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
}

export default NavB;
