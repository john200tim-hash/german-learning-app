// src/components/layouts/SearchBar.js

import React from 'react';
import styles from '../../styles/Layout.module.css';

export default function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <div className={styles.searchBarContainer}>
            <input
                type="text"
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
            />
        </div>
    );
}