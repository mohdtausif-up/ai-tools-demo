let currentPassword = '';
    
    function updateLength() {
      const value = document.getElementById('lengthSlider').value;
      document.getElementById('lengthValue').textContent = value;
    }
    
    function generatePassword() {
      const length = parseInt(document.getElementById('lengthSlider').value);
      const includeUppercase = document.getElementById('includeUppercase').checked;
      const includeLowercase = document.getElementById('includeLowercase').checked;
      const includeNumbers = document.getElementById('includeNumbers').checked;
      const includeSymbols = document.getElementById('includeSymbols').checked;
      const excludeAmbiguous = document.getElementById('excludeAmbiguous').checked;
      
      if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        showToast('Please select at least one character type', 'error');
        return;
      }
      
      let charset = '';
      if (includeUppercase) charset += excludeAmbiguous ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (includeLowercase) charset += excludeAmbiguous ? 'abcdefghijkmnopqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz';
      if (includeNumbers) charset += excludeAmbiguous ? '23456789' : '0123456789';
      if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
      
      let password = '';
      const array = new Uint32Array(length);
      crypto.getRandomValues(array);
      
      for (let i = 0; i < length; i++) {
        password += charset[array[i] % charset.length];
      }
      
      currentPassword = password;
      document.getElementById('passwordDisplay').textContent = password;
      
      calculateStrength(password);
      showToast('Password generated!');
    }
    
    function calculateStrength(password) {
      let strength = 0;
      
      if (password.length >= 8) strength += 1;
      if (password.length >= 12) strength += 1;
      if (password.length >= 16) strength += 1;
      if (/[a-z]/.test(password)) strength += 1;
      if (/[A-Z]/.test(password)) strength += 1;
      if (/[0-9]/.test(password)) strength += 1;
      if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
      
      const bar = document.getElementById('strengthBar');
      const label = document.getElementById('strengthLabel');
      
      if (strength <= 3) {
        bar.style.background = '#ef4444';
        bar.style.width = '33%';
        label.textContent = 'Weak';
        label.style.color = '#ef4444';
      } else if (strength <= 5) {
        bar.style.background = '#f59e0b';
        bar.style.width = '66%';
        label.textContent = 'Medium';
        label.style.color = '#f59e0b';
      } else {
        bar.style.background = '#10b981';
        bar.style.width = '100%';
        label.textContent = 'Strong';
        label.style.color = '#10b981';
      }
    }
    
    function copyPassword() {
      if (!currentPassword) {
        showToast('Generate a password first', 'error');
        return;
      }
      navigator.clipboard.writeText(currentPassword).then(() => {
        showToast('Password copied to clipboard!');
      });
    }
    
    function showToast(message, type = 'success') {
      const existingToast = document.querySelector('.toast');
      if (existingToast) existingToast.remove();
      
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.style.background = type === 'error' ? '#ef4444' : '#10b981';
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => toast.remove(), 3000);
    }
    
    // Generate initial password
    generatePassword();
