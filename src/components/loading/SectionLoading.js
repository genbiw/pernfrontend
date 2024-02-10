import "./SectionLoading.css"
import loadingIcon from '../../assets/loading.gif';

const SectionLoading = () => {
    return (
        <div className="loading-page">
            <img src={loadingIcon} alt="Loading..."/>
        </div>
    );
}

export default SectionLoading;