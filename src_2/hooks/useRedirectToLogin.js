import { useHistory } from 'react-router-dom';

function useRedirectToLogin() {
    const history = useHistory();

    const redirectToLogin = () => {
        history.push('/login');
    }

    return redirectToLogin;
}

export default useRedirectToLogin;
