import { useEffect, useState } from "react";
import "./App.css";
import Chatbot from "./component/Chatbot";
import FlightData from "./component/FlightData";
import { getAvailableFlights } from "./service/flightService";

function App() {
  const [flights, setFlights] = useState([]);

  const fetchFlights = async () => {
    try {
      const data = await getAvailableFlights();
      setFlights(data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-md-8">
          <FlightData flights={flights} />
        </div>
        <div className="col-md-4">
          <Chatbot fetchFlights={fetchFlights} />
        </div>
      </div>
    </div>
  );
}

export default App;
