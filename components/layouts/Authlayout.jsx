import React from 'react'
import Styles from "./styles/auth.module.scss"

function Authlayout({ children }) {
    return (
        <div className={Styles.authWrapper}>
            <div className={Styles.banner}></div>
            <div className={Styles.formField}>{children}</div>
        </div>
    )
}

export default Authlayout
