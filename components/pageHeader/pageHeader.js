import styles from "../../styles/sharedModules/page.module.scss"
import * as PropTypes from "prop-types"
import React from "react"

export default function PageHeader(props) {
  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <h1>{props.title}</h1>
        <button className={`button ${styles.sortButton}`} onClick={props.onSortButtonClick}>Sort ⇕</button>
      </div>
      <input className={styles.searchButton} placeholder={props.searchPlaceholder} onChange={props.onSearchValueChange}/>
    </div>)
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
  onSortButtonClick: PropTypes.func,
  onSearchValueChange: PropTypes.func
}
