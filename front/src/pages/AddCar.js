import React, {useState, useEffect} from 'react';
import axios from '../config/axiosConfig';

const AddCar = () => {
    const [marks, setMarks] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        mark: '',
        model: '',
        year: '',
        engine: '',
        fuelType: '',
        dayPrice: ''
    });

    useEffect(() => {
        fetchMarks();
    }, []);

    const fetchMarks = async () => {
        try {
            const response = await axios.get('/api/mark');
            setMarks(response.data);
        } catch (error) {
            console.error('Error fetching marks:', error);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/car', formData);
            console.log('Car created:', response.data);
            setFormData({
                mark: '',
                model: '',
                year: '',
                engine: '',
                fuelType: '',
                dayPrice: ''
            }); // Wyczyść formularz po dodaniu samochodu
            setSuccessMessage('Dodano nowy samochód!'); // Ustaw powiadomienie o sukcesie
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setError('Format danych jest nieprawidłowy!!!');
            }
        }
    };

    return (
        <div className="form-container">
            <div className="login-form">
                {error && <div className="text-danger">{error}</div>}
                {successMessage && <div className="text-success">{successMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="mark">Marka:</label>
                        <select id="mark" name="mark" className="form-control" value={formData.mark}
                                onChange={handleChange}
                                required>
                            <option value="">Wybierz markę</option>
                            {marks.map(mark => (
                                <option key={mark.id} value={mark.name}>{mark.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="model">Model:</label>
                        <input id="model" type="text" name="model" className="form-control" value={formData.model}
                               onChange={handleChange} placeholder="Np. A4" required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="year">Rok produkcji:</label>
                        <input id="year" type="number" name="year" className="form-control" value={formData.year}
                               onChange={handleChange} placeholder="Np. 2024" required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="engine">Pojemność silnika:</label>
                        <input id="engine" type="number" name="engine" className="form-control" value={formData.engine}
                               onChange={handleChange} placeholder="Np. 2.0" required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="fuelType">Typ paliwa:</label>
                        <input id="fuelType" type="text" name="fuelType" className="form-control"
                               value={formData.fuelType}
                               onChange={handleChange} placeholder="Np. benzyna" required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dayPrice">Cena za dzień (PLN):</label>
                        <input id="dayPrice" type="number" name="dayPrice" className="form-control"
                               value={formData.dayPrice} onChange={handleChange} placeholder="Np. 250" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Dodaj samochód
                    </button>
                </form>
            </div>
        </div>

    );
};

export default AddCar;