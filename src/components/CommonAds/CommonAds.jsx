import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommonAds } from '../../state/slices/commonAdsSlice';
import './CommonAds.css';

const CommonAds = () => {
  const dispatch = useDispatch();
  const { commonAds = [], sponsored = [], status } = useSelector((state) => state.commonAds || {});

  useEffect(() => {
    // Check if we need to fetch. 
    // We fetch if status is idle or if we have no ads and not currently fetching/failed
    if (status === 'idle' || (commonAds.length === 0 && sponsored.length === 0 && status !== 'loading' && status !== 'failed')) {
        dispatch(fetchCommonAds());
    }
  }, [dispatch, status, commonAds.length, sponsored.length]);

  return (
    <div className="sidebar-section common-ads-section">
        <h5 className="sidebar-section-title">Common Ads</h5>
        <div className="ad-cards">
          {commonAds.map((ad) => (
            <div key={ad.id} className="ad-card">
              <div className="ad-card-image">
                <img src={ad.image} alt={ad.title} />
              </div>
              <div className="ad-card-content">
                <h6 className="ad-card-title">{ad.title}</h6>
                <button className={`btn btn-${ad.buttonColor === 'blue' ? 'primary' : 'light'} btn-sm ad-card-button`}>
                  {ad.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="ad-cards">
          {sponsored.map((ad) => (
            <div key={ad.id} className="ad-card">
              <div className="ad-card-image">
                <img src={ad.image} alt={ad.title} />
              </div>
              <div className="ad-card-content">
                <h6 className="ad-card-title">{ad.title}</h6>
                {ad.subtitle && (
                  <p className="ad-card-subtitle">{ad.subtitle}</p>
                )}
                <button className={`btn btn-${ad.buttonColor === 'blue' ? 'primary' : 'light'} btn-sm ad-card-button`}>
                  {ad.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default CommonAds;
