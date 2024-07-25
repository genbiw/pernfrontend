import "./Footer.css"
import tgIcon from "../../assets/tg-icon.png"
import waIcon from "../../assets/wa-icon.png" 
import instaIcon from "../../assets/insta-icon.png"
import ytIcon from "../../assets/yt-icon.png"
import fbIcon from "../../assets/fb-icon.png"
import vkIcon from "../../assets/vk-icon.png"

const Footer = () => {

    const subscribeToNews = async() => {
        await window.pe.track("newslettersubscriptionretail")
    }

    return ( 
        <div className="footer container">
            <div className="subscribe-block">
                <div className="subscribe-block__title">Stay up to date</div>
                <div>
                    <div className="subscribe-block__context">Subscribe to the latest updates and be the first to know about new products and special offers</div>
                    <input className="subscribe-block__input" type="text" name="email" placeholder="Email"/>
                    <div className="button subscribe-block__button" onClick={subscribeToNews}>Subscribe</div>
                </div>
            </div>
            <div className="social-block">
                <div className="social-block__title">Social Networks</div>
                <div className="social-block__links">
                    <div className="social-block__link"><img alt="telegram-icon-img" src={tgIcon}/></div>
                    <div className="social-block__link"><img alt="whatsapp-icon-img" src={waIcon}/></div>
                    <div className="social-block__link"><img alt="insta-icon-img" src={instaIcon}/></div>
                    <div className="social-block__link"><img alt="youtube-icon-img" src={ytIcon}/></div>
                    <div className="social-block__link"><img alt="facebook-icon-img" src={fbIcon}/></div>
                    <div className="social-block__link"><img alt="vkontakte-icon-img" src={vkIcon}/></div>
                </div>
            </div>
        </div>
     );
}
 
export default Footer; 