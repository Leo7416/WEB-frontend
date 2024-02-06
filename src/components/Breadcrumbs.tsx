import '../styles/Breadcrumbs.css';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronRight, FaHome } from 'react-icons/fa';
import { Address } from './AddressCard'; // Import the Address interface

const Breadcrumbs: FC<{ selectedAddress: Address | undefined }> = ({ selectedAddress }) => {
  const location = useLocation();
  let currentLink = '';

  const crumbs = location.pathname
    .split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
      currentLink += `/${crumb}`;

      if (currentLink.match(new RegExp('address/(\d*)'))) {
        return (
          <div className="crumb" key={crumb}>
            <Link to={currentLink}>
              {selectedAddress?.town}, {selectedAddress?.address}
            </Link>
            <FaChevronRight className="chevron-icon" />
          </div>
        );
      }
      return null; // Return null for non-address crumbs
    });

  return (
    <div className="breadcrumbs">
      <div className="crumb">
        <Link to={'/'}>
          <FaHome className="home-icon" />
        </Link>
        <FaChevronRight className="chevron-icon" />
      </div>
      {crumbs}
    </div>
  );
};

export default Breadcrumbs;
