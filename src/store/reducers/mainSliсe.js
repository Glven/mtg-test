import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchReviews = createAsyncThunk(
    'main/fetchReviews',
    async (payload, thunkAPI) => {
        try {
            const response = await fetch('/data/data.json')
            const data = await response.json()
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

const mainSlice = createSlice({
    name: 'main',
    initialState: {
        lang: ['ru', 'en'],
        selectedLang: 'ru',
        reviews: null,
        currentReviews: null,
        countReviewsOnPage: 10,
        totalPage: [],
        currentPage: 1,
    },
    reducers: {
        changeLanguage(state, action){
            state.selectedLang = action.payload
            const lastReview = state.currentPage * state.countReviewsOnPage
            const firstReview = lastReview - state.countReviewsOnPage
            state.currentReviews = state.reviews[state.selectedLang].slice(firstReview, lastReview)
        },
        setPage(state, action){
            const { pageValue } = action.payload
            console.log(pageValue)
            switch (pageValue) {
                case 'NEXT': {
                    if (state.currentPage < Math.max(...state.totalPage)) state.currentPage++
                    break
                }
                case 'PREV': {
                    if (state.currentPage > 1) state.currentPage--
                    break
                }
                case 'FIRST': {
                    state.currentPage = 1
                    break
                }
                case 'LAST': {
                    state.currentPage = Math.max(...state.totalPage)
                    break
                }
                default: {
                    state.currentPage = +pageValue
                    break
                }
            }
            const lastReview = state.currentPage * state.countReviewsOnPage
            const firstReview = lastReview - state.countReviewsOnPage
            state.currentReviews = state.reviews[state.selectedLang].slice(firstReview, lastReview)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchReviews.fulfilled, (state, action) => {
            const reviews = {}
            for (const lang in action.payload) {
                reviews[lang] = Object.values(action.payload[lang])
            }
            state.reviews = reviews
            state.currentReviews = reviews[state.selectedLang].length > 10 ?
                reviews[state.selectedLang].slice(0, state.countReviewsOnPage) :
                reviews[state.selectedLang]
            for (let i = 1; i <= Math.ceil(reviews[state.selectedLang].length / state.countReviewsOnPage); i++) {
                state.totalPage.push(i)
            }
        })
    }
})
export const {
    changeLanguage,
    setPage
} = mainSlice.actions
export default mainSlice.reducer