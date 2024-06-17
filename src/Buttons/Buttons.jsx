import React from "react";
import { useState } from "react";
function Buttons() {
  const [noPage, setNoPage] = useState(1);
  function nextPage(event) {
    event.preventDefault();

    setNoPage((prevPage) => {
      const newNoPage = prevPage + 1;

      return newNoPage;
    });
  }

  function previousPage(event) {
    event.preventDefault();
    if (noPage > 1) {
      setNoPage((prevPage) => {
        const newNoPage = prevPage - 1;

        return newNoPage;
      });
    }
  }
  return (
    <div>
      
    </div>
  );
}

export default Buttons;
