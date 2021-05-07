import './index.css';
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';

// get the images
import logo from '../../assets/images/logo.png';
import msg from '../../assets/images/message.svg';
import profileBlue from '../../assets/images/profile-blue.svg';
import profileWhite from '../../assets/images/profile-white.svg';

// utils
import { formatAddress } from '../../utils';

const Header = () => {
 
  // we use Vitalik's address as the placeholder :)
  const [walletAddress] = useState("0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B");
  const [toggleIcon, setToggleIcon] = useState(false);

  return (
    <Row className="header">
      <Col>
        <img src={ logo } alt="logo" width="170" height="32"/>
      </Col>
      <Col>
        <img src={ msg } alt="notification" width="20" height="20"/>
        <button className='header-btn'> { formatAddress(walletAddress) } </button >
        <button 
          className='header-btn' 
          onMouseEnter={() => setToggleIcon(true)}
          onMouseLeave={() => setToggleIcon(false)}>
            <img src={ toggleIcon ? profileWhite : profileBlue } alt="profile-icon" width="13" height="13"/>
            dashboard
        </button>
      </Col>
    </Row>
  );
}

export default Header;