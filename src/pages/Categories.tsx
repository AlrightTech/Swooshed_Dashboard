import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import Categories from "../components/Sweeshed/Categories";

function CategoriesPage() {
  return (
    <div className="">
       <Link to='/addCategory'>
       <button className="add-button px-3   h-10 rounded-full bg-blue-500 text-white    hover:scale-110 transform transition-transform duration-300 right-9" style={{background:'#023e8a'}}>
        <b>Add Categories <FontAwesomeIcon icon={faPlus} style={{fontSize:'12px'}} /></b>
      </button>
       </Link>
      <br />
      <br /> 
<Categories/>
    </div>
  );
}

export default CategoriesPage;
