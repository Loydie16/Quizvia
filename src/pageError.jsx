import error from "./assets/pageerror.json";
import Lottie from "lottie-react";

function pageError() {
     return (
       <main className="flex flex-col justify-center  bg-[#00403d]  w-full min-h-screen items-center">
         <div className="flex flex-col items-center justify-center m-4 ">
           <span className="font-bold text-4xl sm:text-6xl md:text-8xl lg:text-10xl text-custom-gray text-center">
             Page Respond with an Error
           </span>
           <Lottie animationData={error} />
           <button className="bg-[#0a5a62] font-semibold text-white px-4 py-2 rounded-md hover:bg-[#e79209] ease-in-out duration-500">
             <a
               href="/"
               onClick={() => {
                 window.location.reload();
               }}
             >
               Go back to Home
             </a>
           </button>
         </div>
       </main>
     );
}

export default pageError;
