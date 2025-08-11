import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { useNavigate } from 'react-router-dom';

function SideBarNav() {
    const navigate = useNavigate();

    return (
      <>
        <Navigation

            activeItemId="/admin/dashboard"
            onSelect={({itemId}) => navigate(itemId)}
            items={[
                {
                    title: 'Dashboard',
                    itemId: '/dashboard',
                },
                {
                    title: 'Users',
                    itemId: '/users',
                    
                },
                {
                    title: 'Pharmas',
                    itemId: '/pharmas',
                    
                },
            ]}
          />
      </>
    );
}

export default SideBarNav;

