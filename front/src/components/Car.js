import React, { useEffect } from "react";
import axios from '../config/axiosConfig';
import {useAuth} from "../auth/AuthContext";

const Car = ({car}) => {
    const { isLoggedIn, userEmail } = useAuth();

    useEffect(() => {
        const reloadPage = () => {
            window.location.reload();
        };

        window.addEventListener("unload", reloadPage); // Dodaj nasłuchiwanie na wylogowanie
        return () => {
            window.removeEventListener("unload", reloadPage); // Usuń nasłuchiwanie po odmontowaniu komponentu
        };
    }, []);
        const handleDelete = async () => {
            try {
                await axios.delete(`/api/car/${car.id}`);
                window.location.reload();
            } catch (error) {
                console.error("Error deleting car:", error);
            }
        };

        return (
            <div className="car-container">
                <h2>{car.mark.name} {car.model}</h2>
                <p><strong>Rok produkcji:</strong> {car.year}</p>
                <p><strong>Pojemność silnika:</strong> {car.engine.toFixed(1)}l</p>
                <p><strong>Typ paliwa:</strong> {car.fuelType}</p>
                <p><strong>Cena za dzień: {car.dayPrice} PLN</strong></p>
                {isLoggedIn && userEmail && String(userEmail).startsWith("admin") && (
                    <button className="btn btn-danger" onClick={handleDelete}>Usuń</button>
                )}
            </div>
        );


    }
export default Car;