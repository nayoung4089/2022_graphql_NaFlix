import { useParams, Link } from "react-router-dom";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import Poster from "../components/Poster";
import "../components/Detail.css";
import { FaArrowLeft, FaSearch, FaChromecast, FaPlay, FaArrowDown, FaPlus, FaRegThumbsUp, FaThumbsUp, FaShareAlt } from 'react-icons/fa';

const GET_MOVIE = gql`
    query getMovie($movieId: String!){
        movie(id: $movieId) {
            id
            title
            release_date
            runtime
            overview
            videoUrl{
                key
            }
            similarMovies{
                poster_path
                id
            }
            isLiked @client
        }
    }
`;
export default function Movie(){
    const { id } = useParams();
    const { data, loading, client: {cache} } = useQuery(GET_MOVIE, {
        variables: {
            movieId: id,
        }
    });
    if(loading){
        return<h1>Fetching movie...</h1>
    }
    const onClick = ()=> {
        cache.writeFragment({
            id:`Movie:${id}`,
            fragment: gql `
               fragment MovieFragment on Movie {
                isLiked
               }
            `,
            data: {
                isLiked: !data.movie.isLiked
            }
        })

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
                src={`https://www.youtube.com/embed/${data?.movie?.videoUrl.key}?autoplay=1&mute=1&loop=1&modestbranding=1&playlist=${data?.movie?.videoUrl.key}&controls=0`}
                frameBorder="0"
                allow="accelerometer; autoPlay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                />
            </div>
            <div class="title">{data?.movie?.title}</div>
            <span>{data?.movie?.release_date.slice(0,4)}???</span>
            <span>{data?.movie?.runtime}???</span>
            <div class="d-button white"><FaPlay /> ??????</div>
            <div class="d-button gray"><FaArrowDown /> ??????</div>
            <div class="d-overview">{data?.movie?.overview}</div>
            <div>
                <div class="d-sub flex">
                   <div>
                      <FaPlus class="title" />
                      <div>?????? ?????? ?????????</div>
                   </div>
                   <div>
                      <button onClick={onClick}>
                        {data?.movie?.isLiked? <FaThumbsUp class="title" color="#e50914"/> :<FaRegThumbsUp class="title" color="white"/>}
                      </button>
                      <div>??????</div>
                   </div>
                   <div>
                      <FaShareAlt class="title" />
                      <div>??????</div>
                   </div>
                </div>
                <div class="sub-title">????????? ?????????</div>
                    <div class="d-main">
                        {data?.movie?.similarMovies.slice(0,12).map(similar => 
                        <Poster 
                        key={similar.id} // ?????? map ????????? ????????? Movie ????????? ??????????????? ??????!
                        id={similar.id}
                        poster_path={similar.poster_path}
                        />)}
                    </div>               
            </div>
        </div>
    </div>
    );
}