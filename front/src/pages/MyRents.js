import React, { useEffect, useState } from "react";
import axios from '../config/axiosConfig';
import { useAuth } from "../auth/AuthContext";
import RentFilterAndSort from "../components/RentFilterAndSort";
import Car from "../components/Car";

const MyRents = () => {
    const { authRes } = useAuth();
    const [rents, setRents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedModel, setSelectedModel] = useState("");
    const [sortByEarliest, setSortByEarliest] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [rentsPerPage] = useState(3);

    useEffect(() => {
        const fetchMyRents = async () => {
            try {
                const response = await axios.get(`/api/rent/${authRes.user.id}`);
                setRents(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMyRents();
    }, [authRes]);

    const handleSortChange = (sortByEarliest) => {
        setSortByEarliest(sortByEarliest);
    };

    const handleModelChange = (selectedModel) => {
        setSelectedModel(selectedModel);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const filteredRents = rents.filter(rent => selectedModel ? rent.car.model.toLowerCase() === selectedModel.toLowerCase() : true);

    const sortedRents = sortByEarliest ? filteredRents.sort((a, b) => a.id - b.id) : filteredRents.sort((a, b) => b.id - a.id);

    const indexOfLastRent = currentPage * rentsPerPage;
    const indexOfFirstRent = indexOfLastRent - rentsPerPage;
    const currentRents = sortedRents.slice(indexOfFirstRent, indexOfLastRent);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="page-title">
                <h1>Lista wynajętych samochodów</h1>
            </div>

            <RentFilterAndSort
                rents={rents}
                onModelChange={handleModelChange}
                onSortChange={handleSortChange}
            />

            <div className="pagination-container top">
                <ul className="pagination">
                    {Array(Math.ceil(sortedRents.length / rentsPerPage)).fill().map((_, i) => (
                        <li key={i} className="page-item">
                            <button onClick={() => paginate(i + 1)} className="page-link">{i + 1}</button>
                        </li>
                    ))}
                </ul>
            </div>

            {currentRents.map((rent) => (
                <div key={rent.id} className="car-info">
                    <Car car={rent.car} carRent={rent} hideRentButton={true} hidePrice={true} />
                </div>
            ))}

            <div className="pagination-container bottom">
                <ul className="pagination">
                    {Array(Math.ceil(sortedRents.length / rentsPerPage)).fill().map((_, i) => (
                        <li key={i} className="page-item">
                            <button onClick={() => paginate(i + 1)} className="page-link">{i + 1}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MyRents;
