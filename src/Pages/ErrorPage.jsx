import React from "react";
import { Link } from "react-router-dom";
import ErrorImage from "./../assets/errorImage.png";
function ErrorPage() {
  return (
    <div className="min-h-[80vh] sm:mt-[5%] md:mt-[auto] flex justify-center items-center">
      <section>
        <div className="flex items-center"> 
            <div>
                <img src={ErrorImage} alt="" />
            </div>
          <div>
    
            <p className="">Something is missing</p>
            <p className="mb-8">
              Sorry, we can't find that page your looking.You wil find a lot of
              other movies in home page.
            </p>
            <Link to="/" className="bg-red-900 p-2 rounded hover:bg-red-950">
              Back To Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ErrorPage;
