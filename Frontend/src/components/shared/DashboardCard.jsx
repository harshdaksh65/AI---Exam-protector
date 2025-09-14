import React from 'react';

const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
  className = '',
}) => {
  return (
    <div
      className={`relative p-0 rounded-xl shadow-2xl bg-white dark:bg-gray-900 ${className}`}
      style={{ boxShadow: '0px 8px 24px rgba(0,0,0,0.12)' }}
    >
      {cardheading ? (
        <div className="px-6 py-4">
          <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">{headtitle}</h5>
          <p className="text-sm text-gray-500 dark:text-gray-400">{headsubtitle}</p>
        </div>
      ) : (
        <div className="px-8 py-6">
          {title ? (
            <div className="flex flex-row justify-between items-center mb-3 gap-2">
              <div>
                {title ? <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h5> : null}
                {subtitle ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
                ) : null}
              </div>
              {action}
            </div>
          ) : null}
          {children}
        </div>
      )}
      {middlecontent}
      {footer}
    </div>
  );
};

export default DashboardCard;
