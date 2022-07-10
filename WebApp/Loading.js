import React from 'react'
import loading from '../loading.gif'
import styles from '../styles/loading.module.css'

function Loading() {


  return (
    <div className={styles.loadingDiv}>
        <img src={loading} alt="Loading.." />
    </div>
  )
}

export default Loading