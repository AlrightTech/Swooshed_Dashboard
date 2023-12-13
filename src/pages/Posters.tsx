
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


import Poster from "../components/Sweeshed/Poster";
const Posters = () => {
    return (
        <div className="">
           <Link to='/addPoster'>
           <button className="add-button px-3   h-10 rounded-full bg-blue-500 text-white    hover:scale-110 transform transition-transform duration-300 right-9" style={{background:'#023e8a'}}>
            <b>Add Poster <FontAwesomeIcon icon={faPlus} style={{fontSize:'12px'}} /></b>
          </button>
           </Link>
          <br />
          <br /> 
    <Poster/>
        </div>
      );
}

export default Posters