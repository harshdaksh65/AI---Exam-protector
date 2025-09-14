import React from 'react';
import PropTypes from 'prop-types';

const BlankCard = ({ children, className = '' }) => {
  return (
    <div
      className={`relative p-0 rounded-xl shadow-2xl bg-white dark:bg-gray-900 ${className}`}
      style={{ boxShadow: '0px 8px 24px rgba(0,0,0,0.12)' }}
    >
      {children}
    </div>
  );
};

BlankCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default BlankCard;
