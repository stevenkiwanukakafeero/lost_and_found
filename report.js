const backsideYes = document.getElementById('yes');
const backsideNo = document.getElementById('no');
const backpackDetails = document.getElementById('backpack-details');

backsideYes.addEventListener('change', () => {
  backpackDetails.style.display = 'block';
}); 

backsideNo.addEventListener('change', () => {
  backpackDetails.style.display = 'none';
});