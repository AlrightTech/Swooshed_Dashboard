
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PromoTable from "../../components/Sweeshed/PromoTable";
const Promo = () => {
    return (
        <div className="">
           <Link to='/addPromo'>
           <button className="add-button px-3   h-10 rounded-full bg-blue-500 text-white    hover:scale-110 transform transition-transform duration-300 right-9" style={{background:'#023e8a'}}>
            <b>Add Promo <FontAwesomeIcon icon={faPlus} style={{fontSize:'12px'}} /></b>
          </button>
           </Link>
          <br />
          <br /> 
    <PromoTable/>
        </div>
      );
}

export default Promo