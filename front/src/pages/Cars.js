import React, { useState, useEffect } from "react";
import axios from '../config/axiosConfig';
import Car from "../components/Car";


const CarsList = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/car");
            setCars(response.data);
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    return (
        <div>
            <div className="page-title">
                <h1>Lista samochodów</h1>
            </div>
            {cars.map((car) => (
                <Car key={car.id} car={car} />
            ))}
        </div>
    );
};

export default CarsList;
