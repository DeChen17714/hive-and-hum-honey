import React, { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Check,
  CheckCircle,
  Clock,
  List,
  MapPin,
  Stack,
  WarningCircle,
  X,
} from '@phosphor-icons/react';

const assetUrl = (assetName) => `${import.meta.env.BASE_URL}assets/${assetName}`;


export const FLAVORS = [
  {
    id: 'lavender',
    name: 'Wild Lavender',
    tabLabel: 'Lavender',
    origin: 'Maritime Alps, France',
    apiary: 'Apiary No. 04',
    elevation: '1,150m',
    tastingNotes: 'Candied lavender, wild thyme, soft vanilla cream',
    pairings: 'Fresh chèvre, warm brioche, Earl Grey',
    texture: 'Silky and translucent',
    intensity: 2,
    asset: 'flavor-lavender.webp',
    color: '#e4f15a',
  },
  {
    id: 'heather',
    name: 'Highland Heather',
    tabLabel: 'Heather',
    origin: 'Scottish Moorlands',
    apiary: 'Apiary No. 09',
    elevation: '850m',
    tastingNotes: 'Toasted caramel, heather, malty depth',
    pairings: 'Aged cheddar, dark roast, oatmeal scones',
    texture: 'Rich and spreadable',
    intensity: 5,
    asset: 'flavor-heather.webp',
    color: '#ff794d',
  },
  {
    id: 'citrus',
    name: 'Citrus Blossom',
    tabLabel: 'Citrus',
    origin: 'Valencia Sun Groves, Spain',
    apiary: 'Apiary No. 12',
    elevation: '420m',
    tastingNotes: 'Tangerine zest, jasmine, crisp lemon',
    pairings: 'Greek yogurt, ricotta, mint water',
    texture: 'Light and luminous',
    intensity: 3,
    asset: 'flavor-citrus.webp',
    color: '#ffca3a',
  },
  {
    id: 'meadow',
    name: 'Raw Meadow',
    tabLabel: 'Meadow',
    origin: 'Cotswold Valleys, UK',
    apiary: 'Apiary No. 01',
    elevation: '320m',
    tastingNotes: 'White clover, dandelion, meadow herbs',
    pairings: 'Sourdough, salted butter, chamomile tea',
    texture: 'Velvety and creamy',
    intensity: 3,
    asset: 'flavor-meadow.webp',
    color: '#a9d94a',
  },
  {
    id: 'forest',
    name: 'Dark Forest',
    tabLabel: 'Forest',
    origin: 'Black Forest Canopies, Germany',
    apiary: 'Apiary No. 17',
    elevation: '980m',
    tastingNotes: 'Pine sap, dark treacle, mineral complexity',
    pairings: 'Blue cheese, walnut bread, smoked meats',
    texture: 'Dense and slow-dripping',
    intensity: 5,
    asset: 'flavor-forest.webp',
    color: '#8fd3c7',
  },
];

function ButtonArrow() {
  return <ArrowRight size={18} weight="bold" aria-hidden="true" />;
}


