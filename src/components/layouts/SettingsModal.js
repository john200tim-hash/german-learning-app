                        </div>
                    </div>

                    {/* Theme Selection */}
                    <div className={styles.settingRow}>
                        <label id="theme-label">Theme</label>
                        <div role="group" aria-labelledby="theme-label" className={styles.segmentedControl}>
                            <button
                                onClick={() => handleThemeChange('light')}
                                className={theme === 'light' ? styles.activeSegment : ''}
                            >Light</button>
                            <button
                                onClick={() => handleThemeChange('dark')}
                                className={theme === 'dark' ? styles.activeSegment : ''}
                            >Dark</button>
                            <button
                                onClick={() => handleThemeChange('high-contrast')}
                                className={theme === 'high-contrast' ? styles.activeSegment : ''}
                            >Contrast</button>
                        </div>
                    </div>
