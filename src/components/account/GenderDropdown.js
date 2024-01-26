import "./GenderDropdown.css"
import { useContext, useEffect, useState } from "react";
import { Context } from "../..";

const GenderDropdown = () => {

    const { user } = useContext(Context)

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (gender) => {
        user.setSelectedGender(gender);
        setIsOpen(false);
    };

    return ( 
        <div className="genders-dropdown">
            <div className="selected-gender" onClick={handleToggle}>
                {user.selectedGender || 'Choose Gender'}
            </div>
            {isOpen && (
                <div className="gender-dropdown-content">
                    <div className="gender-dropdown-content__item" onClick={() => handleSelect('male')}>
                        Male
                    </div>
                    <div className="gender-dropdown-content__item" onClick={() => handleSelect('female')}>
                        Female
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenderDropdown; 