export default function App() {
  const [selectedFlavorId, setSelectedFlavorId] = useState('lavender');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('idle');
  const [newsletterFeedback, setNewsletterFeedback] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener?.('change', handleChange);
    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, []);

  const currentFlavor = FLAVORS.find(({ id }) => id === selectedFlavorId) || FLAVORS[0];

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    const email = newsletterEmail.trim();
    if (!email) {
      setNewsletterStatus('error');
      setNewsletterFeedback('Please enter your email address to receive harvest notes.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterStatus('error');
      setNewsletterFeedback('Please enter a valid email address, for example name@domain.com.');
      return;
    }
    setNewsletterStatus('success');
    setNewsletterFeedback('Welcome to the hive. Your first rhythm note is on its way.');
    setNewsletterEmail('');
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="site-wrapper" style={{ '--honeycomb-pattern': `url(${assetUrl('honeycomb-pattern.svg')})` }}>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header className="site-header">
        <div className="container nav-content">
          <a href="#hero" className="brand-logo" aria-label="HIVE & HUM Home">
            <img src={assetUrl('mascot-pip.svg')} alt="" aria-hidden="true" className="brand-mascot-icon" />
            <span>HIVE <b>&amp;</b> HUM</span>
          </a>
          <nav className="site-nav" aria-label="Main navigation">
            <a href="#origin">The source</a>
            <a href="#flavors">Flavor guide</a>
            <a href="#anatomy">The jar</a>
            <a href="#process">Our rhythm</a>
          </nav>
          <div className="nav-actions">
            <a href="#flavors" className="button button-amber button-small">Explore jars <ButtonArrow /></a>
            <button
              type="button"
              className="mobile-toggle"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? <X size={24} weight="bold" aria-hidden="true" /> : <List size={24} weight="bold" aria-hidden="true" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer" role="dialog" aria-label="Mobile menu">
            <a href="#origin" onClick={closeMobileMenu}>The source</a>
            <a href="#flavors" onClick={closeMobileMenu}>Flavor guide</a>
            <a href="#anatomy" onClick={closeMobileMenu}>The jar</a>
            <a href="#process" onClick={closeMobileMenu}>Our rhythm</a>
            <a href="#newsletter" onClick={closeMobileMenu}>The Hum Letter</a>
            <a href="#flavors" className="button button-amber" onClick={closeMobileMenu}>Explore jars <ButtonArrow /></a>
          </div>
        )}
      </header>

      <main id="main-content">
        <section id="hero" className="hero-chapter" aria-labelledby="hero-title">
          <div className="hero-grain" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy reveal-on-load">
              <p className="chapter-kicker"><span className="kicker-mark">01</span> A field guide to better honey</p>
              <h1 id="hero-title">Taste the{' '}<br /><em>place.</em></h1>
              <p className="hero-intro">Raw single-origin honey with a point of view. Every jar keeps the accent of the flowers, weather, and bees that made it.</p>
              <div className="hero-actions">
                <a href="#flavors" className="button button-amber">Find your flavor <ButtonArrow /></a>
                <a href="#origin" className="text-link text-link-light">Meet the keepers <ArrowDown size={17} weight="bold" aria-hidden="true" /></a>
              </div>
              <div className="hero-stamp" aria-label="Product qualities">
                <span>Single<br />origin</span>
                <span>Never<br />heated</span>
                <span>Seasonal<br />only</span>
              </div>
            </div>
            <div className="hero-media-wrap reveal-on-load reveal-delay-1">
              <div className="hero-media-frame">
                <video
                  className="hero-media"
                  poster={assetUrl('hero-editorial.webp')}
                  autoPlay={!prefersReducedMotion}
                  muted
                  loop
                  playsInline
                  aria-label="Amber honey flowing from a dipper into a HIVE and HUM jar at golden hour"
                >
                  <source src={assetUrl('hero-loop.mp4')} type="video/mp4" />
                  <img src={assetUrl('hero-editorial.webp')} alt="Amber honey flowing from a dipper into a HIVE and HUM jar at golden hour" />
                </video>
                <div className="media-corner media-corner-top">Est. in the wild</div>
              </div>
              <div className="hero-media-note"><MapPin size={15} weight="fill" aria-hidden="true" /> Alpine foothills, 1,150m</div>
            </div>
          </div>
          <div className="hero-edge-label" aria-hidden="true">HIVE / HUM / RAW / ALIVE</div>
        </section>

        <section className="manifesto-band" aria-label="Brand promise">
          <div className="manifesto-inner container">
            <span>Honey should taste like somewhere</span>
            <span className="manifesto-dot">✳</span>
            <span>Not like a factory</span>
            <span className="manifesto-dot">✳</span>
            <span>Honey should taste like somewhere</span>
          </div>
        </section>

        <section id="origin" className="origin-chapter" aria-labelledby="origin-heading">
          <div className="container origin-layout">
            <div className="origin-image reveal-on-scroll">
              <img src={assetUrl('apiary-editorial.webp')} alt="A weathered beehive in a wildflower meadow beneath distant hills" loading="lazy" decoding="async" />
              <div className="origin-image-label"><span>Field note 04</span><span>Maritime Alps</span></div>
            </div>
            <div className="origin-copy reveal-on-scroll reveal-delay-1">
              <p className="chapter-kicker"><span className="kicker-mark">02</span> The source</p>
              <h2 id="origin-heading">The valley is<br /><span>in the jar.</span></h2>
              <p className="origin-lead">Industrial honey smooths every landscape into the same sweet note. We keep the rough edges.</p>
              <p>We work with small apiaries where bees forage through protected meadows, moorlands, and forest canopies. Harvests stay separate, seasonal, and close to the hive.</p>
              <a href="#process" className="text-link">See how it stays raw <ButtonArrow /></a>
              <div className="origin-signature"><span className="signature-line" /> <span>The keepers of good honey</span></div>
            </div>
          </div>
        </section>

        <section id="flavors" className="flavor-chapter" aria-labelledby="flavor-heading">
          <div className="container">
            <div className="flavor-heading-row reveal-on-scroll">
              <div>
                <p className="chapter-kicker chapter-kicker-dark"><span className="kicker-mark">03</span> The flavor guide</p>
                <h2 id="flavor-heading">Choose your<br /><em>frequency.</em></h2>
              </div>
              <p className="flavor-heading-note">Five landscapes.<br />Five distinct moods.</p>
            </div>
            <div className="flavor-tabs" role="tablist" aria-label="Honey flavor varietals">
              {FLAVORS.map((flavor) => (
                <button
                  key={flavor.id}
                  type="button"
                  role="tab"
                  id={`flavor-tab-${flavor.id}`}
                  aria-controls={`flavor-panel-${flavor.id}`}
                  aria-selected={flavor.id === currentFlavor.id}
                  className={`flavor-tab ${flavor.id === currentFlavor.id ? 'active' : ''}`}
                  style={{ '--flavor-color': flavor.color }}
                  onClick={() => setSelectedFlavorId(flavor.id)}
                >
                  <span className="flavor-tab-dot" aria-hidden="true" />{flavor.tabLabel}
                </button>
              ))}
            </div>
            <div
              id={`flavor-panel-${currentFlavor.id}`}
              className="flavor-panel"
              role="tabpanel"
              aria-labelledby={`flavor-tab-${currentFlavor.id}`}
              style={{ '--flavor-color': currentFlavor.color }}
            >
              <div className="flavor-photo">
                <img src={assetUrl(currentFlavor.asset)} alt={`HIVE & HUM ${currentFlavor.name} honey jar in a wildflower setting`} loading="lazy" decoding="async" />
                <div className="flavor-photo-caption">{currentFlavor.apiary} / {currentFlavor.elevation}</div>
              </div>
              <div className="flavor-details">
                <div className="flavor-details-top"><span>{currentFlavor.apiary}</span><span>{currentFlavor.elevation}</span></div>
                <h3 className="flavor-title">{currentFlavor.name}</h3>
                <p className="flavor-origin"><MapPin size={15} weight="fill" aria-hidden="true" /> {currentFlavor.origin}</p>
                <div className="flavor-notes-grid">
                  <div><span>Notes</span><p>{currentFlavor.tastingNotes}</p></div>
                  <div><span>Texture</span><p>{currentFlavor.texture}</p></div>
                  <div><span>With</span><p>{currentFlavor.pairings}</p></div>
                </div>
                <div className="intensity-row"><span>Intensity</span><div className="intensity-meter" aria-label={`Intensity ${currentFlavor.intensity} out of 5`}>{[1, 2, 3, 4, 5].map((level) => <i key={level} className={level <= currentFlavor.intensity ? 'filled' : ''} aria-hidden="true" />)}</div><strong>{currentFlavor.intensity}/5</strong></div>
                <a href="#newsletter" className="button button-dark">Get harvest notes <ButtonArrow /></a>
              </div>
            </div>
          </div>
        </section>

        <section id="anatomy" className="anatomy-chapter" aria-labelledby="anatomy-heading">
          <div className="container anatomy-layout">
            <div className="anatomy-copy reveal-on-scroll">
              <p className="chapter-kicker"><span className="kicker-mark">04</span> The vessel</p>
              <h2 id="anatomy-heading">Good things<br /><span>show their work.</span></h2>
              <p>Our jar is deliberately clear. See the crystals, the pollen, and the color of a real harvest. Nothing to hide behind a glossy label.</p>
              <div className="anatomy-callouts">
                <div><Stack size={20} weight="bold" aria-hidden="true" /><span>Small-batch<br />numbered glass</span></div>
                <div><CheckCircle size={20} weight="bold" aria-hidden="true" /><span>Unfiltered<br />and unheated</span></div>
                <div><Clock size={20} weight="bold" aria-hidden="true" /><span>Made for<br />slow mornings</span></div>
              </div>
            </div>
            <div className="anatomy-object reveal-on-scroll reveal-delay-1">
              <img src={assetUrl('jar-detail.webp')} alt="HIVE & HUM honey jar glowing in warm amber light" loading="lazy" decoding="async" />
              <span className="object-tag object-tag-one">01 / Clear glass</span>
              <span className="object-tag object-tag-two">02 / Living color</span>
            </div>
          </div>
        </section>

        <section id="process" className="process-chapter" aria-labelledby="process-heading">
          <div className="container">
            <div className="process-heading reveal-on-scroll">
              <p className="chapter-kicker chapter-kicker-dark"><span className="kicker-mark">05</span> Our rhythm</p>
              <h2 id="process-heading">From bloom<br />to <em>hum.</em></h2>
              <p>Four decisions that keep the work close to the hive.</p>
            </div>
            <div className="process-list">
              <article><span>01</span><div><h3>Dawn foraging</h3><p>Bees gather from a protected radius while the flowers are still cool.</p></div><ArrowRight size={20} weight="bold" aria-hidden="true" /></article>
              <article><span>02</span><div><h3>Mindful harvest</h3><p>We take only capped surplus, leaving the colony its winter stores.</p></div><ArrowRight size={20} weight="bold" aria-hidden="true" /></article>
              <article><span>03</span><div><h3>Cold spin</h3><p>Honey flows at hive temperature, keeping its natural texture intact.</p></div><ArrowRight size={20} weight="bold" aria-hidden="true" /></article>
              <article><span>04</span><div><h3>Source batching</h3><p>Every jar is numbered by hand, then rests before it leaves the valley.</p></div><Check size={20} weight="bold" aria-hidden="true" /></article>
            </div>
          </div>
        </section>

        <section id="newsletter" className="newsletter-chapter" aria-labelledby="newsletter-heading">
          <div className="container newsletter-layout">
            <div className="newsletter-copy"><p className="chapter-kicker chapter-kicker-dark"><span className="kicker-mark">06</span> The Hum Letter</p><h2 id="newsletter-heading">Keep a little<br /><em>wildness.</em></h2></div>
            <div className="newsletter-form-box"><p>Seasonal harvests, keeper notes, and no noisy inbox energy.</p><form onSubmit={handleNewsletterSubmit} noValidate aria-label="Subscribe to The Hum Letter"><label htmlFor="newsletter-email-input" className="visually-hidden">Email Address</label><div className="newsletter-form"><input id="newsletter-email-input" type="email" placeholder="Your email address" value={newsletterEmail} onChange={(event) => { setNewsletterEmail(event.target.value); if (newsletterStatus === 'error') { setNewsletterStatus('idle'); setNewsletterFeedback(''); } }} aria-invalid={newsletterStatus === 'error'} aria-describedby="newsletter-feedback" className={`newsletter-input ${newsletterStatus === 'error' ? 'error' : ''}`} /><button type="submit" className="button button-dark">Subscribe <ButtonArrow /></button></div></form><div id="newsletter-feedback" role="status" aria-live="polite" className={`form-feedback ${newsletterStatus}`}>{newsletterStatus === 'error' && <><WarningCircle size={17} weight="bold" aria-hidden="true" /><span>{newsletterFeedback}</span></>}{newsletterStatus === 'success' && <><Check size={17} weight="bold" aria-hidden="true" /><span>{newsletterFeedback}</span></>}</div></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <a href="#hero" className="footer-brand"><img src={assetUrl('mascot-pip.svg')} alt="" aria-hidden="true" /><span>HIVE <b>&amp;</b> HUM</span></a>
          <p>Raw, seasonal honey for people who like their sweetness with a sense of place.</p>
          <div className="footer-links"><a href="#origin">Source</a><a href="#flavors">Flavors</a><a href="#newsletter">The Hum Letter</a></div>
          <small>© 2026 HIVE &amp; HUM. Fictional concept brand.</small>
        </div>
      </footer>
    </div>
  );
}
