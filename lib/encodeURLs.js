export default function encodeURICustom(url) {
    return encodeURIComponent(url).replace('%26', '&')
}
