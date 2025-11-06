// src/components/ui/Button.js

import styles from '../../styles/components.module.css';

/**
 * Simple, universal UI button element.
 */
export default function Button({ children, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}