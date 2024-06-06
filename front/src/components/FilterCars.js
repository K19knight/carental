import React, { useState, useEffect } from "react";
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

const FilterCars = ({ cars, onModelChange, onSortChange }) => {
    const [selectedModel, setSelectedModel] = useState("");
    const [uniqueModels, setUniqueModels] = useState([]);
    const [sortByPrice, setSortByPrice] = useState(true);

    useEffect(() => {
        const carModels = [...new Set(cars.map(car => car.model))];
        setUniqueModels(carModels);
    }, [cars]);

    const handleSortChange = () => {
        setSortByPrice(!sortByPrice);
        onSortChange(!sortByPrice);
    };

    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
        onModelChange(event.target.value);
    };

    return (
        <div className="filters">
            <label htmlFor="model" className="filter-label">Wybierz model:</label>
            <select id="model" value={selectedModel} onChange={handleModelChange} className="filter-select">
                <option value="">Wszystkie modele</option>
                {uniqueModels.map((model, index) => (
                    <option key={index} value={model}>{model}</option>
                ))}
            </select>

            <button onClick={handleSortChange} className="sort-button">
                {sortByPrice ? "Sortuj od najdroższych" : "Sortuj od najtańszych"}
                {sortByPrice ? <BsArrowDown className="sort-button-icon" /> : <BsArrowUp className="sort-button-icon" />}
            </button>
        </div>
    );
};

export default FilterCars;

