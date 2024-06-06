import React, { useState, useEffect } from "react";
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

const RentFilterAndSort = ({ rents, onModelChange, onSortChange }) => {
    const [selectedModel, setSelectedModel] = useState("");
    const [uniqueModels, setUniqueModels] = useState([]);
    const [sortByEarliest, setSortByEarliest] = useState(true);

    useEffect(() => {

        const carModels = [...new Set(rents.map(rent => rent.car.model))];
        setUniqueModels(carModels);
    }, [rents]);

    const handleSortChange = () => {
        setSortByEarliest(!sortByEarliest);
        onSortChange(!sortByEarliest);
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
                {sortByEarliest ? "Sortuj od najwcześniejszych" : "Sortuj od najpóźniejszych"}
                {sortByEarliest ? <BsArrowDown className="sort-button-icon" /> : <BsArrowUp className="sort-button-icon" />}
            </button>
        </div>
    );
};

export default RentFilterAndSort;
