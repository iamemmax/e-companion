import { useSelector } from "react-redux";

var scriptEle = document.createElement("script");
scriptEle.setAttribute(
  "src",
  "https://unpkg.com/peerjs@1.4.7/dist/peerjs.min.js"
);
const { user } = useSelector((state) => state.auth);
console.log(user?.data?.user?._id);
scriptEle.setAttribute("type", "text/javascript");

document.body.appendChild(scriptEle);

// success event
scriptEle.addEventListener("load", () => {
  console.log("File loaded");
  var peer = new Peer();
  if (peer) {
    console.log("my peer is:", peer.id);
  }
});
// error event
scriptEle.addEventListener("error", (ev) => {
  console.log("Error on loading file", ev);
});
