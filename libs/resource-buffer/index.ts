import toast from "react-hot-toast";
import { ResourceBuffer } from "./resource-buffer";

export const resourceBuffer = new ResourceBuffer();

resourceBuffer.setErrorCallback((error: Error) => {
  toast.error(error.message);
  console.log(error.message);
});
