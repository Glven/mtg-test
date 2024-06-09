import React from "react";

class Review extends React.Component {
    constructor(props) {
        super(props);
    }
    formattedNameFunc = name => {
        const arr = name.split(' ')
        if (arr.length > 1) {
            arr[1] = arr[1][0] + '.'
        }
        if (arr.length > 2) arr.pop()
        return arr.join(' ')
    }
    render() {
        const {review} = this.props
        return (
            <div className="review">
                <div className="review-top">
                    <p className="review-top__name">
                        {this.formattedNameFunc(review.name)}
                    </p>
                    <p className="review-top__date">
                        {review.date}
                    </p>
                </div>
                <p className="review__text">
                    {review.review}
                </p>
            </div>
        )
    }
}


export default Review