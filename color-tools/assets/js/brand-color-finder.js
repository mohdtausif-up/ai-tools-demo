const brands = [
      { name: 'Facebook', category: 'Social Media', colors: ['#1877F2', '#4267B2', '#898F9C'] },
      { name: 'Twitter', category: 'Social Media', colors: ['#1DA1F2', '#14171A', '#657786'] },
      { name: 'Instagram', category: 'Social Media', colors: ['#E4405F', '#C13584', '#833AB4', '#5851DB'] },
      { name: 'YouTube', category: 'Social Media', colors: ['#FF0000', '#282828', '#FFFFFF'] },
      { name: 'TikTok', category: 'Social Media', colors: ['#000000', '#FE2C55', '#25F4EE'] },
      { name: 'LinkedIn', category: 'Social Media', colors: ['#0A66C2', '#313335', '#00A0DC'] },
      { name: 'Snapchat', category: 'Social Media', colors: ['#FFFC00', '#000000', '#FFFFFF'] },
      { name: 'Pinterest', category: 'Social Media', colors: ['#E60023', '#BD081C', '#000000'] },
      { name: 'Google', category: 'Technology', colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'] },
      { name: 'Microsoft', category: 'Technology', colors: ['#F25022', '#7FBA00', '#00A4EF', '#FFB900'] },
      { name: 'Apple', category: 'Technology', colors: ['#000000', '#A2AAAD', '#FFFFFF'] },
      { name: 'Amazon', category: 'E-commerce', colors: ['#FF9900', '#146EB4', '#232F3E'] },
      { name: 'Netflix', category: 'Entertainment', colors: ['#E50914', '#221F1F', '#F5F5F1'] },
      { name: 'Spotify', category: 'Entertainment', colors: ['#1DB954', '#191414', '#FFFFFF'] },
      { name: 'Slack', category: 'Technology', colors: ['#4A154B', '#2EB67D', '#ECB22E', '#E01E5A'] },
      { name: 'Discord', category: 'Social Media', colors: ['#5865F2', '#57F287', '#FEE75C', '#EB459E'] },
      { name: 'Dropbox', category: 'Technology', colors: ['#0061FF', '#0D2481', '#1E3A8A'] },
      { name: 'Airbnb', category: 'Travel', colors: ['#FF5A5F', '#00A699', '#FC642D', '#484848'] },
      { name: 'Uber', category: 'Transportation', colors: ['#000000', '#FFFFFF', '#09091A'] },
      { name: 'Coca-Cola', category: 'Food & Beverage', colors: ['#F40009', '#000000', '#FFFFFF'] },
      { name: 'Pepsi', category: 'Food & Beverage', colors: ['#004B93', '#E32934', '#FFFFFF'] },
      { name: 'McDonald\'s', category: 'Food & Beverage', colors: ['#FFC72C', '#DA291C', '#27251F'] },
      { name: 'Starbucks', category: 'Food & Beverage', colors: ['#00704A', '#1E3932', '#EDEDED'] },
      { name: 'Nike', category: 'Sports', colors: ['#000000', '#FFFFFF', '#DC143C'] },
      { name: 'Adidas', category: 'Sports', colors: ['#000000', '#FFFFFF', '#767676'] },
      { name: 'Tesla', category: 'Automotive', colors: ['#CC0000', '#000000', '#FFFFFF'] },
      { name: 'BMW', category: 'Automotive', colors: ['#1C69D3', '#FFFFFF', '#000000'] },
      { name: 'Ferrari', category: 'Automotive', colors: ['#DC0000', '#FFD700', '#000000'] },
      { name: 'Mastercard', category: 'Finance', colors: ['#EB001B', '#F79E1B', '#FF5F00'] },
      { name: 'Visa', category: 'Finance', colors: ['#1A1F71', '#F7B600', '#FFFFFF'] },
      { name: 'PayPal', category: 'Finance', colors: ['#003087', '#009CDE', '#012169'] },
      { name: 'Stripe', category: 'Finance', colors: ['#635BFF', '#00D4FF', '#FFFFFF'] },
      { name: 'Reddit', category: 'Social Media', colors: ['#FF4500', '#0079D3', '#000000'] },
      { name: 'Twitch', category: 'Entertainment', colors: ['#9146FF', '#000000', '#FFFFFF'] },
      { name: 'GitHub', category: 'Technology', colors: ['#181717', '#FFFFFF', '#0969DA'] },
      { name: 'Figma', category: 'Design', colors: ['#F24E1E', '#FF7262', '#A259FF', '#1ABCFE'] },
      { name: 'Canva', category: 'Design', colors: ['#00C4CC', '#7D2AE7', '#FFFFFF'] },
      { name: 'Adobe', category: 'Design', colors: ['#FF0000', '#000000', '#FFFFFF'] },
      { name: 'Notion', category: 'Productivity', colors: ['#000000', '#FFFFFF', '#9B9A97'] },
      { name: 'Trello', category: 'Productivity', colors: ['#0079BF', '#00C2E0', '#FFFFFF'] },
      { name: 'Zoom', category: 'Technology', colors: ['#2D8CFF', '#FFFFFF', '#000000'] },
      { name: 'WhatsApp', category: 'Social Media', colors: ['#25D366', '#128C7E', '#075E54'] },
      { name: 'Telegram', category: 'Social Media', colors: ['#0088CC', '#FFFFFF', '#000000'] },
      { name: 'Samsung', category: 'Technology', colors: ['#1428A0', '#000000', '#FFFFFF'] },
      { name: 'Sony', category: 'Technology', colors: ['#000000', '#0072CE', '#FFFFFF'] }
    ];
    
    let allBrands = [...brands];
    
    function copyColor(hex, brandName) {
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied ${brandName} color: ${hex}`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }
    
    function renderBrands(brandsToRender = allBrands) {
      const grid = document.getElementById('brandsGrid');
      
      if (brandsToRender.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: white; font-size: 18px;">No brands found</div>';
        return;
      }
      
      grid.innerHTML = brandsToRender.map(brand => {
        const colorsHtml = brand.colors.map(color => `
          <div class="color-block" style="background: ${color}" onclick="copyColor('${color}', '${brand.name}')">
            <span class="color-hex">${color}</span>
          </div>
        `).join('');
        
        return `
          <div class="brand-card">
            <div class="brand-header">
              <div class="brand-name">${brand.name}</div>
              <div class="brand-category">${brand.category}</div>
            </div>
            <div class="colors-row">${colorsHtml}</div>
          </div>
        `;
      }).join('');
    }
    
    function searchBrands(query) {
      if (!query) {
        renderBrands(allBrands);
        return;
      }
      
      const filtered = allBrands.filter(brand => 
        brand.name.toLowerCase().includes(query.toLowerCase()) ||
        brand.category.toLowerCase().includes(query.toLowerCase())
      );
      
      renderBrands(filtered);
    }
    
    document.getElementById('searchInput').addEventListener('input', (e) => {
      searchBrands(e.target.value);
    });
    
    renderBrands();

const brands = [
      { name: 'Facebook', category: 'Social Media', colors: ['#1877F2', '#4267B2', '#898F9C'] },
      { name: 'Twitter', category: 'Social Media', colors: ['#1DA1F2', '#14171A', '#657786'] },
      { name: 'Instagram', category: 'Social Media', colors: ['#E4405F', '#C13584', '#833AB4', '#5851DB'] },
      { name: 'YouTube', category: 'Social Media', colors: ['#FF0000', '#282828', '#FFFFFF'] },
      { name: 'TikTok', category: 'Social Media', colors: ['#000000', '#FE2C55', '#25F4EE'] },
      { name: 'LinkedIn', category: 'Social Media', colors: ['#0A66C2', '#313335', '#00A0DC'] },
      { name: 'Snapchat', category: 'Social Media', colors: ['#FFFC00', '#000000', '#FFFFFF'] },
      { name: 'Pinterest', category: 'Social Media', colors: ['#E60023', '#BD081C', '#000000'] },
      { name: 'Google', category: 'Technology', colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'] },
      { name: 'Microsoft', category: 'Technology', colors: ['#F25022', '#7FBA00', '#00A4EF', '#FFB900'] },
      { name: 'Apple', category: 'Technology', colors: ['#000000', '#A2AAAD', '#FFFFFF'] },
      { name: 'Amazon', category: 'E-commerce', colors: ['#FF9900', '#146EB4', '#232F3E'] },
      { name: 'Netflix', category: 'Entertainment', colors: ['#E50914', '#221F1F', '#F5F5F1'] },
      { name: 'Spotify', category: 'Entertainment', colors: ['#1DB954', '#191414', '#FFFFFF'] },
      { name: 'Slack', category: 'Technology', colors: ['#4A154B', '#2EB67D', '#ECB22E', '#E01E5A'] },
      { name: 'Discord', category: 'Social Media', colors: ['#5865F2', '#57F287', '#FEE75C', '#EB459E'] },
      { name: 'Dropbox', category: 'Technology', colors: ['#0061FF', '#0D2481', '#1E3A8A'] },
      { name: 'Airbnb', category: 'Travel', colors: ['#FF5A5F', '#00A699', '#FC642D', '#484848'] },
      { name: 'Uber', category: 'Transportation', colors: ['#000000', '#FFFFFF', '#09091A'] },
      { name: 'Coca-Cola', category: 'Food & Beverage', colors: ['#F40009', '#000000', '#FFFFFF'] },
      { name: 'Pepsi', category: 'Food & Beverage', colors: ['#004B93', '#E32934', '#FFFFFF'] },
      { name: 'McDonald\'s', category: 'Food & Beverage', colors: ['#FFC72C', '#DA291C', '#27251F'] },
      { name: 'Starbucks', category: 'Food & Beverage', colors: ['#00704A', '#1E3932', '#EDEDED'] },
      { name: 'Nike', category: 'Sports', colors: ['#000000', '#FFFFFF', '#DC143C'] },
      { name: 'Adidas', category: 'Sports', colors: ['#000000', '#FFFFFF', '#767676'] },
      { name: 'Tesla', category: 'Automotive', colors: ['#CC0000', '#000000', '#FFFFFF'] },
      { name: 'BMW', category: 'Automotive', colors: ['#1C69D3', '#FFFFFF', '#000000'] },
      { name: 'Ferrari', category: 'Automotive', colors: ['#DC0000', '#FFD700', '#000000'] },
      { name: 'Mastercard', category: 'Finance', colors: ['#EB001B', '#F79E1B', '#FF5F00'] },
      { name: 'Visa', category: 'Finance', colors: ['#1A1F71', '#F7B600', '#FFFFFF'] },
      { name: 'PayPal', category: 'Finance', colors: ['#003087', '#009CDE', '#012169'] },
      { name: 'Stripe', category: 'Finance', colors: ['#635BFF', '#00D4FF', '#FFFFFF'] },
      { name: 'Reddit', category: 'Social Media', colors: ['#FF4500', '#0079D3', '#000000'] },
      { name: 'Twitch', category: 'Entertainment', colors: ['#9146FF', '#000000', '#FFFFFF'] },
      { name: 'GitHub', category: 'Technology', colors: ['#181717', '#FFFFFF', '#0969DA'] },
      { name: 'Figma', category: 'Design', colors: ['#F24E1E', '#FF7262', '#A259FF', '#1ABCFE'] },
      { name: 'Canva', category: 'Design', colors: ['#00C4CC', '#7D2AE7', '#FFFFFF'] },
      { name: 'Adobe', category: 'Design', colors: ['#FF0000', '#000000', '#FFFFFF'] },
      { name: 'Notion', category: 'Productivity', colors: ['#000000', '#FFFFFF', '#9B9A97'] },
      { name: 'Trello', category: 'Productivity', colors: ['#0079BF', '#00C2E0', '#FFFFFF'] },
      { name: 'Zoom', category: 'Technology', colors: ['#2D8CFF', '#FFFFFF', '#000000'] },
      { name: 'WhatsApp', category: 'Social Media', colors: ['#25D366', '#128C7E', '#075E54'] },
      { name: 'Telegram', category: 'Social Media', colors: ['#0088CC', '#FFFFFF', '#000000'] },
      { name: 'Samsung', category: 'Technology', colors: ['#1428A0', '#000000', '#FFFFFF'] },
      { name: 'Sony', category: 'Technology', colors: ['#000000', '#0072CE', '#FFFFFF'] }
    ];
    
    let allBrands = [...brands];
    
    function copyColor(hex, brandName) {
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied ${brandName} color: ${hex}`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }
    
    function renderBrands(brandsToRender = allBrands) {
      const grid = document.getElementById('brandsGrid');
      
      if (brandsToRender.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: white; font-size: 18px;">No brands found</div>';
        return;
      }
      
      grid.innerHTML = brandsToRender.map(brand => {
        const colorsHtml = brand.colors.map(color => `
          <div class="color-block" style="background: ${color}" onclick="copyColor('${color}', '${brand.name}')">
            <span class="color-hex">${color}</span>
          </div>
        `).join('');
        
        return `
          <div class="brand-card">
            <div class="brand-header">
              <div class="brand-name">${brand.name}</div>
              <div class="brand-category">${brand.category}</div>
            </div>
            <div class="colors-row">${colorsHtml}</div>
          </div>
        `;
      }).join('');
    }
    
    function searchBrands(query) {
      if (!query) {
        renderBrands(allBrands);
        return;
      }
      
      const filtered = allBrands.filter(brand => 
        brand.name.toLowerCase().includes(query.toLowerCase()) ||
        brand.category.toLowerCase().includes(query.toLowerCase())
      );
      
      renderBrands(filtered);
    }
    
    document.getElementById('searchInput').addEventListener('input', (e) => {
      searchBrands(e.target.value);
    });
    
    renderBrands();


