import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { jsPDF } from "jspdf";
import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BannerImg from "../../assets/images/Banner_img.jpg";
import HistoryImg1 from "../../assets/images/history-img1.jpg";
import NellorePic from "../../assets/images/nellore_pic.jpg";
import SportsImg from "../../assets/images/sports-hero.jpg";
import CommonAds from "../../components/CommonAds/CommonAds";
import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import Navbar from "../../components/Navbar";
import TopHeader from "../../components/TopHeader";
import useTranslation from "../../hooks/useTranslation";
import "./HistoryPage.css";

const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { commonAds } = useSelector((state) => state.news);
  /* Gallery State */
  const [activeDot, setActiveDot] = useState(0);
  const galleryRef = useRef(null);

  const galleryImages = [
    { src: HistoryImg1, id: 1 },
    { src: NellorePic, id: 2 },
    { src: BannerImg, id: 3 },
    { src: SportsImg, id: 4 },
    { src: HistoryImg1, id: 5 },

  ];

  /* Auto Scroll Effect */
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeDot + 1) % galleryImages.length;
      scrollToIndex(nextIndex);
    }, 4000); // 4 seconds for better UX

    return () => clearInterval(interval);
  }, [activeDot, galleryImages.length]);

  /* Gallery Logic */
  const handleScroll = () => {
    if (galleryRef.current && galleryRef.current.firstChild) {
      const scrollLeft = galleryRef.current.scrollLeft;
      const itemWidth = galleryRef.current.firstChild.offsetWidth; 
      const gap = 20;
      const totalItemWidth = itemWidth + gap;
      
      const newIndex = Math.round(scrollLeft / totalItemWidth);
      // Ensure we don't go out of bounds
      const clampedIndex = Math.max(0, Math.min(newIndex, galleryImages.length - 1));
      setActiveDot(clampedIndex);
    }
  };

  const scrollToIndex = (index) => {
      if (galleryRef.current && galleryRef.current.firstChild) {
          const itemWidth = galleryRef.current.firstChild.offsetWidth;
          const gap = 20;
          const totalItemWidth = itemWidth + gap;
          
          galleryRef.current.scrollTo({
              left: index * totalItemWidth,
              behavior: 'smooth'
          });
          setActiveDot(index);
      }
  };


  const timelineData = [
    {
      id: 1,
      title: "EarlyMentions",
      description: "EarlyMentionsDesc",
      tags: ["Pre 6th c.", "Etymology"],
      image: "image yet to do",
      fullContent: "The history of Nellore begins in antiquity. Known as 'Vikrama Simhapuri' in ancient texts, the region has been a significant settlement since the Mauryan era. \n\n The name 'Nellore' is thought to be derived from 'Nelli' (Amla tree) and 'Ooru' (Village/Town). Archaeological findings suggest a thriving community with early trade links. It was a crucial part of the Dandakaranya forest mentioned in the Ramayana.",
    },
    {
      id: 2,
      title: "PallavaInfluence",
      description: "PallavaInfluenceDesc",
      tags: ["6th–9th c.", "Dynasty"],
      image: "image yet to do",
      fullContent: "From the 6th to the 9th century, Nellore flourished under the Pallava dynasty. This period saw the construction of several rock-cut temples and the expansion of agriculture through tank irrigation. \n\n The Pallavas established Nellore as a strategic northern outpost. The architectural style of this era laid the foundation for the Dravidian style that would evolve in later centuries.",
    },
    {
      id: 3,
      title: "CholaLinks",
      description: "CholaLinksDesc",
      tags: ["10th–12th c.", "Trade"],
      image: "image yet to do",
      fullContent: "The Cholas brought a golden age of administration and trade to Nellore. The region became a vital hub connecting the southern peninsula with northern kingdoms. \n\n Under rulers like Rajaraja Chola I, the Ranganatha Swamy Temple saw significant developments. Maritime trade flourished, with merchants from Nellore trading spices and textiles across the Bay of Bengal.",
    },
    {
      id: 4,
      title: "Vijayanagara",
      description: "VijayanagaraDesc",
      tags: ["14th–18th c.", "Polity"],
      image: "image yet to do",
      fullContent: "As part of the mighty Vijayanagara Empire, Nellore enjoyed stability and prosperity. The Udayagiri Fort was a key military stronghold during this period. \n\n The Rayas of Vijayanagara patronized arts and literature. Telugu literature, in particular, saw a renaissance. The region's strategic importance meant it was often the site of battles for control of the Andhra coast.",
    },
    {
      id: 5,
      title: "ColonialAdmin",
      description: "ColonialAdminDesc",
      tags: ["19th–20th c.", "Modernization"],
      image: "image yet to do",
      fullContent: "Under British rule, Nellore was constituted as a district in 1861. The colonial era brought distinct administrative shifts, railways, and western education. \n\n However, it was also a period of resistance. Nellore played a spirited role in the freedom struggle, with leaders like Potti Sreeramulu emerging from this soil. The district was known for its 'Satyagraha' movements.",
    },
    {
      id: 6,
      title: "PostIndep",
      description: "PostIndepDesc",
      tags: ["Since 1947", "Development"],
      image: "image yet to do",
      fullContent: "After Independence, Nellore became a part of the Madras State and later, the first district of the newly formed Andhra State in 1953. \n\n Today, it is a bustling hub of agriculture (known as the Rice Bowl of Andhra), aquaculture, and space research, home to the Satish Dhawan Space Centre at Sriharikota. It blends its rich cultural heritage with modern industrial growth.",
    },
  ];

  const quickFacts = [
    {
      icon: "bi-geo-alt",
      title: "Region",
      desc: "RegionDesc",
      tag: "Geo",
    },
    {
      icon: "bi-graph-up",
      title: "Economy",
      desc: "EconomyDesc",
      tag: "Data",
    },
    {
      icon: "bi-people",
      title: "Culture",
      desc: "CultureDesc",
      tag: "Heritage",
    },
  ];

  const recommendedReads = [
    {
      icon: "bi-file-earmark-pdf",
      title: "GazetteerExcerpts",
      desc: "GazetteerDesc",
      tag: "PDF",
    },
    {
      icon: "bi-book",
      title: "LocalChronicles",
      desc: "LocalChroniclesDesc",
      tag: "Book",
    },
  ];

  const landmarks = [
    {
      icon: "bi-building",
      title: "NarasimhaSwamyTemple",
      desc: "NarasimhaSwamyDesc",
      tag: "Temple",
    },
    {
      icon: "bi-bricks",
      title: "HistoricFortRemains",
      desc: "FortDesc",
      tag: "Fort",
    },
    {
      icon: "bi-water",
      title: "PennaRiverGhats",
      desc: "RiverDesc",
      tag: "River",
    },
    {
      icon: "bi-bank",
      title: "MuseumArchives",
      desc: "MuseumDesc",
      tag: "Archive",
    },
  ];

  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  const generateGuidePDF = () => {
    const doc = new jsPDF();
    
    // Cover Page
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(139, 69, 19); // SaddleBrown
    doc.text("Nellore History Guide", 105, 50, { align: "center" });
    
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("A Journey Through Time", 105, 65, { align: "center" });
    
    doc.setLineWidth(1);
    doc.line(20, 75, 190, 75);

    // Timelines
    let yPos = 90;
    doc.setFontSize(18);
    doc.setTextColor(139, 69, 19);
    doc.text("Historical Timeline", 20, yPos);
    yPos += 15;

    timelineData.forEach((item, index) => {
        // Page check
        if (yPos > 250) {
            doc.addPage();
            yPos = 30;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text(`${index + 1}. ${t(item.title) || item.title}`, 20, yPos);
        yPos += 8;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(80);
        doc.text(`Era: ${item.tags[0]}`, 20, yPos);
        yPos += 8;

        doc.setTextColor(0);
        doc.setFontSize(12);
        const fullText = item.fullContent || item.description || "";
        const cleanText = fullText.replace(/\n\n/g, " "); // Flatten for summary
        const splitContent = doc.splitTextToSize(cleanText, 170);
        doc.text(splitContent, 20, yPos);
        
        yPos += (splitContent.length * 7) + 15;
    });

    // Quick Facts
    doc.addPage();
    yPos = 30;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(139, 69, 19);
    doc.text("Quick Facts", 20, yPos);
    yPos += 15;

    quickFacts.forEach(fact => {
         doc.setFont("helvetica", "bold");
         doc.setFontSize(12);
         doc.setTextColor(0);
         doc.text(t(fact.title) || fact.title, 20, yPos);
         
         doc.setFont("helvetica", "normal");
         const desc = t(fact.desc) || fact.desc;
         doc.text(`- ${desc}`, 20, yPos + 6);
         
         yPos += 15;
    });
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(`Page ${i} of ${pageCount} - Nellorien Hub`, 105, 290, { align: "center" });
    }
    
    doc.save("Nellore_History_Guide.pdf");
  };

  return (
    <div className="history-page">
      <TopHeader />
      <MainHeader
        siteName={t('siteName') + ".IN"}
        tagline={t('tagline')}
      />
      <Navbar includeSearch={false} />

      <main className="history-page-main">
        {/* hero section */}
        <section className="history-hero">
          <div className="history-hero-content mr-2">
             <div className="history-title-wrapper">
                <i className="bi bi-hourglass-split history-icon"></i>
                <h1>{t('NelloreHistory')}</h1>
             </div>
            <p className="history-subtitle">
              {t('HistoryTagline')}
            </p>
          </div>
        </section>

        {/* Improved Image Gallery Section - Scrollable */}
        <section className="container-fluid mb-4">
           <div className="history-header-gallery">
              <div className="gallery-header text-center mb-4">
                 <h2 className="gallery-title">Gallery</h2>
              </div>
              
              <div 
                className="gallery-scroll-container" 
                ref={galleryRef}
                onScroll={handleScroll}
              >
                 {galleryImages.map((img, idx) => (
                     <div key={img.id + '-' + idx} className="gallery-card scroll-item">
                        <img src={img.src} alt={`History Gallery ${idx + 1}`} />
                     </div>
                 ))}
              </div>

              {/* Dots Navigation */}
              <div className="gallery-dots">
                 {galleryImages.map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`gallery-dot ${activeDot === idx ? 'active' : ''}`}
                      onClick={() => scrollToIndex(idx)}
                    ></span>
                 ))}
              </div>
           </div>
        </section>

        <div className="container-fluid">
          <div className="history-content-grid">
            {/* Left Column Wrapper */}
            <div className="history-main-column">
              {/* left side timeline section */}
              <div className="history-timeline-section">
                <div className="section-header">
                  <h3>{t('TimelineHighlights')}</h3>
                  <span className="badge-curated">{t('Curated')}</span>
                </div>

                <div className="timeline-list">
                  <div className="timeline-decoration text-center mb-3">
                    <i className="bi bi-three-dots-vertical text-primary fs-4"></i>
                  </div>

                  {timelineData.map((item) => (
                    <div 
                        key={item.id} 
                        className="timeline-card"
                        onClick={() => handleCardClick(item)}
                        style={{ cursor: "pointer" }}
                    >
                      <div className="timeline-img">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="timeline-info">
                        <h4>{t(item.title)}</h4>
                        <p>{t(item.description)}</p>
                        <div className="timeline-tags">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className={`tag ${
                                idx === 0 ? "tag-primary" : "tag-secondary"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Landmarks */}
              <div className="key-landmarks-section">
                <div className="landmarks-container">
                  <div className="section-header">
                    <h3>{t('KeyLandmarks')}</h3>
                    <button className="visit-btn">{t('Visit')}</button>
                  </div>
                  <div className="landmark-list">
                    {landmarks.map((landmark, idx) => (
                      <div key={idx} className="landmark-item">
                        <div className="landmark-icon">
                          <i className={`bi ${landmark.icon}`}></i>
                        </div>
                        <div className="landmark-details">
                          <h4>{t(landmark.title)}</h4>
                          <p>{t(landmark.desc)}</p>
                        </div>
                        <span className="landmark-tag">{landmark.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>



              {/* Latest News Section */}
              {/* <div className="history-news-section">
                <div className="section-header">
                  <h3>{t('LatestNews')}</h3>
                  <button
                    className="visit-btn"
                    onClick={() => navigate("/hub/news")}
                  >
                    {t('ViewAll')}
                  </button>
                </div>
                <div className="news-cards-container">
                  {(newsFeedArticles || []).slice(0, 2).map((article) => (
                    <article key={article.id} className="news-page-card">
                      <div className="news-page-card-image">
                        <img src={article.image} alt={article.title} />
                      </div>
                      <div className="news-page-card-body">
                        <h3 className="news-page-card-title">
                          {article.title}
                        </h3>
                        <p className="news-page-card-meta">
                          {t(article.categoryLabel)} · {article.time}
                        </p>
                        <button
                          className="news-page-card-btn"
                          onClick={() => navigate(`/hub/news/${article.id}`)}
                        >
                          {t('ReadFullArticle')}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div> */}
            </div>

            {/* right side sidebar */}
            <div className="history-sidebar">
              
              {/* Common Ads section */}
              <CommonAds />
            </div>
          </div>
        </div>
      </main>

      <Footer
        siteName={t('siteName') + ".IN"}
        tagline={t('FooterTagline')}
      />

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        {selectedItem && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{t(selectedItem.title)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-4">
                <div className="d-flex flex-wrap gap-2 text-muted mb-3">
                   {selectedItem.tags && selectedItem.tags.map((tag, idx) => (
                      <span key={idx} className="badge bg-light text-dark border me-1">
                        {tag}
                      </span>
                   ))}
                </div>
                <div className="text-center mb-3">
                     <img 
                        src={selectedItem.image} 
                        alt={selectedItem.title} 
                        style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }}
                     />
                </div>
              </div>

              <div className="history-full-content">
                 <h5 className="mb-3 text-brown" style={{ color: '#8B4513' }}>{t('HistoricalInsight') || 'Historical Insight'}</h5>
                 {selectedItem.fullContent ? (
                    selectedItem.fullContent.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-secondary" style={{ lineHeight: '1.6' }}>{paragraph}</p>
                    ))
                 ) : (
                   <p className="text-secondary">{t(selectedItem.description)}</p>
                 )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                {t('Close')}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default HistoryPage;
