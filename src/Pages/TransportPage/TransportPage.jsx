import CommonPageLayout from '../../components/CommonPageLayout';
import useTranslation from '../../hooks/useTranslation';

const TransportPage = () => {
  const { t } = useTranslation();

  const mainContent = (
    <div className="text-center py-5">
      <h2>{t('Transport')} - {t('ComingSoon')}</h2>
      <p>Bus and train schedules and transport details will be available here.</p>
    </div>
  );

  return (
    <CommonPageLayout
      pageTitle={t('Transport')}
      pageSubtitle="Navigate Nellore with ease"
      pageIcon="bi bi-bus-front"
      mainContent={mainContent}
    />
  );
};

export default TransportPage;
