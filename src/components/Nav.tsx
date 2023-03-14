import React from 'react';
import Logo from '../assets/images/logo.svg'
import Search from '../assets/images/search.svg'
import Store from '../assets/images/store.svg'

function Nav(): JSX.Element {
    return (<nav className='nav-wrapper'>
        <div className='nav-content'>
            <ul className='list-styled'>
                <li>
                    <img src={Logo} alt={'Apple Logo'}/>
                </li>

                <li>
                    <a className={'link-styled'}>Ipad</a>
                </li>
                <li>
                    <a className={'link-styled'}>Iphone</a>
                </li>
                <li>
                    <a className={'link-styled'}>Airpods</a>
                </li>
                <li>
                    <a className={'link-styled'}>Accessories</a></li>
                <li>
                    <a className={'link-styled'}>Suport</a>
                </li>
                <li>
                    <a className={'link-styled'}>Store</a>
                </li>
                <li>
                    <img src={Search} alt={"Search"}/>
                </li>
                <li>
                    <img src={Store} alt={"Store"}/>
                </li>

            </ul>
        </div>
    </nav>)

}

export default Nav;