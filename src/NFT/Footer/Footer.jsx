import {TfiLinkedin} from "react-icons/tfi";
import {SiWhatsapp} from "react-icons/si";
import {VscGithub} from "react-icons/vsc";


import StyledFooter from "./Footer.style";

function Footer() {
     return (
          <StyledFooter>
               <a href="https://www.linkedin.com/in/tosmel2/"><TfiLinkedin className="linkcolor"/></a>
               <a href="https://api.whatsapp.com/send/?phone=2348068957966&text&type=phone_number&app_absent=0"><SiWhatsapp className="Appcolor"/></a>
               <a href="https://github.com/tosmel2"><VscGithub /></a>
          </StyledFooter>
     )
};

export default Footer;