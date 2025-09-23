import { Link } from 'react-router-dom';

import PageNav from '../../components/PageNav/PageNav';
import styles from './Homepage.module.css';

export default function Homepage() {
    return (
        <main className={styles.homepage}>
            <PageNav />
            <section>
                <h1>
                    Meet Itinera.
                    <br />
                    The cleanest way to map your travels.
                </h1>
                <h2>
                    Pin cities, add notes, and see your journey unfold on a
                    beautiful world map. Itinera remembers where you’ve been,
                    when you were there, and what made it special—so you can
                    relive every step.
                </h2>
                <Link to="/login" className="cta">
                    Start tracking now
                </Link>
            </section>
        </main>
    );
}
