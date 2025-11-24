document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formMessage = document.getElementById('formMessage');
    const submitBtn = this.querySelector('.submit-btn');
    
    // Simulate form submission (in production, this would send to a server)
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Sending...';
    
    setTimeout(() => {
      formMessage.style.display = 'block';
      formMessage.className = 'form-message success';
      formMessage.textContent = '✓ Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
      
      // Reset form
      this.reset();
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'Send Message';
      
      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }, 1000);
  });


