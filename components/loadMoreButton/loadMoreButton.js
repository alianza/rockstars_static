import PropTypes from "prop-types"

LoadMoreButton.propTypes = {
    loadMore: PropTypes.func.isRequired,
    fullWidth: PropTypes.bool,
}

export default function LoadMoreButton({loadMore, fullWidth}) {
    return (
        <button id="loadMore" className={`button yellow shadow-3xl ${fullWidth ? 'w-full' : ''}`}
                onClick={e => loadMore(e)}>
            <strong className="text-xl">Load more...</strong>
        </button>
    )
}
