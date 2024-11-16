document.querySelector('.search-bar button').addEventListener('click',function(){
	const query= document.querySelector('.search-bar input').value;
	alert('Searching for:'+query);
});

document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelectorAll('.product');
    
    products.forEach(function(product) {
        const oldPrice = product.querySelector('.old-price');
        const newPrice = product.querySelector('.new-price');
        
        if (newPrice && newPrice.textContent.trim() !== '') {
            oldPrice.style.display = 'none'; // Hide old price
            newPrice.style.display = 'block'; // Show new price
        }
    });
});
