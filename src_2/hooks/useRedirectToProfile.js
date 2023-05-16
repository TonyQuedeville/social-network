import { useHistory } from 'react-router-dom';

function useRedirectToProfile() {
    const history = useHistory();

    const redirectProfile = () => {
        history.push('/profile');
    }

    return redirectProfile;
}

export default useRedirectToProfile;