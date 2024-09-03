const getTrimText = (text, length = 150) => {
  if (text) {
    const trimText = text.trim().replace(/ +/g, ' ');
    if (trimText.length <= length) {
      return trimText;
    }
    return trimText.slice(0, length) + '...';
  }
};

export default getTrimText;
