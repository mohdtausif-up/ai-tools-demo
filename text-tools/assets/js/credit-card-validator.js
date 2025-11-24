// Auto-format input as user types
    document.getElementById('cardInput').addEventListener('input', function(e) {
      let value = e.target.value.replace(/\s/g, '');
      let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
      e.target.value = formattedValue;
    });
    
    function luhnCheck(cardNumber) {
      let sum = 0;
      let isEven = false;
      
      for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i]);
        
        if (isEven) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }
        
        sum += digit;
        isEven = !isEven;
      }
      
      return sum % 10 === 0;
    }
    
    function getCardType(cardNumber) {
      if (/^4/.test(cardNumber)) return 'Visa';
      if (/^5[1-5]/.test(cardNumber)) return 'Mastercard';
      if (/^3[47]/.test(cardNumber)) return 'American Express';
      if (/^6(?:011|5)/.test(cardNumber)) return 'Discover';
      if (/^35/.test(cardNumber)) return 'JCB';
      return 'Unknown';
    }
    
    function validateCard() {
      const input = document.getElementById('cardInput').value;
      const cardNumber = input.replace(/\s/g, '');
      
      if (!cardNumber) {
        showToast('Please enter a card number', 'error');
        return;
      }
      
      if (!/^\d+$/.test(cardNumber)) {
        showToast('Card number must contain only digits', 'error');
        return;
      }
      
      if (cardNumber.length < 13 || cardNumber.length > 19) {
        showToast('Card number must be 13-19 digits', 'error');
        return;
      }
      
      const isValid = luhnCheck(cardNumber);
      const cardType = getCardType(cardNumber);
      
      // Display results
      const resultIcon = document.getElementById('resultIcon');
      const resultStatus = document.getElementById('resultStatus');
      
      if (isValid) {
        resultIcon.textContent = '✓';
        resultIcon.style.color = '#10b981';
        resultStatus.textContent = 'Valid Card Number';
        resultStatus.style.color = '#10b981';
        showToast('Card number is valid!');
      } else {
        resultIcon.textContent = '✗';
        resultIcon.style.color = '#ef4444';
        resultStatus.textContent = 'Invalid Card Number';
        resultStatus.style.color = '#ef4444';
        showToast('Card number is invalid', 'error');
      }
      
      document.getElementById('cardType').textContent = cardType;
      document.getElementById('cardLength').textContent = cardNumber.length + ' digits';
      document.getElementById('resultsCard').style.display = 'block';
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
