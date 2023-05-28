import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <Link className='home-link' to='/proizvodi'>
            <div>Evidencija proizvoda</div>
        </Link>
          <Link className='home-link' to='/inspekcijska-tijela'>
            <div>Evidencija inspekcijskih tijela</div>
          </Link>
          <Link className='home-link' to='/inspekcijska-kontrola'>
            <div>Evidencija inspekcijskih kontrola</div>
          </Link>
      </div>
    </div>
  )
}

export default Home;