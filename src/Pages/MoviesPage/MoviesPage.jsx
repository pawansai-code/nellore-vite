import CommonPageLayout from '../../components/CommonPageLayout';
import useTranslation from '../../hooks/useTranslation';

const MoviesPage = () => {
  const { t } = useTranslation();

  const mainContent = (
    <div className="text-center py-5">
      <h2>{t('Movies')} - {t('ComingSoon')}</h2>
      <p>Showtimes and theatre information will be available here.</p>
    </div>
  );

  return (
    <CommonPageLayout
      pageTitle={t('Movies')}
      pageSubtitle="Find the latest showtimes and movies in Nellore"
      pageIcon="bi bi-film"
      mainContent={mainContent}
    />
  );
};

export default MoviesPage;
