import { useParams, Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Poster from "../components/Poster";
import "../components/Detail.css";
import { FaArrowLeft, FaSearch, FaChromecast, FaPlay, FaArrowDown, FaPlus, FaRegThumbsUp, FaShareAlt } from 'react-icons/fa';

const GET_MOVIE = gql`
    query getMovie($movieId: String!){
        movie(id: $movieId) {
            id
            title
            videoUrl{
                key
            }
            release_date
            runtime
            overview
            similarMovies{
                poster_path
                id
            }
        }
    }
`;
export default function Movie(){
    const { id } = useParams();
    const { data, loading } = useQuery(GET_MOVIE, {
        variables: {
            movieId: id,
        }
    });
    console.log(data, loading);
    if(loading){
        return<h1>Fetching movie...</h1>
    }
    return (
    <div class="detail">
        <div>
            <header>
                <Link to={"/"}>                    
                <FaArrowLeft class="icon"/>
                </Link>
                <div>
                    <FaChromecast class="icon"/>
                    <FaSearch class="icon"/>
                </div>
            </header>
            <div class="video-box">
                <iframe
                class="video"
                src={`https://www.youtube.com/embed/${data.movie.videoUrl.key}?autoplay=1&mute=1&loop=1&modestbranding=1&playlist=${data.movie.videoUrl.key}&controls=0`}
                frameBorder="0"
                allow="accelerometer; autoPlay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                />
            </div>
            <div class="title">{data.movie.title}</div>
            <span>{data.movie.release_date.slice(0,4)}λ</span>
            <span>{data.movie.runtime}λΆ</span>
            <div class="d-button white"><FaPlay /> μ¬μ</div>
            <div class="d-button gray"><FaArrowDown /> μ μ₯</div>
            <div class="d-overview">{data.movie.overview}</div>
            <div>
                <div class="d-sub flex">
                   <div>
                      <FaPlus class="title" />
                      <div>λ΄κ° μ°ν μ½νμΈ </div>
                   </div>
                   <div>
                      <FaRegThumbsUp class="title" />
                      <div>νκ°</div>
                   </div>
                   <div>
                      <FaShareAlt class="title" />
                      <div>κ³΅μ </div>
                   </div>
                </div>
                <div class="sub-title">λΉμ·ν μ½νμΈ </div>
                    <div class="d-main">
                        {data.movie.similarMovies.slice(0,12).map(similar => 
                        <Poster 
                        key={similar.id} // μ΄κ±΄ map λλ¬Έμ νκ±°μ§ Movie ν¨μμ λ€μ΄κ°μμ§ μμ!
                        id={similar.id}
                        poster_path={similar.poster_path}
                        />)}
                    </div>               
            </div>
        </div>
    </div>
    );
}