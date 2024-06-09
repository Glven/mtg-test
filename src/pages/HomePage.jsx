import React from "react";
import {fetchReviews, setPage} from "../store/reducers/mainSliсe";
import {connect} from "react-redux";
import Review from "../components/Review";
import Pagination from "../components/Pagination";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchReviews()
    }

    render() {
        const {
            reviews,
            currentReviews,
        } = this.props
        if (!reviews) {
            return <div className='loading'>Загрузка</div>
        }
        return (
            <section className="reviews">
                <div className="container">
                    <div className="reviews__wrapper">
                        {currentReviews.map((review, index)=>
                            <Review key={index} review={review} />
                        )}
                    </div>
                    <Pagination/>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        reviews: state.main.reviews,
        currentReviews: state.main.currentReviews,
    }
}

const mapDispatchProps = dispatch => {
    return {
        fetchReviews: () => dispatch(fetchReviews())
    }
}

export default connect(mapStateToProps, mapDispatchProps)(HomePage)