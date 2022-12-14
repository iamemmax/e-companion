import React from "react";
import Styles from "./styles/advertLayout.module.scss";
const AdvertLayout = ({ children }) => {
  return (
    <div className={Styles.advert__wrapper}>
      <div className={Styles.children}>{children}</div>
      <div className={Styles.Advert}>
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOCFeArEeiKAPc6gTv1TrAVDIgrGr8WNkRNg&usqp=CAU"
            alt="e3ee"
          />
        </div>
        <div>
          {" "}
          <img
            src="https://i.pinimg.com/736x/8b/a5/ed/8ba5ed8dcf3686193fa446aabd923ab2.jpg"
            alt="fffg"
          />
        </div>
        <div>
          {" "}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Otpno0Nzs1qt0u0o8Ym4ln2u-ZZUFiOspw&usqp=CAU"
            alt="ffnmmnf"
          />
        </div>
        <div>
          {" "}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf6ZyO98s0o8u6KG6wWUZM8CFDd3FDt2-etg&usqp=CAU"
            alt="ffnnf"
          />
        </div>
      </div>
    </div>
  );
};

export default AdvertLayout;
