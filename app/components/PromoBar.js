import React from 'react';

const PromoBar = () => {
  const promoMessage1 = 'boven de €45 gratis verzending';
  const promoMessage2 = 'gratis retourneren';
  const promoMessage3 = 'levering 1-2 werkdagen';

  return (
    <div className="header-disclaimer disclaimer-mobile" id="headerSlider">
      <div className="container">
        <div className="jcarousel header-slider">
          <ul className="promo-ul">
            <li><a href="/foo/bar"><span className="glyphicon glyphicon-ok" />  {promoMessage1}</a></li>
            <li><a href="/foo/bar"><span className="glyphicon glyphicon-ok" />  {promoMessage2}</a></li>
            <li><a href="/foor/bar"><span className="glyphicon glyphicon-ok" />  {promoMessage3}</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default PromoBar;
