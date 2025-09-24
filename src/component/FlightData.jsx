import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const FlightData = ({ flights }) => {
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Available Flights</h2>
      <div className="row">
        {flights.map((flight) => (
          <div className="col-md-4 mb-3" key={flight.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">
                  Flight {flight.flightNumber} → {flight.destination}
                </h5>
                <p className="card-text">
                  <strong>Departure:</strong>{" "}
                  {new Date(flight.departureTime).toLocaleString()} <br />
                  <strong>Arrival:</strong>{" "}
                  {new Date(flight.arrivalTime).toLocaleString()} <br />
                  <strong>Price:</strong> {flight.price} SEK
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightData;
