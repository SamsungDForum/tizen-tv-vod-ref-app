export class ResourceBuffer {
  size: number;
  cpu: number[] = [];
  memory: number[] = [];

  constructor(size: number) {
    this.size = size;
  }

  get length() {
    return this.memory.length;
  }

  get isFull() {
    return this.length > this.size;
  }

  removeItem() {
    this.cpu.pop();
    this.memory.pop();
  }

  appendItem(cpu: number, memory: number) {
    this.cpu.unshift(cpu);
    this.memory.unshift(memory);
  }

  clear() {
    this.cpu = [];
    this.memory = [];
  }
}
