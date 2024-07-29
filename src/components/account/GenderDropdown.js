import "./GenderDropdown.css"
import { useContext, useState } from "react"; 
import { Context } from "../..";
 
const GenderDropdown = ({gender, setGender}) => { 

    const { user } = useContext(Context)

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (selectedGender) => {
        user.setSelectedGender(selectedGender); // Update user context
        setGender(selectedGender); // Update local state in Registration component
        setIsOpen(false);
    };

    return ( 
        <div className="genders-dropdown">
            <div className="selected-gender" onClick={handleToggle}>
                {gender || 'Choose Gender'}
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