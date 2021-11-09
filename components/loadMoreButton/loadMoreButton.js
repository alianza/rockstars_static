import PropTypes from "prop-types"

LoadMoreButton.propTypes = {
    fullWidth: PropTypes.bool,
    amount: PropTypes.number
}

export default function LoadMoreButton(props) {
    const selectors = '#artists a.hidden, #songs div.hidden, #genres a.hidden, #genre div.hidden'

    const loadMore = () => {
        document.querySelectorAll(selectors).forEach((e, i) => {
            i < (props?.amount || 50) ? e.classList.remove('hidden') : ''
        })

        if (!document.querySelectorAll(selectors).length) { document.querySelector('#loadMore').remove() }
    }

    return (
        <button id="loadMore" className={`button yellow shadow-3xl ${props.fullWidth ? 'w-full' : ''}`}
                onClick={() => loadMore()}>
            <strong className="text-xl">Load more...</strong>
        </button>
    )
}
