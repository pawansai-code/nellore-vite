import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMemo, useState } from 'react';
import CommonAds from '../../components/CommonAds/CommonAds';
import Footer from '../../components/Footer';
import MainHeader from '../../components/MainHeader';
import Navbar from '../../components/Navbar';
import Pagination from '../../components/Pagination';
import TopHeader from '../../components/TopHeader';
import useTranslation from '../../hooks/useTranslation';
import './MoviesPage.css';

const MoviesPage = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sample movie data matching the image description
  const recommendedMovies = [
    {
      id: 1,
      title: 'Avatar: Fire and Ash',
      poster: 'https://via.placeholder.com/300x450/1a1a2e/ffffff?text=Avatar+Fire+and+Ash',
      rating: 8.1,
      voteCount: '33.4K+',
      genres: ['Action', 'Adventure', 'Fantasy', 'Sci-Fi']
    },
    {
      id: 2,
      title: 'Kombuseevi',
      poster: 'https://via.placeholder.com/300x450/2d1810/ffffff?text=Kombuseevi',
      rating: 7.2,
      voteCount: '270+',
      genres: ['Action', 'Crime', 'Drama']
    },
    {
      id: 3,
      title: 'Dhurandhar',
      poster: 'https://via.placeholder.com/300x450/1a0000/ffffff?text=Dhurandhar',
      rating: 9.3,
      voteCount: '305K+',
      genres: ['Action', 'Thriller']
    },
    {
      id: 4,
      title: 'Bha. Bha. Ba.',
      poster: 'https://via.placeholder.com/300x450/800000/ffffff?text=Bha+Bha+Ba',
      rating: 7.4,
      voteCount: '25.1K+',
      genres: ['Action', 'Comedy', 'Thriller']
    },
    {
      id: 5,
      title: 'Tere Ishk Mein',
      poster: 'https://via.placeholder.com/300x450/000000/ffffff?text=Tere+Ishk+Mein',
      rating: 8.2,
      voteCount: '82K+',
      genres: ['Drama', 'Romantic']
    },
    {
      id: 6,
      title: 'Marco',
      poster: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Marco',
      rating: 7.8,
      voteCount: '15K+',
      genres: ['Action', 'Thriller']
    },
    {
      id: 7,
      title: 'Pushpa 2: The Rule',
      poster: 'https://via.placeholder.com/300x450/5D4037/ffffff?text=Pushpa+2',
      rating: 9.1,
      voteCount: '450K+',
      genres: ['Action', 'Crime', 'Drama']
    },
    {
      id: 8,
      title: 'Devara',
      poster: 'https://via.placeholder.com/300x450/0D47A1/ffffff?text=Devara',
      rating: 8.5,
      voteCount: '120K+',
      genres: ['Action', 'Drama']
    },
    {
      id: 9,
      title: 'Kalki 2898 AD',
      poster: 'https://via.placeholder.com/300x450/212121/ffffff?text=Kalki+2898+AD',
      rating: 8.8,
      voteCount: '380K+',
      genres: ['Sci-Fi', 'Action', 'Mythology']
    },
    {
      id: 10,
      title: 'The Greatest of All Time',
      poster: 'https://via.placeholder.com/300x450/1B5E20/ffffff?text=GOAT',
      rating: 7.9,
      voteCount: '200K+',
      genres: ['Action', 'Sci-Fi', 'Thriller']
    },
    {
      id: 11,
      title: 'Kanguva',
      poster: 'https://via.placeholder.com/300x450/BF360C/ffffff?text=Kanguva',
      rating: 8.0,
      voteCount: '150K+',
      genres: ['Action', 'Fantasy', 'History']
    },
    {
      id: 12,
      title: 'Vettaiyan',
      poster: 'https://via.placeholder.com/300x450/3E2723/ffffff?text=Vettaiyan',
      rating: 8.3,
      voteCount: '95K+',
      genres: ['Action', 'Drama', 'Crime']
    },
    {
      id: 13,
      title: 'Coolie',
      poster: 'https://via.placeholder.com/300x450/FFD600/000000?text=Coolie',
      rating: 9.0,
      voteCount: '300K+',
      genres: ['Action', 'Thriller']
    },
    {
      id: 14,
      title: 'Indian 2',
      poster: 'https://via.placeholder.com/300x450/B71C1C/ffffff?text=Indian+2',
      rating: 6.5,
      voteCount: '80K+',
      genres: ['Action', 'Thriller']
    },
    {
      id: 15,
      title: 'OG',
      poster: 'https://via.placeholder.com/300x450/263238/ffffff?text=OG',
      rating: 8.7,
      voteCount: '180K+',
      genres: ['Action', 'Crime']
    },
    {
      id: 16,
      title: 'Game Changer',
      poster: 'https://via.placeholder.com/300x450/01579B/ffffff?text=Game+Changer',
      rating: 8.4,
      voteCount: '140K+',
      genres: ['Political', 'Action', 'Drama']
    },
    {
      id: 17,
      title: 'Viduthalai Part 2',
      poster: 'https://via.placeholder.com/300x450/33691E/ffffff?text=Viduthalai+2',
      rating: 8.9,
      voteCount: '60K+',
      genres: ['Crime', 'Drama', 'Thriller']
    },
    {
      id: 18,
      title: 'Thangalaan',
      poster: 'https://via.placeholder.com/300x450/E65100/ffffff?text=Thangalaan',
      rating: 8.2,
      voteCount: '110K+',
      genres: ['Adventure', 'Drama', 'History']
    },
    {
      id: 19,
      title: 'Vidaamuyarchi',
      poster: 'https://via.placeholder.com/300x450/4A148C/ffffff?text=Vidaamuyarchi',
      rating: 8.6,
      voteCount: '220K+',
      genres: ['Action', 'Thriller']
    },
    {
      id: 20,
      title: 'Singham Again',
      poster: 'https://via.placeholder.com/300x450/B71C1C/ffffff?text=Singham+Again',
      rating: 7.5,
      voteCount: '190K+',
      genres: ['Action', 'Crime']
    }
  ];

  const displayedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return recommendedMovies.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="movies-page">
      <TopHeader />
      <MainHeader 
        siteName={t('siteName') + ".IN"} 
        tagline={t('tagline')} 
      />
      <Navbar includeSearch={false} />

      <main className="movies-main-content">
        <div className="container-fluid">
          {/* Recommended Movies Section */}
          <section className="movies-recommended-section">
            <div className="movies-section-heading">
              <h2 className="movies-heading-title">Recommended Movies</h2>
            </div>

            <div className="row">
              {/* Movies Grid Column */}
              <div className="col-lg-9">
                <div className="movies-cards-row">
                  {displayedMovies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                      <div className="movie-card-poster">
                        <img src={movie.poster} alt={movie.title} />
                        <div className="movie-rating-info">
                          <i className="bi bi-star-fill movie-star-icon"></i>
                          <span className="movie-rating">{movie.rating}/10</span>
                          <span className="movie-votes-inline">{movie.voteCount} Votes</span>
                        </div>
                      </div>
                      <div className="movie-card-content">
                        <h3 className="movie-title">{movie.title}</h3>
                        <div className="movie-genres">
                          {movie.genres.join('/')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Pagination 
                   currentPage={currentPage}
                   totalItems={recommendedMovies.length}
                   itemsPerPage={itemsPerPage}
                   onPageChange={handlePageChange}
                />
              </div>

              {/* Common Ads Column */}
              <div className="col-lg-3">
                <div className="common-ads-container">
                  <CommonAds />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer 
        siteName={t('siteName') + ".IN"}
        tagline={t('FooterTagline')}
      />
    </div>
  );
};

export default MoviesPage;
