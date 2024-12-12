
import React from "react";

function Footer() {
    const toApp = (url) => {
        window.open(url, '_blank');
      };

    return (
      <footer style={{backgroundColor:"#D9D9D9"}} className="bg-[#d9d9d9] text-black text-center py-4 w-">
        <img 
          src="/logo.png" 
          onClick={() => toApp("https://www.skiie.org")}
          alt="SKIIE Learn footer icon" 
          className="w-[5%] h-[3%] md: w-[7%] h-[5%] sm: w-[10%] h-[8%] cursor-pointer mx-auto"
        />
        <p onClick={() => toApp("https://www.skiie.org")} className="mt-2">&copy; 2024 SKIIE LLP</p>
      </footer>
    );
  }
  
  export default Footer;
  