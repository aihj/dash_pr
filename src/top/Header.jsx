import Navbar from './Navbar';

const Header = () => {
  return (
    <header>
      <div className="nav-area">
        <a  href="/" className="logo" >
          DataLab. Reporting Dashboard
        </a>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;