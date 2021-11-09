export default function LoadMoreButton(props) {
    return (
        <button className={`button yellow shadow-3xl ${props.fullWidth ? 'w-full' : ''}`}
                onClick={() => document.querySelectorAll('#artists a.hidden, #songs div.hidden, #genres a.hidden')
                    .forEach((e, i) => i < 50 ? e.classList.remove('hidden') : '')}>
            <strong className="text-xl">Load more...</strong>
        </button>
    )
}
