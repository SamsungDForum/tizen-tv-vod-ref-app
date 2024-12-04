import toast from "react-hot-toast";
import { ResourceBuffer } from "./resourceBuffer";
import { ManageResourceBuffer } from "./manageResourceBuffer";

export const bufferSaver = new ResourceBuffer(200);
export const bufferPlotter = new ResourceBuffer(30);

export const manageBuffers = new ManageResourceBuffer<ResourceBuffer>(bufferSaver, bufferPlotter);

manageBuffers.setErrorCallback((error: Error) => {
  toast.error(error.message);
  console.log(error.message);
});
