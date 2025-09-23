import { useCities } from '../../context/CitiesContext';
import CountryItem from '../CountryItem/CountryItem';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';
import styles from './CountryList.module.css';

export default function CountryList() {
    const { cities, isLoading } = useCities();

    if (isLoading) return <Spinner />;
    if (cities.length === 0)
        return (
            <Message message="Add your first city by clicking on a city on the map" />
        );

    const countries = cities.reduce((acc, city) => {
        if (!acc.map((el) => el.country).includes(city.country))
            return [...acc, { country: city.country, emoji: city.emoji }];

        return acc;
    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem country={country} key={country.country} />
            ))}
        </ul>
    );
}
