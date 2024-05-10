import React from "react";


import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"


const Follow=({ p })=> {
  const { name, username} = p
  return (
    <div className="post">
     
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>{name}{" "}
              <span className="post__headerSpecial">
                <VerifiedUserIcon className="post__badge" /> @{username}
              </span>
            </h3>
          </div>
       
        </div>
        
      </div>
    </div>
  );
}


export default Follow;