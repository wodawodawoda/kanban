import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import './Header.sass';

export function Header(props) {
  const languageNodes = props.intl.enabledLanguages.map(
    lang => <button key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? 'selected' : ''}>{lang}</button>
  );

  return (
    <header className="app__top-header top-header">
      <nav className="top-header__navigation">
        <div className="top-header__links">
          <Link className="top-header__link" to="/" activeClassName="active-link">Kanban</Link>
        </div>
        <div className="top-header__languages">
          <FormattedMessage id="switchLanguage" />
          {languageNodes}
        </div>
      </nav>
    </header>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default Header;
