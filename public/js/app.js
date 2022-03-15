const contactForm = document.querySelector('.contact-form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');


 contactForm.addEventListener('submit', (e)=>{
     e.preventDefault();
     
     let formData = {
         name: name.value,
         email: email.value,
         subject: subject.value,
         message: message.value
      }

      
      
      let xhttp = new XMLHttpRequest();
      xhttp.open('Post', '/');
      xhttp.setRequestHeader('content-type','application/json');
      xhttp.onload = function(){
          console.log(xhttp.responseText);
          if(xhttp.responseText == "success"){
              alert('Email sent');
              name.value = '';
              email.value = '';
              subject.value = '';
              message.value = '';
            }
          else{
              alert('Sorry!! Something went wrong.')
          }
      }
      xhttp.send(JSON.stringify(formData));

 });