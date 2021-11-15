import getAndViewBlob from "../../lib/getAndViewBlob"

export default function About() {

    return (
        <div id='about'>
            <h1>About</h1>
            <p>Rockstars IT is a statically generated version of the <a href="https://www.teamrockstars.nl" target="_blank" rel="noreferrer">Team Rockstars IT</a>
                &nbsp;<a href="#" onClick={() => getAndViewBlob('/assets/Tech case.pdf')}>Front-End Tech Case</a>.
                This application is built using the Next.js web framework and TailwindCss with JIT  mode for styling!
                < br/>
                < br/>
                Using this website you can browse different Artists, their songs and Genres with data originating from
                a local JSON file which is served during build time for consumption by the Next.js framework to facilitate
                static rendering capabilities. Thanks to the static nature of the website all pages are rendered at build time,
                served from a global CDN and cached using a service worker also supporting Progressive Web Application functionalities
                like caching and offline fallback support.
            </p>
            < br/>
            <h2>Read more!</h2>
            Read more about this and other projects on my personal portfolio website at <a href="https://www.jwvbremen.nl/rockstars" target="_blank" rel="noreferrer">jwvbremen.nl</a>.
            <style jsx>{`
                    #about a {
                        font-weight: bold;
                    }
                `}</style>
        </div>
    )
}
