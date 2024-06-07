import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from '../config/axiosConfig';
import Car from "../components/Car";
import {useAuth} from "../auth/AuthContext";

const RentCar = () => {
    const {carId} = useParams();
    const {isLoggedIn, authRes} = useAuth();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rentData, setRentData] = useState({
        customerId: 0,
        carId: parseInt(carId),
        term: 1,
        rentDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        price: 0
    });
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await axios.get(`/api/car/${carId}`);
                setCar(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCar();
    }, [carId]);

    useEffect(() => {
        if (car) {
            const price = car.dayPrice * rentData.term;
            setPrice(price);
            setRentData(prevRentData => ({...prevRentData, price: price}));
        }
    }, [car, rentData.term]);

    const handleRentSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(authRes.user.id);
            const updatedRentData = { ...rentData, customerId: authRes.user.id };
            console.log(updatedRentData);
            const response = await axios.post('/api/rent', updatedRentData);
            console.log("Car rented successfully:", response.data);
            window.location.href = '/cars'
        } catch (error) {
            console.error("Error renting car:", error);
        }
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setRentData({...rentData, [name]: value});
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!car) return <p>Car not found</p>;

    return (
        <div className="car-details">
            <Car car={car} hideRentButton={true} hideDeleteButton={true}/>
            <div className="car-rent-details">
                {isLoggedIn && (
                    <form onSubmit={handleRentSubmit} className="rent-form">
                        <div className="form-group">
                            <div className="price-display">
                                <label htmlFor="price">Cena:</label>
                                <span> {price} PLN</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="term">Okres wynajmu (w dniach):</label>
                            <input
                                type="number"
                                className="form-control"
                                id="term"
                                name="term"
                                value={rentData.term}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rentDate">Data wynajmu:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="rentDate"
                                name="rentDate"
                                value={rentData.rentDate}
                                onChange={handleInputChange}
                                min={new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Zarezerwuj</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default RentCar;
