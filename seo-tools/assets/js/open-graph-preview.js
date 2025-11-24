function init() {
      updatePreviews();
    }

    function updatePreviews() {
      const title = document.getElementById('ogTitle').value || 'Untitled';
      const description = document.getElementById('ogDescription').value || 'No description provided.';
      const imageUrl = document.getElementById('ogImage').value;
      const url = document.getElementById('ogUrl').value || 'example.com';

      // Extract domain from URL
      let domain = url;
      try {
        const urlObj = new URL(url);
        domain = urlObj.hostname.replace('www.', '');
      } catch (e) {
        domain = url.replace('https://', '').replace('http://', '').split('/')[0];
      }

      // Update Facebook Preview
      document.getElementById('fbTitle').textContent = title;
      document.getElementById('fbDescription').textContent = description;
      document.getElementById('fbUrl').textContent = domain.toUpperCase();
      
      const fbImage = document.getElementById('fbImage');
      if (imageUrl) {
        fbImage.style.backgroundImage = `url(${imageUrl})`;
        fbImage.classList.add('image-preview');
        fbImage.textContent = '';
      } else {
        fbImage.style.backgroundImage = '';
        fbImage.classList.remove('image-preview');
        fbImage.textContent = 'Preview Image';
      }

      // Update Twitter Preview
      document.getElementById('twitterTitle').textContent = title;
      document.getElementById('twitterDescription').textContent = description;
      document.getElementById('twitterUrl').textContent = domain;
      
      const twitterImage = document.getElementById('twitterImage');
      if (imageUrl) {
        twitterImage.style.backgroundImage = `url(${imageUrl})`;
        twitterImage.classList.add('image-preview');
        twitterImage.textContent = '';
      } else {
        twitterImage.style.backgroundImage = '';
        twitterImage.classList.remove('image-preview');
        twitterImage.textContent = 'Preview Image';
      }

      // Update LinkedIn Preview
      document.getElementById('linkedinTitle').textContent = title;
      document.getElementById('linkedinUrl').textContent = domain;
      
      const linkedinImage = document.getElementById('linkedinImage');
      if (imageUrl) {
        linkedinImage.style.backgroundImage = `url(${imageUrl})`;
        linkedinImage.classList.add('image-preview');
        linkedinImage.textContent = '';
      } else {
        linkedinImage.style.backgroundImage = '';
        linkedinImage.classList.remove('image-preview');
        linkedinImage.textContent = 'Preview Image';
      }

      showToast('Previews updated!');
    }

    function showToast(message) {
      const existingToast = document.querySelector('.toast');
      if (existingToast) existingToast.remove();
      
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => toast.remove(), 2000);
    }

    init();
