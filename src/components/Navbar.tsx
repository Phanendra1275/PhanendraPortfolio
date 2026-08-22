import './Navbar.css';

interface NavbarProps {
  onOpenContact: () => void;
}

const Navbar = ({ onOpenContact }: NavbarProps) => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <a href="#home" className="nav-item">Home</a>
        <a href="#profile" className="nav-item active">Profile</a>
        <button onClick={onOpenContact} className="nav-item" style={{background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', color: 'inherit'}}>Contact</button>
      </div>
    </nav>
  );
};

export default Navbar;
