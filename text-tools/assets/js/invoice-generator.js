function generateInvoices() {
      const prefix = document.getElementById('prefix').value.trim() || 'INV';
      const startNumber = parseInt(document.getElementById('startNumber').value) || 1001;
      const count = Math.min(parseInt(document.getElementById('count').value) || 10, 100);
      const format = document.getElementById('format').value;
      
      const invoices = [];
      const year = new Date().getFullYear();
      const month = String(new Date().getMonth() + 1).padStart(2, '0');
      
      for (let i = 0; i < count; i++) {
        const number = String(startNumber + i).padStart(4, '0');
        let invoice;
        
        switch (format) {
          case 'prefix-number':
            invoice = `${prefix}-${number}`;
            break;
          case 'prefix-year-number':
            invoice = `${prefix}-${year}-${number}`;
            break;
          case 'prefix-month-number':
            invoice = `${prefix}-${month}-${number}`;
            break;
          case 'year-prefix-number':
            invoice = `${year}-${prefix}-${number}`;
            break;
          default:
            invoice = `${prefix}-${number}`;
        }
        
        invoices.push(invoice);
      }
      
      displayInvoices(invoices);
      showToast(`Generated ${count} invoice numbers!`);
    }
    
    function displayInvoices(invoices) {
      const listHTML = invoices.map(invoice => `
        <div class="invoice-item">
          <span class="invoice-number">${invoice}</span>
          <button class="copy-btn-small" onclick="copyInvoice('${invoice}')">📋 Copy</button>
        </div>
      `).join('');
      
      document.getElementById('invoiceList').innerHTML = listHTML;
      document.getElementById('resultsCard').style.display = 'block';
    }
    
    function copyInvoice(invoice) {
      navigator.clipboard.writeText(invoice).then(() => {
        showToast('Invoice number copied!');
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
    
    // Generate initial invoices
    generateInvoices();
