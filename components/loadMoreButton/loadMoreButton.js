import PropTypes from "prop-types"

LoadMoreButton.propTypes = {
    fullWidth: PropTypes.bool
}

export default function LoadMoreButton(props) {
    const selectors = '#artists a.hidden, #songs div.hidden, #genres a.hidden, #genre div.hidden'

    return (
        <button className={`button yellow shadow-3xl ${props.fullWidth ? 'w-full' : ''}`}
                onClick={() => document.querySelectorAll(selectors)
                    .forEach((e, i) => i < 50 ? e.classList.remove('hidden') : '')}>
            <strong className="text-xl">Load more...</strong>
        </button>
    )
}
