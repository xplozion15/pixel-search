function getClickedCoorindates(event) {
  // get boundclient i.e position of image relative to viewport to make furthur calculations of the position relative to image
  const bounding = event.target.getBoundingClientRect();

  //make x and y calculations
  let X = ((event.clientX - bounding.left) / bounding.width) * 100;
  let Y = ((event.clientY - bounding.top) / bounding.height) * 100;

  console.log(`The X co-ordinate is ${X}% & the Y co-ordinate is ${Y}%`);
  console.log(`x: ${event.clientX}, y: ${event.clientY}`);

  return { X, Y };
}

export { getClickedCoorindates };
