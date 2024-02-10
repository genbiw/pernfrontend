import "./Account.css"
import { UserIcon, Order, Favorite, Review, Phone, Pencil, Email, Password } from "../../utils/elements"
import { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import GenderDropdown from "../../components/account/GenderDropdown"
import SectionProperty from "../../components/account/SectionProperty"
import { observer } from 'mobx-react-lite'; 

const Account = observer(() => {

    const { user } = useContext(Context)
    console.log(user.user)

    const updateAccountUser = async (updatedData) => {
        user.setUser(updatedData);
    };

    const { id, password, createdAt, updatedAt, email, role, iat, exp, ...userAttribute } = user.user

    const userAttributeFinal = Object.keys(userAttribute).map(attr => ({
        id: attr,
        name: attr,
        propertyName: attr.charAt(0).toUpperCase() + attr.slice(1),
        propertyValue: userAttribute[attr],
        type: typeof userAttribute[attr] === 'number' ? 'number' : 'text',
        placeholder: `e.g. ${userAttribute[attr]}`
    }));

    const sectionPropertyPhone = [
        {
            id: "phone",
            name: "phone",
            propertyName: "Phone number",
            propertyValue: "",
            type: "text",
            placeholder: "e.g. 122333444455"
        }
    ]

    const sectionPropertyEmail = [
        {
            id: "email",
            name: "email",
            propertyName: "Email",
            propertyValue: user.user.email,
            type: "text",
            placeholder: "e.g. example@gmail.com"
        }
    ]


    const sectionPropertyPassword = [
        {
            id: "oldpassword",
            name: "oldpassword",
            propertyName: "Old password",
            propertyValue: "",
            type: "password",
            placeholder: "e.g. 122333444455"
        },
        {
            id: "newpassword",
            name: "newpassword",
            propertyName: "New password",
            propertyValue: "",
            type: "password",
            placeholder: "e.g. 122333444455"
        },
        {
            id: "confirmpassword",
            name: "confirmpassword",
            propertyName: "Confirm password",
            propertyValue: "",
            type: "password",
            placeholder: "e.g. 122333444455"
        }
    ]


    return (
        <div className="container account">
            <div className="account-menu">
                <div className="account-menu__property">
                    <div className="property-item__sign"><UserIcon /></div>
                    <div>Person</div>
                </div>
                {/* <div className="account-menu__property">
                    <div className="property-item__sign"><Order /></div>
                    <div>My orders</div>
                </div>
                <div className="account-menu__property">
                    <div className="property-item__sign"><Favorite /></div>
                    <div>Favorites</div>
                </div>
                <div className="account-menu__property">
                    <div className="property-item__sign"><Review /></div>
                    <div>My reviews</div>
                </div> */}
            </div>
            <div className="account-properties">

                {/* <div className="account-property">
                    <div className="section-name">
                        <div className="property-name">
                            <div className="property-item__sign"><Phone /></div>
                            <div>Phone numbers</div>
                        </div>
                        <div>+ ADD NEW</div>
                    </div>
                    {sectionPropertyPhone.map((item, index) => {
                        return (
                            <SectionProperty key={index} propertyName={item.propertyName} type={item.type} id={item.id} name={item.name} placeholder={item.placeholder} autoComplete={item.name}
                                updateAccountUser={updateAccountUser} />
                        )
                    })}
                </div> */}

                {/* <div className="account-property">
                    <div className="section-name">
                        <div className="property-name">
                            <div className="property-item__sign"><Email /></div>
                            <div>Emails</div>
                        </div>
                        <div>+ ADD NEW</div>
                    </div>
                    {sectionPropertyEmail.map((item, index) => {
                        return (
                            <SectionProperty key={index} propertyName={item.propertyName} propertyValue={item.propertyValue} type={item.type} id={item.id} name={item.name} placeholder={item.placeholder} autoComplete={item.name} updateAccountUser={updateAccountUser} />
                        )
                    })}
                </div> */}

                {/* <div className="account-property">
                    <div className="section-name">
                        <div className="property-name">
                            <div className="property-item__sign"><Password /></div>
                            <div>Password</div>
                        </div>
                        <div>+ ADD NEW</div>
                    </div>
                    {sectionPropertyPassword.map((item, index) => {
                        return (
                            <SectionProperty key={index} propertyName={item.propertyName} type={item.type} id={item.id} name={item.name} placeholder={item.placeholder} autoComplete={item.name} updateAccountUser={updateAccountUser} />
                        )
                    })}
                </div> */}

                <div className="account-property">
                    <div className="section-name">
                        <div className="property-name">
                            <div className="property-item__sign"><UserIcon /></div>
                            <div>Main information</div>
                        </div>
                        {/* <div>+ ADD NEW</div> */}
                    </div>
                    {/* <div className="section-property">
                        <div>Gender</div>
                        <div className="input-underscore__block">
                            <GenderDropdown />
                            <div className="property-item__sign"><Pencil /></div>
                        </div>
                    </div> */}
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