import React from "react";
import {fetchReviews, setPage} from "../store/reducers/mainSliсe";
import {connect} from "react-redux";

class Pagination extends React.Component {
    handleSetPage = pageValue => {
        this.props.setPage({pageValue})
    }
    render() {
        const { totalPage, currentPage } = this.props
        return (
            <div className="pagination">
                {currentPage !== 1 &&
                    <>
                        <button onClick={()=>this.handleSetPage('FIRST')} className="pagination__item">&laquo;</button>
                        <button onClick={()=>this.handleSetPage('PREV')} className="pagination__item">&lsaquo;</button>
                    </>
                }
                {totalPage.map(page =>
                    <button
                        key={page}
                        onClick={()=>this.handleSetPage(page.toString())}
                        className={`pagination__item ${page === currentPage && 'pagination__item--active'}`}>
                            {page}
                    </button>
                )}
                {currentPage !== Math.max(...totalPage) &&
                    <>
                        <button onClick={()=>this.handleSetPage('NEXT')} className="pagination__item">&rsaquo;</button>
                        <button onClick={()=>this.handleSetPage('LAST')} className="pagination__item">&raquo;</button>
                    </>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        totalPage: state.main.totalPage,
        currentPage: state.main.currentPage
    }
}
const mapDispatchProps = dispatch => {
    return {
        setPage: (pageValue) => dispatch(setPage(pageValue))
    }
}
export default connect(mapStateToProps, mapDispatchProps)(Pagination)