import React from "react";
import {NavLink} from "react-router-dom";
import {HOME_PAGE} from "../utils/navigation/path";
import Watch from "./Watch";
import {connect} from "react-redux";
import {changeLanguage, fetchReviews} from "../store/reducers/mainSliсe";
class Header extends React.Component {
    static LOGO = 'https://i.pinimg.com/originals/f6/7a/3a/f67a3a261f0c952640f9c1d214d73e96.png'

    constructor(props) {
        super(props);
        this.state = {
            dropdownToggle: false
        }
    }

    toggleDropdownFunc = () => {
        this.setState(prevState => ({
            dropdownToggle: !prevState.dropdownToggle
        }))
    }
    handleChange = lang => {
        this.setState({dropdownToggle: false})
        this.props.changeLanguage(lang)
    }
    render() {
        const { langs, selected } = this.props
        const { dropdownToggle } = this.state
        return (
            <header className='header'>
                <div className="container">
                    <div className="header__wrapper">
                        <div className="header__logo">
                            <NavLink to={HOME_PAGE}>
                                <img src={Header.LOGO} alt="logotype"/>
                            </NavLink>
                        </div>
                        <div className="header__watch">
                            <Watch/>
                        </div>
                        <div className={`header-drop ${dropdownToggle && 'header-drop--active'}`}>
                            <p onClick={this.toggleDropdownFunc} className="header-drop__selected">{this.props.selected}</p>
                            <div className="header-drop__dropdown">
                                {this.props.langs.map(lang=>
                                    <p key={lang} onClick={()=>this.handleChange(lang)} className="header-drop__item">{lang}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        langs: state.main.lang,
        selected: state.main.selectedLang,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: (lang) => dispatch(changeLanguage(lang)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header)