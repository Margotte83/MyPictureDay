import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'

export default function Navbar() {
    return (
        <div>
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a
              className="navbar-brand col-sm-3 col-md-2 mr-0"
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              My Picture Day 2021
            </a>
            <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap d-none d-sm d-sm-block">
              </li>
            </ul>
          </nav>
          </div>
    )
}