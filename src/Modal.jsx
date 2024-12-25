import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }) {
  const elRef = useRef(null);
  if (!elRef.current) {
    // always reference the same "div" each render
    // don't use document.getElementById() each render because it's slow interacting with DOM
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current); // return cleanup function
  }, []); // no dependencies since only want to insert div once

  return createPortal(<div>{children}</div>, elRef.current);
}
