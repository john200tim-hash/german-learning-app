// src/components/layouts/Sidebar.js

import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Layout.module.css';

const navItems = [
    { href: '/', label: 'Home' },
    { href: '/vocabulary', label: 'Vocabulary' },
    { href: '/grammar', label: 'Grammar' },
    { href: '/practice', label: 'Practice' },
];

export default function Sidebar() {
    const router = useRouter();

    return (
        <nav className={styles.sidebarContainer}>
            <h2 className={styles.sidebarTitle}>Learn German</h2>
            {navItems.map(({ href, label }) => (
                // The Link component was corrupted. This restores the correct structure.
                <Link href={href} key={label} className={`${styles.tabBtn} ${router.pathname.startsWith(href) && href !== '/' || router.pathname === href ? styles.active : ''}`}>
                    <span>{label}</span>
                </Link>
            ))}
        </nav>
    );
}