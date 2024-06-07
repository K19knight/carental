import React from 'react';
import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Cars from "./pages/Cars";
import FilterCars from "./components/FilterCars";


describe('Cars component', () => {
    let mockAxios;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
    });

    afterEach(() => {
        mockAxios.restore();
    });

    test('renders all cars fetched from API', async () => {
        // Przygotowanie danych testowych dla komponentu Cars
        const mockCars = [
            { id: 1, mark: { name: 'Toyota' }, model: 'Corolla', year: 2020, engine: 1.6, fuelType: 'Diesel', dayPrice: 100 },
            { id: 2, mark: { name: 'BMW' }, model: 'X5', year: 2019, engine: 3.0, fuelType: 'Petrol', dayPrice: 200 }
        ];

        mockAxios.onGet('/api/car').reply(200, mockCars);

        // Renderowanie komponentu Cars z komponentem FilterCars
        render(
            <div>
                <FilterCars
                    cars={mockCars}
                    onModelChange={() => {}}
                    onSortChange={() => {}}
                />
                <Cars />
            </div>
        );

        // Oczekiwanie na załadowanie danych
        await screen.findByText('Lista samochodów');

        // Sprawdzenie, czy wszystkie samochody są wyrenderowane
        expect(screen.getByText('Corolla')).toBeInTheDocument();
        expect(screen.getByText('X5')).toBeInTheDocument();
    });

    test('filters cars by model when model filter is selected', async () => {
        const mockCars = [
            { id: 1, mark: { name: 'Toyota' }, model: 'Corolla', year: 2020, engine: 1.6, fuelType: 'Diesel', dayPrice: 100 },
            { id: 2, mark: { name: 'BMW' }, model: 'X5', year: 2019, engine: 3.0, fuelType: 'Petrol', dayPrice: 200 }
        ];

        mockAxios.onGet('/api/car').reply(200, mockCars);

        const mockOnModelChange = jest.fn();
        const mockOnSortChange = jest.fn();
        render(
            <FilterCars
                cars={mockCars}
                onModelChange={mockOnModelChange}
                onSortChange={mockOnSortChange}
            />
        );

        await screen.findByText('Wybierz model:');
        const select = screen.getByRole('combobox', { name: /model/i });
        expect(select).toBeInTheDocument();

        userEvent.selectOptions(select, 'Corolla');
        await screen.findByText('Corolla');
        expect(screen.getByText('Corolla')).toBeInTheDocument();

        userEvent.selectOptions(select, 'X5');
        await screen.findByText('X5');
        expect(screen.getByText('X5')).toBeInTheDocument();
    });
});
