'use client';
import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa6';
const options = {
  light: 'light',
  dark: 'dracula'
};
const ThemeToggle = () => {
  const [theme, setTheme] = useState(options.light);
  const toggleTheme = () => {
    const newTheme = theme === options.light ? options.dark : options.light;
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };
  return (
    <button className="btn btn-outline btn-sm" onClick={toggleTheme}>
      {theme === 'light' ? (
        <FaMoon className="h-4 w-4 " />
      ) : (
        <FaSun className="h-4 w-4 " />
      )}
    </button>
  );
};
export default ThemeToggle;
