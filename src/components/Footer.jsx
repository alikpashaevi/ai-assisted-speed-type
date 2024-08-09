import React from 'react'
import { FaGithub, FaFacebookF , FaLinkedinIn   } from "react-icons/fa";
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <p>© 2023 alikpashaevi All rights reserved</p>
      <div className="footer-socials">
        <a href="https://github.com/alikpashaevi"><FaGithub /></a>
        <a href="https://www.facebook.com/alik.pashaev.338"><FaFacebookF  /></a>
        <a href="https://www.linkedin.com/in/alikhan-pashaevi-524677302/"><FaLinkedinIn /></a>
      </div>
    </footer>
  )
}

export default Footer