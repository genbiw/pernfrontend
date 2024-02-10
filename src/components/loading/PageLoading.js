import loadingGif from '../../assets/giphy.gif'; 
import "./PageLoading.css"

const PageLoading = () => {
    return ( 
        <div className="AppLoading">
          <img src={loadingGif} alt="Loading..."/>;
          {/* ... other components ... */}
      </div>
     );
}
 
export default PageLoading;