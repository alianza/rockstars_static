import React from "react"

export default function SOrNot(props) {
    return <span>{props.arrayLength !== 1 && "s"}{props.arrayLength !== 0 && props.withColon && ":"}</span>
}
