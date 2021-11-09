import React from "react"
import PropTypes from "prop-types"

SOrNot.propTypes = {
    arrayLength: PropTypes.number,
    withColon: PropTypes.bool,
}

export default function SOrNot(props) {
    return <span>{props.arrayLength !== 1 && "s"}{props.arrayLength !== 0 && props.withColon && ":"}</span>
}
