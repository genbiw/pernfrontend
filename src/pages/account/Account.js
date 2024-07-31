import "./Account.css"
import { UserIcon, Order, Favorite, Review, Phone, Email, Password } from "../../utils/elements"
import { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import SectionProperty from "../../components/account/SectionProperty"
import { observer } from 'mobx-react-lite';
 
const Account = observer(() => {

    const { user } = useContext(Context)

    const {
        id,
        password,
        createdAt,
        updatedAt,
        role,
        iat,
        exp,
        email,
        phoneNumber,
        ...rest
    } = user.user;

    const contactInformation = { email, phoneNumber };
    const userAttribute = rest;

    const updateAccountUser = async (updatedData) => {
        user.setUser(updatedData);
    };

    const contactInformationFinal = Object.keys(contactInformation).map(attr => ({
        id: attr,
        name: attr,
        propertyName: attr.charAt(0).toUpperCase() + attr.slice(1),
        propertyValue: contactInformation[attr],
        type: typeof contactInformation[attr] === 'number' ? 'number' : 'text',
        placeholder: `e.g. ${contactInformation[attr]}`
    }));

    const userAttributeFinal = Object.keys(userAttribute).map(attr => ({
        id: attr,
        name: attr,
        propertyName: attr.charAt(0).toUpperCase() + attr.slice(1),
        propertyValue: userAttribute[attr],
        type: typeof userAttribute[attr] === 'number' ? 'number' : 'text',
        placeholder: `e.g. ${userAttribute[attr]}`
    }));

    return (
        <div className="container account">
            <div className="account-menu">
                <div className="account-menu__property">
                    <div className="property-item__sign"><UserIcon /></div>
                    <div>Person</div>
                </div>
            </div>
            <div className="account-properties">

                <div className="account-property">
                    <div className="section-name">
                        <div className="property-name">
                            <div className="property-item__sign"><Phone /></div>
                            <div>Contact information</div>
                        </div>
                    </div>

                    {contactInformationFinal.map((item, index) => {
                        return (
                            <SectionProperty key={index} propertyName={item.propertyName} propertyValue={item.propertyValue} type={item.type} id={item.id} name={item.name} placeholder={item.placeholder} autoComplete={item.name} updateAccountUser={updateAccountUser} />
                        )
                    })}
                </div>

                <div className="account-property">
                    <div className="section-name">
                        <div className="property-name">
                            <div className="property-item__sign"><UserIcon /></div>
                            <div>Main information</div>
                        </div>
                    </div>

                    {userAttributeFinal.map((item, index) => {
                        return (
                            <SectionProperty key={index} propertyName={item.propertyName} propertyValue={item.propertyValue} type={item.type} id={item.id} name={item.name} placeholder={item.placeholder} autoComplete={item.name} updateAccountUser={updateAccountUser} />
                        )
                    })}
                </div>

            </div>
        </div>
    );
})

export default Account;  