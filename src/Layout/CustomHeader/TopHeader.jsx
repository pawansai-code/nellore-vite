import { FaChevronDown, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import useTranslation from '../../hooks/useTranslation';
import { setLanguage } from "../../state/slices/appSlice";
import './TopHeader.css';

const TopHeader = () => {
  const { t } = useTranslation();
  const language = useSelector((state) => state.app.language);
  const dispatch = useDispatch();

  const handleLanguageChange = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <div className="top-header">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center py-2 top-header-content">
          <div className="d-flex align-items-center gap-3">
            <FaEnvelope className="top-header-icon" />
            <span>{t('email')}</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <FaPhone className="top-header-icon" />
            <span>8341540001</span>
            <span>•</span>
            <span>8367600045</span>
            <div className="language-selector">
              <select
                value={language}
                onChange={handleLanguageChange}
                className="language-dropdown"
              >
                <option value="English">English</option>
                <option value="Telugu">Telugu</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
              </select>
              <FaChevronDown className="dropdown-arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
