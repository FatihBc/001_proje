import React from 'react';
import { useTheme } from '../context/useTheme.js';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const containerClass = `min-h-screen flex flex-col items-center justify-center px-6 py-12 ${isDark ? 'bg-[#121212] text-white' : 'bg-gray-100 text-gray-800'
        }`;

    const boxClass = `text-center max-w-md w-full p-6 rounded-lg shadow-md ${isDark ? 'bg-[#1e1e1e] border border-gray-700' : 'bg-white border border-gray-300'
        }`;

    const titleClass = 'text-3xl font-bold mb-4';
    const descClass = 'text-sm mb-6';
    const linkClass = `inline-block px-4 py-2 rounded text-sm font-medium ${isDark ? 'bg-[#094857] text-white hover:bg-[#0a3c4a]' : 'bg-[#094857] text-white hover:bg-[#073a45]'
        }`;

    return (
        <div className={containerClass}>
            <div className={boxClass}>
                <h1 className={titleClass}>404 - Page Not Found</h1>
                <p className={descClass}>
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className={linkClass}>
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}

export default NotFoundPage;
