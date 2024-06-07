import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Cars from "../../src/pages/Cars";


describe('Cars component', () => {
    let mockAxios;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
    });

    afterEach(() => {
        mockAxios.restore();
    });

    it('renders all cars fetched from API', async () => {
        // Przygotowanie danych testowych
        const mockCars = [
            { id: 1, mark: { name: 'Toyota' }, model: 'Corolla', year: 2020, engine: 1.6, fuelType: 'Diesel', dayPrice: 100 },
            { id: 2, mark: { name: 'BMW' }, model: 'X5', year: 2019, engine: 3.0, fuelType: 'Petrol', dayPrice: 200 }
        ];

        mockAxios.onGet('/api/car').reply(200, mockCars);

        // Renderowanie komponentu
        render(<Cars />);

        // Oczekiwanie na załadowanie danych
        await screen.findByText('Lista samochodów');

        // Sprawdzenie, czy wszystkie samochody są wyrenderowane
        expect(screen.getByText('Corolla')).toBeInTheDocument();
        expect(screen.getByText('Toyota')).toBeInTheDocument();
        expect(screen.getByText('X5')).toBeInTheDocument();
        expect(screen.getByText('BMW')).toBeInTheDocument();
    });

    it('filters cars by model when model filter is selected', async () => {
        // Przygotowanie danych testowych
        const mockCars = [
            { id: 1, mark: { name: 'Toyota' }, model: 'Corolla', year: 2020, engine: 1.6, fuelType: 'Diesel', dayPrice: 100 },
            { id: 2, mark: { name: 'BMW' }, model: 'X5', year: 2019, engine: 3.0, fuelType: 'Petrol', dayPrice: 200 }
        ];

        mockAxios.onGet('/api/car').reply(200, mockCars);

        // Renderowanie komponentu
        render(<Cars />);

        // Oczekiwanie na załadowanie danych
        await screen.findByText('Lista samochodów');

        // Wybieranie modelu Toyoty
        userEvent.selectOptions(screen.getByRole('combobox', { name: /model/i }), ['Corolla']);

        // Oczekiwanie na zastosowanie filtru
        await screen.findByText('Corolla');

        // Sprawdzenie, czy tylko samochody o modelu Corolla są wyrenderowane
        expect(screen.getByText('Corolla')).toBeInTheDocument();
        expect(screen.queryByText('X5')).not.toBeInTheDocument();
    });
});
