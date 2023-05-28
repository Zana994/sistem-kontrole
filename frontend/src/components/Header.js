import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <Link to='/'>
        <h1 className='title'>Sistem kontrole kvaliteta</h1>
      </Link>
    </div>
  )
}

export default Header;