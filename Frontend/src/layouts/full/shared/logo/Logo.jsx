import LogoDark from '/src/assets/images/logos/dark-logo.svg';

const Logo = () => (
  <a href="/" className="block h-[70px] w-[180px] overflow-hidden">
    <img src={LogoDark} alt="Logo" className="h-full w-full object-contain" />
  </a>
);

export default Logo;
