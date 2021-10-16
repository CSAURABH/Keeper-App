import React from 'react'

export const Footer = () => {

    const currentYear = new Date().getFullYear()
    return (
        <footer>
            <p>
                Made with <span style={{color: '#ffa500'}}>&hearts;</span> by <a href="https://github.com/CSAURABH">@CSAURABH</a>
            </p>
            
            <p>
                Copyright © {currentYear}. All rights reserved.
            </p>
        </footer>
    )
}
