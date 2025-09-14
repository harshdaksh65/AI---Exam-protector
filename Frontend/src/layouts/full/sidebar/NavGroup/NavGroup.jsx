import PropTypes from 'prop-types';

const NavGroup = ({ item }) => {
  return (
    <div className="uppercase font-bold mt-6 mb-0 text-gray-900 dark:text-gray-100 leading-6 px-3 py-1 text-xs tracking-widest">
      {item.subheader}
    </div>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;
