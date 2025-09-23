import PageNav from '../../components/PageNav/PageNav';
import styles from './Product.module.css';

export default function Product() {
    return (
        <main className={styles.product}>
            <PageNav />
            <section>
                <div className={styles.imageContainer}>
                    <img
                        src="img-product.png"
                        alt="person with dog overlooking mountain with sunset"
                    />
                </div>
                <div>
                    <h2>Itinera in a nutshell.</h2>
                    <p>
                        Itinera is a simple travel log that turns your memories
                        into a living map. Save cities as you go, add quick
                        notes, and let your timeline grow with every trip.
                    </p>
                    <p>
                        Under the hood, Itinera uses fast geolocation and an
                        intuitive map interface to keep everything organized:
                        countries, cities, and dates—always in one place.
                    </p>
                </div>
            </section>
        </main>
    );
}
