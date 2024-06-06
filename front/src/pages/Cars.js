import React, {useState, useEffect} from "react";
import axios from '../config/axiosConfig';
import Car from "../components/Car";
import FilterCars from "../components/FilterCars";

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredCars, setFilteredCars] = useState([]);
    const [sortByCheapest, setSortByCheapest] = useState(true);
    const [selectedModel, setSelectedModel] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [carsPerPage] = useState(3);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/car");
            setCars(response.data);
            setFilteredCars(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching cars:", error);
            setLoading(false);
        }
    };

    const handleModelChange = (selectedModel) => {
        setSelectedModel(selectedModel);
        filterAndSortCars(selectedModel, sortByCheapest);
    };

    const handleSortChange = (sortByCheapest) => {
        setSortByCheapest(sortByCheapest);
        filterAndSortCars(selectedModel, sortByCheapest);
    };

    const filterAndSortCars = (selectedModel, sortByCheapest) => {
        let filteredCars = cars;
        if (selectedModel) {
            filteredCars = cars.filter(car => car.model.toLowerCase() === selectedModel.toLowerCase());
        }

        filteredCars.sort((a, b) => {
            return sortByCheapest ? a.dayPrice - b.dayPrice : b.dayPrice - a.dayPrice;
        });

        setFilteredCars([...filteredCars]);
    };

    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="page-title">
                <h1>Lista samochodów</h1>
            </div>

            <FilterCars
                cars={cars}
                onModelChange={handleModelChange}
                onSortChange={handleSortChange}
            />

            <div className="pagination-container top">
                <ul className="pagination">
                    {Array(Math.ceil(filteredCars.length / carsPerPage)).fill().map((_, i) => (
                        <li key={i} className="page-item">
                            <button onClick={() => paginate(i + 1)} className="page-link">{i + 1}</button>
                        </li>
                    ))}
                </ul>
            </div>

            {loading ? (
                <div className="page-title">Ładowanie pojazdów...</div>
            ) : (
                <div>
                    {currentCars.map((car) => (
                        <Car key={car.id} car={car} />
                    ))}
                </div>
            )}

            <div className="pagination-container bottom">
                <ul className="pagination">
                    {Array(Math.ceil(filteredCars.length / carsPerPage)).fill().map((_, i) => (
                        <li key={i} className="page-item">
                            <button onClick={() => paginate(i + 1)} className="page-link">{i + 1}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Cars;
