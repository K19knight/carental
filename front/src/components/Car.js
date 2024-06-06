import React, { useEffect, useState } from "react";
import axios from '../config/axiosConfig';
import { useAuth } from "../auth/AuthContext";
import RentButton from "./RentButton";

const Car = ({ car, hideRentButton, hideDeleteButton, hidePrice, carRent }) => {
    const { isLoggedIn, userEmail } = useAuth();
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const getImageSource = async (modelName) => {
            const imageUrl = `/model_images/${modelName.replaceAll(" ", "_")}.jpg`;
            try {
                await new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        setImageSrc(imageUrl);
                        resolve();
                    };
                    img.onerror = () => {
                        setImageSrc('/model_images/noImage.jpg');
                        resolve();
                    };
                    img.src = imageUrl;
                });
            } catch (error) {
                console.error("Error loading image:", error);
            }
        };

        getImageSource(car.model.replaceAll(" ", "_"));
    }, [car.model]);

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
            <div className="car-info">
                <h2>{car.mark.name} {car.model}</h2>
                <p><strong>Rok produkcji:</strong> {car.year}</p>
                <p><strong>Pojemność silnika:</strong> {car.engine.toFixed(1)}l</p>
                <p><strong>Typ paliwa:</strong> {car.fuelType}</p>
                {!hidePrice && <p><strong>Cena za dzień: {car.dayPrice} PLN</strong></p>}
                {isLoggedIn && userEmail && String(userEmail).startsWith("admin") && !hideDeleteButton && (
                    <div>
                        <button className="btn btn-danger" onClick={handleDelete}>Usuń</button>
                    </div>
                )}
                <div style={{ marginTop: '10px' }}>
                    {isLoggedIn && !hideRentButton && <RentButton carId={car.id} />}
                </div>
                {carRent && (
                    <div className="rent-info">
                        <p><strong>Cena: {carRent.price} PLN </strong></p>
                        <p><strong>Okres wynajmu (w dniach):</strong> {carRent.term} dni</p>
                        <p><strong>Data rozpoczęcia wynajmu:</strong> {new Date(carRent.rentDate).toLocaleDateString()}</p>
                        <p><strong>Data zakończenia wynajmu:</strong> {new Date(new Date(carRent.rentDate).getTime() + carRent.term * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                    </div>
                )}
            </div>
            <div className="car-image">
                {imageSrc && <img src={imageSrc} alt={car.model} />}
            </div>
        </div>
    );
};

export default Car;
