import { 
  StyledModal, 
  ModalCover,
  UserInfo, 
  BiddingInfo,
  BiddingForm

} from "./Modal.style";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { motion,} from "framer-motion";
import data from "../App/data";
import { useEffect, useState } from "react";
import getLocalStorage from "../Reports/getLocalStorage";
import convertToSeconds from "../App/convertToSeconds";

const animationLength = 1.3;

function Modal(props) {
  const { time } = props.nftData[props.modalID];
  let auctionState = "Auction ending in";
  if (time.hour==0 && time.minute==0 && time.seconds==0 && !time.isWaiting) {
       auctionState = "Auction has ended";
  } else if (time.isWaiting) {
       auctionState = "Auction starting in"
  };
  
  
  const addToReport = (e) => {
       e.preventDefault();
       const inputBox = e.currentTarget.previousElementSibling;
       const placeHolder = e.currentTarget.parentElement;
       let lastBid =  props.nftData[props.modalID].lastBid;
       let bidValue = inputBox.children[1];
            
       if (time.hour ==0 && time.minute==0 && time.seconds==0 && !time.isWaiting || time.isWaiting) {
            bidValue.type = "text";
            bidValue.value = "Auction Has Ended.";
            placeHolder.classList.add("failed");
            setTimeout(()=>{
                 placeHolder.classList.remove("failed");
                 bidValue.type = "number";
                 bidValue.value = "";
            }, 1200);
       } else if (Number(bidValue.value) <= Number(lastBid) || Number(props.balance) < Number(bidValue.value)) {
            bidValue.type = "text";
            bidValue.value = "Insufficient Balance.";
            placeHolder.classList.add("failed");
            setTimeout(()=>{
                 placeHolder.classList.remove("failed");
                 bidValue.type = "number";
                 bidValue.value = "";
            }, 1200);
       }else if (Number(props.balance) > Number(bidValue.value) && Number(bidValue.value) > Number(lastBid)) {
            const bidEndingTime = Math.floor((new Date().getTime()/1000) + convertToSeconds(time.hour, time.minute, time.seconds));
            
            const newBalnce = props.balance -  bidValue.value;
            props.setBalance(newBalnce.toFixed(5))
            props.nftData[props.modalID].lastBid = bidValue.value;
            let nftItems = getLocalStorage();
            nftItems.push({id : props.modalID, amount: bidValue.value, sold: false, purchased: true, bidEndingTime:bidEndingTime})
            localStorage.setItem("nft", JSON.stringify(nftItems));
            bidValue.type = "text";
            bidValue.value = "Bid Was Placed";
            placeHolder.classList.add("success");
            setTimeout(()=>{
                 placeHolder.classList.remove("success");
                 bidValue.type = "number";
                 bidValue.value = "";
            }, 1200);
       }

  }
  

  const showNft = () =>{
      if (props.isModalActive.bid === true) {
            props.setModalState({report: false, bid: false})
      }else{
            props.setModalState({report: false, bid: true})
      }
  }

  
  return (
       <div>
            <ModalCover 
                 show={props.isModalActive.bid}
                 as={motion.div}
                 onClick={showNft}
            />
            <StyledModal
                 show={props.isModalActive.bid}
                 as={motion.div}
                 animate={{transform: `scale(${props.isModalActive.bid ? 1:0.2}) translate(-50%, -50%)`, opacity: props.isModalActive.bid ? 1:0 }}
                 style={{transformOrigin: `${!props.isModalActive.bid ? "0% 0%" : ""}`}}

            >
                 <motion.img 
                      src={`/nfts/nft-${props.modalID+1}.jpg`} alt="nft"
                      animate={{height: props.isModalActive.bid ? ["100%", "100%", "39%", "39%"]: "100%"}}
                      transition={{duration: animationLength}}
                 />
                 <UserInfo
                      as={motion.div}
                      animate={{opacity: props.isModalActive.bid ? [0,0,0,1]:0}}
                      transition={{duration: animationLength}}
                 >
                      <img src={`creators/creator-${props.modalID+1}.jpg`} alt="" />
                      <p>{`${data[props.modalID].creator}`}</p>
                      <p>Creator</p>
                 </UserInfo>
                 <BiddingInfo
                      className={`${time.isWaiting ? "isWaiting": ""}`}
                      as={motion.div}
                      animate={{opacity: props.isModalActive.bid ? [0,0,0,1]:0}}
                      transition={{duration: animationLength}}
                 >
                      <div>
                           <p>Last bid</p>
                           <p>{props.nftData[props.modalID].lastBid} ETH</p>
                      </div>
                      <div>
                           <p>{auctionState}</p>
                           <p>{time.hour} : {time.minute} : {time.seconds}</p>
                      </div>
                 </BiddingInfo>
                 <BiddingForm
                      as={motion.form}
                      animate={{opacity: props.isModalActive.bid ? [0,0,0,1]:0}}
                      transition={{duration: animationLength}}
                 >
                      <div>
                           <h4>Your Bid</h4>
                           <h4>{`${data[props.modalID].nft}`}</h4>    
                      </div>
                      <div>
                           <span>ETH</span>
                           <input 
                           placeholder={`Minimum of ${props.nftData[props.modalID].lastBid}ETH required.`} type="number"
                      />
                      </div>
                      <motion.button 
                           onClick={addToReport}
                           whileTap={{scale: 0.98}}>Submit</motion.button>
                 </BiddingForm>
            </StyledModal>
       </div>
  )
};

export default Modal;