// Uses the same styles as Product
import styles from './Pricing.module.css';
import PageNav from '../../components/PageNav/PageNav';

export default function Pricing() {
  return (
    <main className={styles.pricing}>
      <PageNav />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            One plan. Everything you need.
          </h2>
          <p>
            Itinera Pro — $9/month
            <br />
            Unlimited cities and countries, rich notes, and priority sync.
            Export your data anytime. Cancel whenever you like.
          </p>
        </div>
        <img
          src="img-pricing.png"
          alt="overview of a large city with skyscrapers"
        />
      </section>
    </main>
  );
}
