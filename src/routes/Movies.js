import { gql, useQuery} from "@apollo/client";
import Poster from "../components/Poster";
import "../components/Home.css";
import { FaSearch, FaBell, FaPlay, FaInfoCircle } from 'react-icons/fa';

const ACTION_MOVIES = gql`
    query getMovies{
        allGenreMovies(genreID: "28") {
            title
            id
            poster_path
        }
    }
`;
const ANI_MOVIES = gql`
    query getMovies{
        allGenreMovies(genreID: "16") {
            title
            id
            poster_path
        }
    }
`;
const COMIC_MOVIES = gql`
    query getMovies{
        allGenreMovies(genreID: "35") {
            title
            id
            poster_path
        }
    }
`;
const LOVE_MOVIES = gql`
    query getMovies{
        allGenreMovies(genreID: "10749") {
            title
            id
            poster_path
        }
    }
`;
const CRIME_MOVIES = gql`
    query getMovies{
        allGenreMovies(genreID: "80") {
            title
            id
            poster_path
        }
    }
`;
const DRAMA_MOVIES = gql`
    query getMovies{
        allGenreMovies(genreID: "18") {
            title
            id
            poster_path
        }
    }
`;
const MUSIC_MOVIES = gql`
    query getMovies{
        allGenreMovies(genreID: "10402") {
            title
            id
            poster_path
        }
    }
`;

const moveToTop = () => {window.scrollTo({ top: 0, behavior: "smooth" });} // 천천히 올라가는게 smooth! 

export default function Movies(){
    const { data:action_data } = useQuery(ACTION_MOVIES);
    const { data:ani_data } = useQuery(ANI_MOVIES);
    const { data:comic_data } = useQuery(COMIC_MOVIES);
    const { data:love_data } = useQuery(LOVE_MOVIES);
    const { data:crime_data } = useQuery(CRIME_MOVIES);
    const { data:drama_data } = useQuery(DRAMA_MOVIES);
    const { data:music_data, error, loading} = useQuery(MUSIC_MOVIES);
    if(loading){
        return <h1>Loading...</h1>;
    }
    if(error){
        return<h1>Could not fetch</h1>;
    }
    return(
    <div>
      <header>
        <div class="logo" onClick={moveToTop}>NaFlix</div>
        <nav class="nav">
          <span>홈</span>
          <span>TV프로그램</span>
          <span>영화</span>
          <span>내가 찜한 콘텐츠</span>
        </nav>
        <nav class="sub-nav">
          <FaSearch class="icon" />
          <FaBell class="icon" />
        </nav>
      </header>

      <div>
        <div class="video-box">
        <iframe
        class="video opacity"
        src={`https://www.youtube.com/embed/2vWo-TZHXFc?autoplay=1&mute=1&loop=1&modestbranding=1&playlist=2vWo-TZHXFc&controls=0`}
        frameBorder="0"
        allow="accelerometer; autoPlay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        />
          <div class="video-text">
            <div>스파이더맨: 노 웨이 홈</div>
            <div class="overview">
            ‘미스테리오’의 계략으로 세상에 정체가 탄로난 스파이더맨 ‘피터 파커’는 하루 아침에 평범한 일상을 잃게 된다. 문제를 해결하기 위해 ‘닥터 스트레인지’를 찾아가 도움을 청하지만 뜻하지 않게 멀티버스가 열리면서 ... 더보기
            </div>
            <div class="flex">
              <div class="button white"><FaPlay />  재생</div>
              <div class="button gray"><FaInfoCircle />  상세정보</div>
            </div>
          </div>
        </div>
    <div class="hole">
      <div>
        <div class="sub-title">액션영화</div>
        <div class="wrap-main">
          <div class="main">
            {action_data.allGenreMovies.map((movie) => (
            <Poster key={movie.id} id={movie.id} poster_path={movie.poster_path}/>
            ))}
          </div>
        </div>
        <div class="sub-title">애니메이션</div>
        <div class="wrap-main">
          <div class="main">
            {ani_data.allGenreMovies.map((movie) => (
            <Poster key={movie.id} id={movie.id} poster_path={movie.poster_path}/>
            ))}
          </div>
        </div>
        <div class="sub-title">코미디</div>
        <div class="wrap-main">
          <div class="main">
            {comic_data.allGenreMovies.map((movie) => (
            <Poster key={movie.id} id={movie.id} poster_path={movie.poster_path}/>
            ))}
          </div>
        </div>
        <div class="sub-title">로맨스</div>
        <div class="wrap-main">
          <div class="main">
            {love_data.allGenreMovies.map((movie) => (
            <Poster key={movie.id} id={movie.id} poster_path={movie.poster_path}/>
            ))}
          </div>
        </div>
        <div class="sub-title">범죄/ 스릴러</div>
        <div class="wrap-main">
          <div class="main">
            {crime_data.allGenreMovies.map((movie) => (
            <Poster key={movie.id} id={movie.id} poster_path={movie.poster_path}/>
            ))}
          </div>
        </div>
        <div class="sub-title">드라마</div>
        <div class="wrap-main">
          <div class="main">
            {drama_data.allGenreMovies.map((movie) => (
            <Poster key={movie.id} id={movie.id} poster_path={movie.poster_path}/>
            ))}
          </div>
        </div>
        <div class="sub-title">뮤지컬</div>
        <div class="wrap-main">
          <div class="main">
            {music_data.allGenreMovies.map((movie) => (
            <Poster key={movie.id} id={movie.id} poster_path={movie.poster_path}/>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    );
}