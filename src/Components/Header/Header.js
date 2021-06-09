import React, {useState} from 'react';
import './Header.css';
import Avatar from '@material-ui/core/Avatar';

function Header () {

    return (
        <div className='header'>
          <div className="header__left">
            <div to='/' style={{ textDecoration: 'none' }}>
              <div className="header__logo">CASH REGISTER</div>
            </div>
          </div>

          <div className="header__right">
            <Avatar
                alt='Nouman Ahmed'
                stc='https://avatars1.githubusercontent.com/u/35970677?s=60&v=4'
            />
          </div>
          
        </div>
    )
}

export default Header;