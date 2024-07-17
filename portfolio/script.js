document.getElementById('contactForm').addEventListener('submit', function(event) 
{
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const formMessage = document.getElementById('formMessage');

    fetch(form.action, 
    {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => 
    {
      if (response.ok) {
        formMessage.textContent = 'Thanks for your submission!';
        formMessage.classList.remove('form__message--error');
        form.reset();
      } 
      else 
      {
        response.json().then(data => 
        {
          if (Object.hasOwn(data, 'errors')) 
        {
            formMessage.textContent = data["errors"].map(error => error["message"]).join(", ");
            formMessage.classList.add('form__message--error');
        } 
        else 
        {
            formMessage.textContent = 'Oops! There was a problem submitting your form';
            formMessage.classList.add('form__message--error');
        }
        })
      }
    }).catch(error => 
    {
      formMessage.textContent = 'Oops! There was a problem submitting your form';
      formMessage.classList.add('form__message--error');
    });
  });

document.addEventListener("DOMContentLoaded", function() 
{
    const yearSpan = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
});