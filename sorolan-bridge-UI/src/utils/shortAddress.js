export const shortAddress = (addr) => {
    const startChar = addr.substring(0, 10);
    const endChar = addr.substring(addr.length - 7, addr.length);
    return `${startChar}....${endChar}`;
  };
  