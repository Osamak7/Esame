import React, { useState } from "react";
import { Navbar, Nav, Container, Table, Alert } from "react-bootstrap";
import axios from "axios";
import mockData from "../src/mockData.json"; // Importa il JSON locale
import '../src/App.css'; // Assicurati che il CSS venga importato correttamente

function NavB() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (endpoint) => {
    try {
      setError(null);
      const response = await axios.get(`http://localhost:5004${endpoint}`);
      setData(response.data);
    } catch (err) {
      setError("Errore nella connessione al database . Questo e il database di Prova");
      setData(mockData[endpoint.replace("/", "")]); // Usa il JSON di test
    }
  };

  const getTableHeaders = (data) => (data && data.length > 0 ? Object.keys(data[0]) : []);
  
  const getPallinoColor = (value, type) => {
    if (type === "assenza") {
      return value > 5 ? "red" : "green"; // Pallino rosso se giorni di assenza > 5 altrimenti verde 
    }
    if (type === "progetto") {
      return value === "In corso" ? "green" : "red"; // Pallino verde se il progetto è in corso altrimenti rosso 
    }
    return "transparent"; // Nessun pallino per altri tipi
  };

  const toggleTable = () => {
    setData(null);
    setError(null);
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar fixed-top">
        <Container>
          <Navbar.Brand href="#" onClick={toggleTable} className="text-light fw-bold">
            MyApp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => fetchData("/assenza")} className="text-light">
                Assenza
              </Nav.Link>
              <Nav.Link onClick={() => fetchData("/progetto")} className="text-light">
                Progetto
              </Nav.Link>
              <Nav.Link onClick={() => fetchData("/wp")} className="text-light">
                WP
              </Nav.Link>
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
                {getTableHeaders(data).map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
                {(data === mockData.assenza || data === mockData.progetto) && <th>Pallino</th>} {/* Colonna pallino solo per assenza e progetto */}
              </tr>
            </thead>
            <tbody>
              {data.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(item).map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                  {(data === mockData.assenza || data === mockData.progetto) && (
                    <>
                      <td>
                        <div
                          style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            backgroundColor: getPallinoColor(item.Giorni || item.Stato, item.Giorni ? "assenza" : "progetto"),
                            margin: "0 auto", // Centra il pallino
                          }}
                        ></div>
                      </td>
                    </>
                  )}
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
