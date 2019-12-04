export default function(worldPosition, camera) {
  let width = window.innerWidth,
    height = window.innerHeight;
  let widthHalf = width / 2,
    heightHalf = height / 2;
  let pos = worldPosition.clone();
  pos.project(camera);
  pos.x = pos.x * widthHalf + widthHalf;
  pos.y = -(pos.y * heightHalf) + heightHalf;
  return pos;
}
