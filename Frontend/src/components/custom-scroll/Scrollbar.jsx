import PropTypes from 'prop-types';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const Scrollbar = ({
  children,
  className = '',
  label,
  helperText,
  ...other
}) => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  return (
    <div className={`w-full mb-4 ${className}`}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      {isMobile ? (
        <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-900 transition-all duration-500" {...other}>
          {children}
        </div>
      ) : (
        <SimpleBar
          style={{ maxHeight: '100%' }}
          className="simplebar-custom rounded-lg shadow bg-white dark:bg-gray-900 transition-all duration-500"
          {...other}
        >
          {children}
        </SimpleBar>
      )}
      {helperText && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
};

Scrollbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
};

export default Scrollbar;
