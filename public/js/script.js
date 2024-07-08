(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


  let barBtn = document.getElementById("bars");
  let crossBtn = document.getElementById("cross");
  let sidebar = document.getElementById("sidebar");

  barBtn.addEventListener("click", function(){
      sidebar.style.display = "flex";
      sidebar.style.animation = "movingSidebarIn 0.25s ease-in 0s 1 normal";
  })

  crossBtn.addEventListener("click", function(){
      sidebar.style.display = "none";
  })