import "./PaymentSuccess.css"
import supportImage from "../../assets/supportv2.png"

const PaymentSuccess = () => {
    return (

        <div className="container payment_container">
            <img className="supportImage" src={supportImage} alt="supportImg"></img>
            <div>
                <h1>Thanks for your order!</h1>
                <div>
                    <div className="payment_desc">We appreciate your business!</div>
                    <div className="payment_desc">If you have any questions, please email</div>
                    <a href="mailto:vladimir.ni@infobip.com.com">vladimir.ni@infobip.com</a>.
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess;