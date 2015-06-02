document.addEventListener('keydown', function(e){
  // e.preventDefault();
  Actions.keyDown(e.keyCode);
});

document.addEventListener('keyup', function(e){
  // e.preventDefault();
  Actions.keyUp(e.keyCode);
});
