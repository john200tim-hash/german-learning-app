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

export default function Sidebar({ isOpen }) {
    const router = useRouter();

    return (
        <nav className={`${styles.sidebarContainer} ${isOpen ? styles.sidebarOpen : ''}`}>
            <h2 className={styles.sidebarTitle}>Learn German</h2>
            {navItems.map(({ href, label }) => (
                <Link href={href} key={label} className={`${styles.tabBtn} ${router.pathname.startsWith(href) && href !== '/' || router.pathname === href ? styles.active : ''}`}>
                    <span>{label}</span>
                </Link>
            ))}
        </nav>
    );
}