import { NavLink } from 'react-router-dom';
import notfound from '../Assets/Images/NotFound.jpg';

const NotFound = () => {
    return (
        <>
        <img src={notfound}  style={{width: '50%'}}/>
        <NavLink exact to="/"><h3>Go Home</h3></NavLink>
        </>
    )
}

export default NotFound;