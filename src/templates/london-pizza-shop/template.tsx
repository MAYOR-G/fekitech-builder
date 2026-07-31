import React from 'react';
import './index.css';

interface LondonPizzaShopTemplateProps {
  data: any;
}

export default function LondonPizzaShopTemplate({ data }: LondonPizzaShopTemplateProps) {
  return (
    <div className="london-pizza-shop" data-template-id="london-pizza-shop">
      <header className="pizza-header">
        <div className="pizza-header-inner">
          <div className="pizza-logo">
            DON PEPPE <br/><span className="pizza-phone">{data.nav?.phone}</span>
          </div>
          <nav className="pizza-nav">
            {data.nav?.links?.map((link: any, index: number) => (
              <a key={index} href={link.href}>{link.label}</a>
            ))}
          </nav>
          <div className="pizza-cart">
            <span className="cart-icon">🛒</span> {data.nav?.cartText}
          </div>
        </div>
      </header>

      <section className="pizza-hero">
        <div className="pizza-hero-bg-text">
          {data.hero?.backgroundText}
        </div>
        <div className="pizza-hero-content">
          <p className="pizza-hero-subtitle">{data.hero?.subtitle}</p>
        </div>
        
        <div className="pizza-hero-image-wrapper">
          <div className="pizza-hero-badge">{data.hero?.badgeText}</div>
          <img src={data.hero?.pizzaImage} alt="Delicious Pizza" className="pizza-hero-img" />
          <div className="pizza-hero-cross-text">
            <span className="text-pizza-time">
              PIZZA TIME
              <svg width="1em" height="1em" viewBox="0 0 24 24" fill="var(--primary-color)" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: '20px', filter: 'drop-shadow(2px 2px 0px #000)'}}>
                <path d="M12 2.5C7 2.5 2.5 5 2.5 5L12 21.5L21.5 5C21.5 5 17 2.5 12 2.5Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="14" r="1.5" fill="#fff"/>
                <circle cx="14" cy="9" r="1.5" fill="#fff"/>
                <circle cx="9" cy="8" r="1.5" fill="#fff"/>
                <circle cx="9" cy="11" r="1" fill="#fff"/>
                <circle cx="15" cy="13" r="1" fill="#fff"/>
              </svg>
            </span>
          </div>
        </div>
      </section>

      <section className="pizza-banners">
        <div className="pizza-container">
          <div className="pizza-banners-grid">
            <div className="pizza-banner-kids">
              <div className="kids-content">
                <h2>{data.banners?.kidsMenu?.title}</h2>
                <p>{data.banners?.kidsMenu?.subtitle}</p>
              </div>
              <img src={data.banners?.kidsMenu?.image} alt="Kids Pizza" />
              <div className="kids-price">{data.banners?.kidsMenu?.price}</div>
            </div>
            
            <div className="pizza-banner-small-grid">
              <img src={data.gallery[0]} alt="Gallery" className="banner-small-img" />
              <img src={data.gallery[1]} alt="Gallery" className="banner-small-img" />
            </div>
            
            <div className="pizza-banner-location">
              <h2>{data.banners?.location?.title}</h2>
              <div className="location-input-group">
                <input type="text" placeholder="ZIP CODE" />
                <button>{data.banners?.location?.button}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pizza-menu">
        <div className="pizza-container">
          <div className="pizza-menu-header">
            <p className="pizza-menu-subtitle">{data.menu?.subtitle}</p>
            <h2 className="pizza-menu-title">{data.menu?.title}</h2>
            <p className="pizza-menu-description">{data.menu?.description}</p>
          </div>
          
          <div className="pizza-menu-grid">
            {data.menu?.items?.map((item: any, i: number) => (
              <div className="pizza-menu-item" key={i}>
                <div className="pizza-menu-item-img-wrap">
                  {item.badge && <div className={`pizza-badge ${item.badge === 'NEW' ? 'badge-new' : ''}`}>{item.badge}</div>}
                  <img src={item.image} alt={item.name} />
                </div>
                <h3>{item.name}</h3>
                <div className="pizza-price-wrap">
                  {item.oldPrice && <span className="pizza-old-price">{item.oldPrice}</span>}
                  <span className="pizza-price">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pizza-of-the-day" style={{ backgroundImage: `url(${data.pizzaOfDay?.image})` }}>
        <div className="pizza-container">
          <div className="pizza-day-content">
            <h2>{data.pizzaOfDay?.title}</h2>
            <p>{data.pizzaOfDay?.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="pizza-slice-box">
        <div className="pizza-container">
          <div className="slice-box-inner">
            <div className="slice-box-text">
              <span className="slice-subtitle">FOR SLICE BOX</span>
              <h2>{data.sliceBox?.title}</h2>
              <p>{data.sliceBox?.description}</p>
              <div className="slice-diagram">
                {/* Simplified diagram shapes */}
                <div className="diagram-box"></div>
                <div className="diagram-box"></div>
                <div className="diagram-box"></div>
              </div>
            </div>
            <div className="slice-box-image">
              <div className="realistic-pizza-box">
                 <div className="box-bottom"></div>
                 <div className="box-front"></div>
                 <div className="box-side"></div>
                 <div className="box-top">
                   <div className="box-logo">
                     <h3>DON PEPPE</h3>
                     <p>PIZZA SHOP</p>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pizza-quote">
        <div className="pizza-container">
          <div className="quote-icon">“</div>
          <blockquote>{data.quote?.text}</blockquote>
          <cite>{data.quote?.author}</cite>
        </div>
      </section>

      <section className="pizza-gallery">
        {data.gallery?.map((img: string, i: number) => (
          <div className="gallery-item" key={i}>
            <img src={img} alt={`Gallery ${i}`} />
          </div>
        ))}
      </section>

      <footer className="pizza-footer">
        <div className="pizza-footer-image-layer" style={{ backgroundImage: `url(${data.footer?.backgroundImage})` }}></div>
        <div className="pizza-footer-content-layer">
          <div className="pizza-container">
            <div className="pizza-footer-grid">
            <div className="footer-col">
              <h4>{data.footer?.brandInfo?.title}</h4>
              <p>{data.footer?.brandInfo?.address}</p>
              <p>{data.footer?.brandInfo?.phone}</p>
              <p>{data.footer?.brandInfo?.email}</p>
            </div>
            <div className="footer-col">
              <h4>{data.footer?.workingHours?.title}</h4>
              <p>MONDAY - FRIDAY<br/>{data.footer?.workingHours?.mondayToFriday}</p>
              <p>SATURDAY<br/>{data.footer?.workingHours?.saturday}</p>
              <p>SUNDAY<br/>{data.footer?.workingHours?.sunday}</p>
            </div>
            <div className="footer-col">
              <h3>{data.footer?.about?.text}</h3>
            </div>
            <div className="footer-col footer-logo-col">
              <div className="footer-seal">
                PIZZA SLICE IN NAPLES
              </div>
            </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
