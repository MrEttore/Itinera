import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useReducer,
} from 'react';

const API_URL = 'http://localhost:9000';

const CitiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: '',
};

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return { ...state, isLoading: true };
        case 'cities/loaded':
            return { ...state, isLoading: false, cities: action.payload };
        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
            };
        case 'city/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };
        case 'city/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(
                    (city) => city.id !== action.payload,
                ),
                currentCity: {},
            };
        case 'rejected':
            return { ...state, isLoading: false, error: action.payload };
        default:
            throw new Error('Unknown action type' + action.type);
    }
}

export function CitiesProvider({ children }) {
    const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
        reducer,
        initialState,
    );

    useEffect(() => {
        const fetchCities = async () => {
            dispatch({ type: 'loading' });
            try {
                const response = await fetch(`${API_URL}/cities`);
                const data = await response.json();
                dispatch({ type: 'cities/loaded', payload: data });
            } catch (error) {
                dispatch({ type: 'rejected', payload: error.message });
            }
        };
        fetchCities();
    }, []);

    const getCity = useCallback(
        async (id) => {
            if (Number(id) === currentCity.id) return;
            dispatch({ type: 'loading' });
            try {
                const response = await fetch(`${API_URL}/cities/${id}`);
                const data = await response.json();
                dispatch({ type: 'city/loaded', payload: data });
            } catch (error) {
                dispatch({ type: 'rejected', payload: error.message });
            }
        },
        [currentCity.id],
    );

    const createCity = async (newCity) => {
        dispatch({ type: 'loading' });
        try {
            const response = await fetch(`${API_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            dispatch({ type: 'city/created', payload: data });
        } catch (error) {
            dispatch({ type: 'rejected', payload: error.message });
        }
    };

    const deleteCity = async (id) => {
        dispatch({ type: 'loading' });
        try {
            await fetch(`${API_URL}/cities/${id}`, {
                method: 'DELETE',
            });
            dispatch({ type: 'city/deleted', payload: id });
        } catch (error) {
            dispatch({ type: 'rejected', payload: error.message });
        }
    };

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
                createCity,
                deleteCity,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}

export function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error('useCities must be used within a CitiesProvider');
    return context;
}
