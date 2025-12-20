import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { jsPDF } from "jspdf";
import { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CommonPageLayout from "../../components/CommonPageLayout";
import useTranslation from "../../hooks/useTranslation";
import {
    setResultsLoading,
    setResultsPage,
} from "../../state/slices/resultsSlice";
import "./ResultsPage.css";

const ResultsPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    resultsList,
    resultsFilters,
    resultsPage,
    recentlyViewed,
    importantLinks,
    resultTools,
  } = useSelector((state) => state.results);

  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    board: "AP",
    session: "2024-25",
    sort: "Recent",
  });
  const [rollNumber, setRollNumber] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredResults = useMemo(() => {
    let filtered = resultsList.filter((result) => {
      const matchesFilter =
        activeFilter === "All" || result.category === activeFilter;
      const matchesCategory =
        filters.category === "All" || result.category === filters.category;
      const matchesBoard =
        filters.board === "All" || result.board === filters.board;
      const matchesSession =
        filters.session === "All" || result.session === filters.session;

      if (
        !matchesFilter ||
        !matchesCategory ||
        !matchesBoard ||
        !matchesSession
      ) {
        return false;
      }
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        return (
          result.title.toLowerCase().includes(term) ||
          result.description.toLowerCase().includes(term) ||
          result.tags.some((tag) => tag.toLowerCase().includes(term))
        );
      }

      return true;
    });

    // Filter options
    if (filters.sort === "Recent") {
      filtered.sort(
        (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
      );
    } else {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [resultsList, activeFilter, filters, searchTerm]);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  const handleFilterUpdate = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber === resultsPage.currentPage ||
      pageNumber < 1 ||
      pageNumber > resultsPage.totalPages
    ) {
      return;
    }
    dispatch(setResultsLoading(true));
    setTimeout(() => {
      dispatch(setResultsPage(pageNumber));
      dispatch(setResultsLoading(false));
    }, 400);
  };



  const handleCheckResult = () => {
    if (!rollNumber.trim()) {
      alert(t('EnterRollNumber'));
      return;
    }
    console.log("Checking result for:", rollNumber);
    // TODO: Implement actual result checking logic
  };

  const handleNextPage = () => {
    if (resultsPage.currentPage < resultsPage.totalPages) {
      handlePageChange(resultsPage.currentPage + 1);
    }
  };

  const handleResultAction = (result, actionType) => {
    // Check for direct download actions
    if (actionType.toLowerCase().includes('download') || actionType.toLowerCase().includes('memo') || actionType.toLowerCase().includes('card')) {
       generatePDF(result);
       // Show modal for feedback since download is weirdly silent otherwise
       setSelectedResult(result);
       setShowModal(true);
    } else {
       setSelectedResult(result);
       setShowModal(true);
    }
    // Optionally log or track action
    console.log(`Open result: ${result.id}, action: ${actionType}`);
  };

  const generatePDF = (item) => {
    const doc = new jsPDF();
    
    // Header (Official Look)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(0, 102, 51); // Dark Green
    doc.text("Nellorien Hub Results", 105, 20, { align: "center" });

    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25);
    
    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    const titleLines = doc.splitTextToSize(item.title, 190);
    doc.text(titleLines, 10, 40);

    let yPos = 40 + (titleLines.length * 7) + 5;
    
    // Meta
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(100);
    const metaText = `Category: ${item.category}   |   Board: ${item.board}   |   Date: ${item.publishedDate ? new Date(item.publishedDate).toLocaleDateString() : 'N/A'}`;
    doc.text(metaText, 10, yPos);
    yPos += 10;

    if (item.passPercentage) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 150, 0);
        doc.text(`Pass Percentage: ${item.passPercentage}%`, 10, yPos);
        yPos += 10;
    }
    
    // Full Content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0);
    const content = item.fullContent || item.description || "";
    const paragraphs = content.split('\n');

    paragraphs.forEach(para => {
        if (!para.trim()) {
            yPos += 5;
            return;
        }
        const lines = doc.splitTextToSize(para.trim(), 190);
        
        if (yPos + (lines.length * 7) > 280) {
            doc.addPage();
            yPos = 20;
        }
        
        doc.text(lines, 10, yPos);
        yPos += (lines.length * 7) + 5;
    });
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("This is a computer-generated document. Not valid for legal purposes without seal.", 105, 290, { align: "center" });
    
    doc.save(`${item.title.substring(0, 30).trim().replace(/[^a-z0-9]/gi, '_')}.pdf`);
  };

  const handleModalPrimaryAction = () => {
     if (!selectedResult) return;
     
     const primaryAction = selectedResult.actions[0];
     // Check for typical download/print keywords
     if (primaryAction && (
        primaryAction.toLowerCase().includes('pdf') || 
        primaryAction.toLowerCase().includes('download') ||
        primaryAction.toLowerCase().includes('check') ||
        primaryAction.toLowerCase().includes('memo')
     )) {
        // For 'Check' or 'Memo', we might normally just show it, but let's offer PDF download too
        // or strictly only if it is a 'Download' action. 
        // User request: "when the download pdf button clicked".
        if (primaryAction.toLowerCase().includes('download') || primaryAction.toLowerCase().includes('memo')) {
             generatePDF(selectedResult);
        } else {
             alert(t("RedirectingToPortal") || "Redirecting to official portal...");
        }
     }
     handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedResult(null), 300);
  };

  const [visibleCount, setVisibleCount] = useState(6);
  const [isLocalLoading, setIsLocalLoading] = useState(false);
  const isLoading = isLocalLoading || resultsPage.isLoading;

  useEffect(() => {
    setVisibleCount(6);
  }, [activeFilter, filters, searchTerm]);

  const displayedResults = useMemo(() => {
    return filteredResults.slice(0, visibleCount);
  }, [filteredResults, visibleCount]);

  const handleLoadMore = () => {
    setIsLocalLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setIsLocalLoading(false);
    }, 500);
  };

  // ... inside ResultsPage component



  // Find Section Left
  const findSectionLeft = (
    <>
      <h2 className="results-find-title">{t('FindResultFast')}</h2>
      <p className="results-find-instructions">
        {t('ResultInstructions')}
      </p>
      <div className="results-alert-box">
        <i className="bi bi-exclamation-triangle"></i>
        <span>
          {t('HighTrafficAlert')}
        </span>
      </div>
    </>
  );

  // Find Section Right
  const findSectionRight = (
    <div className="results-quick-actions-panel">
      <h4 className="results-sidebar-title">{t('QuickActions')}</h4>
      <div className="results-roll-input">
        <span className="results-roll-prefix">#</span>
        <input
          type="text"
          placeholder={t('EnterRollNumber')}
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
      </div>
      <div className="results-action-buttons">
        <button className="results-check-btn" onClick={handleCheckResult}>
          <i className="bi bi-search me-2"></i>
          {t('CheckResult')}
        </button>
        <button className="results-download-btn">
          <i className="bi bi-download me-2"></i>
          {t('DownloadScorecard')}
        </button>
      </div>
    </div>
  );

  // Filters Row
  const filtersRow = (
    <>
      <div className="results-filter-dropdown">
        <label>{t('Categories')}:</label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterUpdate("category", e.target.value)}
        >
          <option value="All">{t('All')}</option>
          <option value="Schools">{t('Schools')}</option>
          <option value="Universities">{t('Universities')}</option>
          <option value="Govt Exams">{t('GovtExams')}</option>
          <option value="Medical">{t('Medical')}</option>
        </select>
      </div>
      <div className="results-filter-dropdown">
        <label>{t('BoardBody')}:</label>
        <select
          value={filters.board}
          onChange={(e) => handleFilterUpdate("board", e.target.value)}
        >
          <option value="AP">AP</option>
          <option value="TS">TS</option>
          <option value="CBSE">CBSE</option>
          <option value="ICSE">ICSE</option>
        </select>
      </div>
      <div className="results-filter-dropdown">
        <label>{t('Session')}:</label>
        <select
          value={filters.session}
          onChange={(e) => handleFilterUpdate("session", e.target.value)}
        >
          <option value="2024-25">2024-25</option>
          <option value="2023-24">2023-24</option>
          <option value="2022-23">2022-23</option>
        </select>
      </div>
      <div className="results-filter-dropdown">
        <label>{t('Sort')}:</label>
        <select
          value={filters.sort}
          onChange={(e) => handleFilterUpdate("sort", e.target.value)}
        >
          <option value="Recent">{t('Recent')}</option>
          <option value="Alphabetical">{t('Alphabetical')}</option>
        </select>
      </div>
    </>
  );

  // Main Content
  const mainContent = (
    <div className="results-list-container">
      {displayedResults.map((result) => (
        <div key={result.id} className="result-card">
          <div className="result-card-header">
            <h3 className="result-card-title">{result.title}</h3>
            <div className="result-card-tags">
              {result.tags.map((tag, idx) => (
                <span key={idx} className="result-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {result.passPercentage && (
            <div className="result-pass-badge">
              {t('PassPercentage')}: {result.passPercentage}
            </div>
          )}
          <p className="result-card-description">{result.description}</p>
          <div className="result-card-actions">
            {result.actions.map((action, idx) => (
              <button
                key={idx}
                className={`result-action-btn ${
                  idx === 0
                    ? "result-action-primary"
                    : "result-action-secondary"
                }`}
                onClick={() => handleResultAction(result, action)}
              >
                {t(action) || action}
              </button>
            ))}
          </div>
        </div>
      ))}
      
      {displayedResults.length === 0 && (
         <div className="text-center py-5 w-100">
           <p className="text-muted">{t('NoResultsFound') || 'No results found'}</p>
         </div>
      )}

      {/* Load More Button inside Main Content */}
      {visibleCount < filteredResults.length && (
        <div className="d-flex justify-content-center py-4 w-100">
          <button 
            className="btn btn-primary rounded-pill px-5 py-2" 
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </button>
        </div>
      )}
    </div>
  );

  // Sidebar Content
  const sidebarContent = (
    <>
      {/* result tools section */}
      <div className="results-sidebar-section">
        <div className="results-sidebar-header">
          <h4 className="results-sidebar-title">{t('ResultTools')}</h4>
          <a href="#" className="results-sidebar-link">
            {t('Utilities')}
          </a>
        </div>
        <div className="results-tools-list">
          {resultTools.map((tool) => (
            <div key={tool.id} className="results-tool-item">
              <i className={`bi ${tool.icon}`}></i>
              <span>{t(tool.label) || tool.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* important links section */}
      <div className="results-sidebar-section">
        <div className="results-sidebar-header">
          <h4 className="results-sidebar-title">{t('ImportantLinks')}</h4>
          <a href="#" className="results-sidebar-link">
            {t('Boards')}
          </a>
        </div>
        <div className="results-links-list">
          {importantLinks.map((link) => (
            <a key={link.id} href={link.url} className="results-link-item">
              <i className="bi bi-box-arrow-up-right"></i>
              <span>{t(link.label) || link.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* recently viewed section */}
      <div className="results-sidebar-section">
        <div className="results-sidebar-header">
          <h4 className="results-sidebar-title">{t('RecentlyViewed')}</h4>
          <a href="#" className="results-sidebar-link">
            {t('You')}
          </a>
        </div>
        <div className="results-recent-list">
          {recentlyViewed.map((item) => (
            <div key={item.id} className="results-recent-item">
              <i className="bi bi-clock-history"></i>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const localizedFilters = resultsFilters.map(f => ({
      ...f,
      label: t(f.label) || f.label
  }));

  return (
    <>
    <CommonPageLayout
      pageTitle={t('Results')}
      pageIcon="bi bi-mortarboard"
      pageSubtitle={t('ResultsSubtitle')}
      filterTabs={localizedFilters}
      activeFilter={activeFilter}
      onFilterChange={handleFilterChange}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder={t('SearchResults')}
      includeSearch={true}
      findSectionLeft={findSectionLeft}
      findSectionRight={findSectionRight}
      filtersRow={filtersRow}
      mainContent={mainContent}
      sidebarContent={sidebarContent}
      footerTagline={t('FooterTagline')}
      includeNavbarSearch={false}
      className="results-page"
      mainClassName="results-page-main"
    />

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        {selectedResult && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedResult.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-4">
                <div className="d-flex flex-wrap gap-2 text-muted mb-3">
                  <span className="d-flex align-items-center"><i className="bi bi-tag me-1"></i>{selectedResult.category}</span>
                  <span className="d-flex align-items-center"><i className="bi bi-calendar me-1"></i>{selectedResult.publishedDate ? new Date(selectedResult.publishedDate).toLocaleDateString() : 'N/A'}</span>
                  <span className="d-flex align-items-center"><i className="bi bi-bookmark me-1"></i>{selectedResult.board}</span>
                  {selectedResult.passPercentage && (
                    <span className="d-flex align-items-center text-success fw-bold"><i className="bi bi-percent me-1"></i>Pass: {selectedResult.passPercentage}%</span>
                  )}
                </div>
                
                {selectedResult.tags && selectedResult.tags.length > 0 && (
                  <div className="mb-3">
                    {selectedResult.tags.map((tag, idx) => (
                      <span key={idx} className="result-tag me-2 mb-1 d-inline-block">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="result-full-content">
                 <h6 className="mb-2 text-primary">{t('FullDetails') || 'Full Details'}</h6>
                 {selectedResult.fullContent ? (
                    selectedResult.fullContent.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-secondary">{paragraph}</p>
                    ))
                 ) : (
                   <p className="text-secondary">{selectedResult.description}</p>
                 )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                {t('Close')}
              </Button>
               {selectedResult.actions && selectedResult.actions[0] && (
                  <Button variant="primary" onClick={handleModalPrimaryAction}>
                    {t(selectedResult.actions[0]) || selectedResult.actions[0]}
                  </Button>
                )}
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default ResultsPage;
