import toast from "react-hot-toast";
import { ResourceBuffer } from "./resourceBuffer";

export const resourceBuffer = new ResourceBuffer(); // downloaded file when buffer is full weights 11kB

resourceBuffer.setErrorCallback((error: Error) => {
  toast.error(error.message);
  console.log(error.message);
});
