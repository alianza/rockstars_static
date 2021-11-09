export default function LoadMoreButton(props) {
    return (
        <button className={`button inverted shadow-3xl ${props.fullWidth ? 'w-full' : ''}`}
                onClick={() => document.querySelectorAll('#artistCard.hidden, #songCard.hidden').forEach((e, i) => i < 50 ? e.classList.remove('hidden') : '')}>
            <b>Load more...</b>
        </button>
    )
}
