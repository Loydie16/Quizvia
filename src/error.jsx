import error404 from './assets/error404.json'
import Lottie from 'lottie-react'

function error() {
  return (
    <main className="flex flex-col justify-center gap-8 bg-[#00403d] w-full min-h-screen items-center">
      <div className="flex flex-col items-center justify-center gap-20">
        <span className="font-bold text-4xl sm:text-6xl md:text-8xl lg:text-10xl text-custom-gray">
          Page not Found
        </span>
        <Lottie animationData={error404}   />
      </div>
    </main>
  );
}

export default error