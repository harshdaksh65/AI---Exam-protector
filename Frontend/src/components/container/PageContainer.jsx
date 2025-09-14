import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const PageContainer = ({
  title,
  description,
  children,
  className = '',
  fadeIn = true,
}) => {
  return (
    <div className={`w-full max-w-4xl mx-auto my-8 p-6 rounded-xl shadow-lg bg-white dark:bg-gray-900 transition-all duration-500
      ${fadeIn ? 'animate-fade-in' : ''} ${className}`}
      style={{ animation: fadeIn ? 'fadeIn 0.7s ease' : undefined }}
    >
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {title && (
        <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">{title}</h1>
      )}
      {description && (
        <p className="mb-4 text-gray-600 dark:text-gray-300">{description}</p>
      )}
      {children}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

PageContainer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  fadeIn: PropTypes.bool,
};

export default PageContainer;