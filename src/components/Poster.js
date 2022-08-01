import PropTypes from "prop-types"; // Movie가 받게 되는 값들이 어떤 형태여야 하는지 정해줌
import { Link } from "react-router-dom"; // Link : 해당 페이지로 갔을 때 전체 새로고침 방지!

function Poster ({id, poster_path}){
    return (
      <div class="main-text">
        <Link to={`/movies/${id}`}>
          <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} height="300px" width="200px"/>
        </Link>
      </div>
    );
}

Poster.propTypes = {
    id : PropTypes.number.isRequired,
    poster_path : PropTypes.string.isRequired,
}
export default Poster;