import { useHistory } from 'react-router-dom';

function useRedirectToHome() {
    const history = useHistory();

    const redirectToHome = () => {
        history.push('/');
    }

    return redirectToHome;
}

export default useRedirectToHome;