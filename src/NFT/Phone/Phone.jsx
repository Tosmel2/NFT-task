import StyledPhone from "./StyledPhone";
import { FaExternalLinkAlt } from "react-icons/fa";

function Phone() {
     return (
          <StyledPhone>
               <div>
                    <img src="nophone.svg" alt="nophone" />
                    <h3>Sorry this project can't be viewed on mobile for now due to the task submission time.</h3>
                    <a href="https://www.linkedin.com/in/tosmel2">
                         <p> See More Info</p>
                         <span><FaExternalLinkAlt  /></span>
                    </a>
               </div>
          </StyledPhone>
     )
};

export default Phone;