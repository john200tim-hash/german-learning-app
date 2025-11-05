// src/pages/index.js

import Link from 'next/link';
import styles from '../styles/Home.module.css';

/**
 * Homepage for the application.
 */
export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Learn German, <span style={{ color: '#4299E1' }}>One Step at a Time.</span>
      </h1>
      <p className={styles.subtitle}>
        Master German grammar, vocabulary, and pronunciation with interactive lessons and quizzes designed for every level.
      </p>

      <div className={styles.cardGrid}>
        <div className={styles.moduleCard}>
          <h2>Vocabulary Topics</h2>
          <ul className={styles.topicList}>
            <li><Link href="/vocabulary?tab=prefixes" className={styles.topicLink}>Separable Prefixes</Link></li>
            <li><Link href="/vocabulary?tab=time-adverbs" className={styles.topicLink}>Time Adverbs</Link></li>
            <li><Link href="/vocabulary?tab=da-compounds" className={styles.topicLink}>Da-Compounds</Link></li>
            <li><Link href="/vocabulary?tab=wo-compounds" className={styles.topicLink}>Wo-Compounds</Link></li>
            <li><Link href="/vocabulary?tab=home-people" className={styles.topicLink}>Home & People</Link></li>
            <li><Link href="/vocabulary?tab=places-travel" className={styles.topicLink}>Places & Travel</Link></li>
            <li><Link href="/vocabulary?tab=health-sport" className={styles.topicLink}>Health & Sport</Link></li>
            <li><Link href="/vocabulary?tab=leisure-media" className={styles.topicLink}>Leisure & Media</Link></li>
            <li><Link href="/vocabulary?tab=education-work" className={styles.topicLink}>Education & Work</Link></li>
          </ul>
        </div>

        <div className={styles.moduleCard}>
          <h2>Grammar Topics</h2>
          <ul className={styles.topicList}>
            <li><Link href="/grammar?tab=indefinite-words" className={styles.topicLink}>Indefinite Words</Link></li>
            <li><Link href="/grammar?tab=pronouns" className={styles.topicLink}>Pronoun Declensions</Link></li>
            <li><Link href="/grammar?tab=passive-substitutes" className={styles.topicLink}>Passive Substitutes</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}