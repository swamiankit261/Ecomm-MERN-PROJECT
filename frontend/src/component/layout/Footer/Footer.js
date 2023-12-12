import React from 'react';
import playStore from "../../../images/Play_Store.png";
import appStore from "../../../images/app-store.png";
import "./Footer.css"

const footer = () => {
    return (
        <>
            <footer id='footer'>
                <div className='leftFooter'>
                    <h4>DOWNLOAD OUR APP</h4>
                    <p>Download app for Android and IOS mobile phone</p>
                    <img src={playStore} alt="playStore" />
                    <img src={appStore} alt="AppStore" />

                </div>
                <div className='midFooter'>
                    <h1>ECOMMERCE.</h1>
                    <p>High Quality is our frist prioryty</p>

                    <p>Copyrights 2023 &copy; meAk</p>

                </div>
                <div className='rightFooter'>
                    <h4>Fllow Us</h4>
                    <a href="http://instagram.com">Instagram</a>
                    <a href="http://youtube.com">Youtube</a>
                    <a href="http://facebook.com">Facebook</a>

                </div>
            </footer>
        </>
    )
}

export default footer