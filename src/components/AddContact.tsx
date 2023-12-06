import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AddContactDetail from './AddContactDetail';

const AddContact = () => {
  return (
    <div>
      <Link to="/addcontactform">
        <button
          className="add-button bg-blue-500   right-9 h-10 transform rounded-full    px-3 text-white transition-transform duration-300 hover:scale-110"
          style={{ background: '#023e8a' }}
        >
          <b>
            Add Contact
            <FontAwesomeIcon icon={faPlus} style={{ fontSize: '12px' }} />
          </b>
        </button>
      </Link>
      <br />
      <br />
      <AddContactDetail />
    </div>
  );
};

export default AddContact;
