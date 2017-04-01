
//-----CODE JQUERRY qui controle les slides du background
$(document).ready(function(){
     $("#myCarousel").carousel({
         interval : 3000,
         pause: false
     });
});

//-------------------------------------------------------
//-------------------------------------------------------




//----------CODE de controle du sign in-----------------  
 $(document).ready(function () {
    $('.forgot-pass').click(function(event) {
      $(".pr-wrap").toggleClass("show-pass-reset");
    });
    s
    $('.pass-reset-submit').click(function(event) {
      $(".pr-wrap").removeClass("show-pass-reset");
    }); 
});
//------------------------------------------------------
//------------------------------------------------------