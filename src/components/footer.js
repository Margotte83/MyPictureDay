import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'

export default function Footer() {

    return (
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div class="col-md-4 d-flex align-items-center">
        <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          
        </a>
        <span class="text-muted">© 2021 MyPictureDay dApp, make with ❤️ by <a href="https://margotte83.github.io/marjorie-dev/" rel="noreferrer" target="_blank">
    Marjorie N.
          </a></span>
      </div>
  
      <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="ms-3"><a class="text-muted" href="https://www.linkedin.com/in/marjorie-ngoupende-dev/"><i class="fab fa-linkedin"></i></a></li>
        <li class="ms-3"><a class="text-muted" href="https://github.com/Margotte83"><i class="fab fa-github-square"></i></a></li>
        <li class="ms-3"><a class="text-muted" href="https://www.instagram.com/margotte.83/"><i class="fab fa-instagram-square"></i></a></li>
      </ul>
    </footer>
        )
    }
  