import { Link } from 'react-router-dom';
import { styled } from '@mui/material';
// Logo image is now served from public folder

const LinkStyled = styled(Link)(() => ({
  height: '100px',
  width: '260px',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
  textDecoration: 'none',
}));


const Logo = () => {
  return (
    <LinkStyled to="/">
  <img src="/dark-logo.svg" alt="Exam Shield Logo" height={100} />
    </LinkStyled>
  );
}

export default Logo;
