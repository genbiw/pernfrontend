import { useContext, useState } from "react"
import { Pencil, RejectSign, AcceptSign } from "../../utils/elements"
import "./SectionProperty.css"
import { updateUserAttribute } from "../../http/userAPI"
import { Context } from "../.."

const SectionProperty = ({ propertyName, propertyValue, type, id, name, placeholder, autoComplete, updateAccountUser}) => {

    const {user} = useContext(Context)

    const [value, setValue] = useState("")
    const [clicked, isClicked] = useState(false)

    const handleClick = () => {
        isClicked(!clicked)
        
    }

    const updateAttribute = () => {
        updateUserAttribute(user.user.email, "vova", name, value).then(data => updateAccountUser(data))
        isClicked(!clicked)
    }



    return (
        <div className="section-property" key={id}>
            <div>{propertyName}</div>
            <div className="input-underscore__block">
                {clicked &&
                    (
                        <>
                            <input className="input-underscore" type={type} id={id} name={name} placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} autoComplete={autoComplete} />
                            <div className="property-item__sign property-item__sign-reject" onClick={handleClick}><RejectSign /></div>
                            <div className="property-item__sign property-item__sign-accept" onClick={updateAttribute}><AcceptSign /></div>
                        </>
                    )

                }
                {propertyValue &&
                    <div className={`account_property-value ${clicked ? 'hide' : "show"}`}>{propertyValue}</div>
                }
                {!propertyValue &&
                    <div className={`account_property-value ${clicked ? 'hide' : "show"}`}>{placeholder}</div>
                }
                <div className={`property-item__sign property-item__sign-pencil ${clicked ? 'hide' : "show"}`} onClick={handleClick}><Pencil /></div>

            </div>
        </div>
    )
}

export default SectionProperty