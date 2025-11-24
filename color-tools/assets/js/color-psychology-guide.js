const colorPsychology = [
      {
        name: 'Red',
        hex: '#E63946',
        meanings: ['Passion', 'Energy', 'Danger', 'Love', 'Power', 'Excitement'],
        emotions: 'Red evokes strong emotions and stimulates appetite. It increases heart rate and creates urgency. Often used to grab attention and create a sense of immediacy.',
        positive: 'Bold, energetic, passionate, confident, powerful, stimulating',
        negative: 'Aggressive, domineering, demanding, intense, alarming',
        useCases: ['Call-to-action buttons', 'Sales and clearance', 'Food industry', 'Emergency services', 'Sports brands', 'Valentine\'s Day']
      },
      {
        name: 'Orange',
        hex: '#F77F00',
        meanings: ['Creativity', 'Adventure', 'Enthusiasm', 'Success', 'Energy', 'Warmth'],
        emotions: 'Orange combines the energy of red and the happiness of yellow. It represents enthusiasm, creativity, and determination. Creates feelings of warmth and excitement.',
        positive: 'Cheerful, friendly, confident, creative, adventurous, warm',
        negative: 'Superficial, loud, overpowering, attention-seeking',
        useCases: ['E-commerce sites', 'Children\'s products', 'Creative agencies', 'Fitness brands', 'Entertainment', 'Technology startups']
      },
      {
        name: 'Yellow',
        hex: '#FFD60A',
        meanings: ['Happiness', 'Optimism', 'Caution', 'Clarity', 'Warmth', 'Joy'],
        emotions: 'Yellow is the brightest color and stimulates mental activity. It evokes feelings of happiness, positivity, and optimism. Can also signal caution when paired with black.',
        positive: 'Optimistic, cheerful, bright, creative, energetic, confident',
        negative: 'Irritating, impatient, critical, cowardly, anxious',
        useCases: ['Highlight important info', 'Children\'s products', 'Summer campaigns', 'Caution signs', 'Food packaging', 'Clearance sales']
      },
      {
        name: 'Green',
        hex: '#06A77D',
        meanings: ['Nature', 'Growth', 'Harmony', 'Health', 'Money', 'Freshness'],
        emotions: 'Green is the most restful color for the eye. It represents nature, growth, and renewal. Creates feelings of balance, stability, and environmental awareness.',
        positive: 'Natural, balanced, healthy, fresh, calm, prosperous',
        negative: 'Boring, stagnant, bland, jealous, materialistic',
        useCases: ['Environmental brands', 'Health & wellness', 'Financial services', 'Organic products', 'Call-to-action buttons', 'Sustainability']
      },
      {
        name: 'Blue',
        hex: '#457B9D',
        meanings: ['Trust', 'Stability', 'Calm', 'Loyalty', 'Intelligence', 'Serenity'],
        emotions: 'Blue is the most universally preferred color. It creates a sense of calm, trust, and professionalism. Reduces appetite and promotes productivity.',
        positive: 'Trustworthy, dependable, calm, intelligent, serene, loyal',
        negative: 'Cold, aloof, unfriendly, unemotional, predictable',
        useCases: ['Corporate brands', 'Healthcare', 'Technology', 'Social media', 'Financial institutions', 'Professional services']
      },
      {
        name: 'Purple',
        hex: '#9D4EDD',
        meanings: ['Luxury', 'Royalty', 'Creativity', 'Wisdom', 'Mystery', 'Magic'],
        emotions: 'Purple combines the stability of blue and the energy of red. It represents luxury, creativity, and spirituality. Often associated with imagination and sophistication.',
        positive: 'Luxurious, creative, wise, spiritual, mysterious, imaginative',
        negative: 'Exotic, overly introspective, immature, extravagant',
        useCases: ['Luxury brands', 'Beauty products', 'Creative services', 'Spiritual/wellness', 'Education', 'Children\'s fantasy']
      },
      {
        name: 'Pink',
        hex: '#FF006E',
        meanings: ['Love', 'Romance', 'Compassion', 'Youth', 'Playfulness', 'Femininity'],
        emotions: 'Pink has a calming effect and is associated with nurturing and compassion. It represents sweetness, innocence, and femininity. Can also appear modern and edgy in brighter shades.',
        positive: 'Romantic, compassionate, youthful, playful, nurturing, sweet',
        negative: 'Immature, weak, over-emotional, inhibition, feminine stereotype',
        useCases: ['Beauty & cosmetics', 'Fashion brands', 'Romance products', 'Women\'s products', 'Charity campaigns', 'Modern design']
      },
      {
        name: 'Brown',
        hex: '#8B4513',
        meanings: ['Reliability', 'Stability', 'Honesty', 'Nature', 'Warmth', 'Comfort'],
        emotions: 'Brown is an earthy color associated with reliability and comfort. It creates feelings of warmth, stability, and wholesome simplicity. Often underused but highly effective.',
        positive: 'Reliable, stable, warm, comfortable, natural, wholesome',
        negative: 'Dull, boring, predictable, dirty, cheap',
        useCases: ['Coffee brands', 'Outdoor products', 'Natural/organic', 'Real estate', 'Law firms', 'Construction']
      },
      {
        name: 'Black',
        hex: '#1A1A1A',
        meanings: ['Elegance', 'Power', 'Sophistication', 'Mystery', 'Authority', 'Formality'],
        emotions: 'Black is sophisticated and timeless. It represents power, elegance, and formality. Creates strong contrast and makes other colors stand out. Can be overwhelming if overused.',
        positive: 'Elegant, sophisticated, powerful, classic, formal, authoritative',
        negative: 'Depressing, pessimistic, cold, heavy, evil',
        useCases: ['Luxury brands', 'Fashion', 'High-end products', 'Technology', 'Professional services', 'Formal events']
      },
      {
        name: 'White',
        hex: '#FFFFFF',
        meanings: ['Purity', 'Simplicity', 'Cleanliness', 'Innocence', 'Peace', 'Minimalism'],
        emotions: 'White represents purity, cleanliness, and simplicity. It creates a sense of space and minimalism. Highly versatile and essential for creating breathing room in design.',
        positive: 'Pure, clean, simple, peaceful, innocent, spacious',
        negative: 'Sterile, cold, empty, clinical, distant',
        useCases: ['Healthcare', 'Minimalist design', 'Weddings', 'Modern tech', 'Backgrounds', 'Premium products']
      },
      {
        name: 'Gray',
        hex: '#95999C',
        meanings: ['Neutrality', 'Balance', 'Professionalism', 'Calm', 'Maturity', 'Timelessness'],
        emotions: 'Gray is the ultimate neutral color representing balance and sophistication. It creates a professional and timeless feel. Works well as a background color to highlight other elements.',
        positive: 'Professional, sophisticated, neutral, balanced, calm, timeless',
        negative: 'Boring, dull, depressing, lifeless, moody',
        useCases: ['Corporate design', 'Professional services', 'Technology', 'Backgrounds', 'Neutral contexts', 'Modern architecture']
      }
    ];
    
    function renderColors() {
      const grid = document.getElementById('colorsGrid');
      
      grid.innerHTML = colorPsychology.map(color => `
        <div class="color-psychology-card">
          <div class="color-visual" style="--color: ${color.hex}">
            <div class="color-name">${color.name}</div>
            <div class="color-hex" onclick="copyColor('${color.hex}', event)">${color.hex}</div>
          </div>
          <div class="color-content">
            <div class="section">
              <div class="section-title">💡 Meanings & Associations</div>
              <div class="tags">
                ${color.meanings.map(m => `<span class="tag">${m}</span>`).join('')}
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">🧠 Psychological Effects</div>
              <div class="section-content">${color.emotions}</div>
            </div>
            
            <div class="section">
              <div class="section-title">✅ Positive Associations</div>
              <div class="section-content">${color.positive}</div>
            </div>
            
            <div class="section">
              <div class="section-title">⚠️ Negative Associations</div>
              <div class="section-content">${color.negative}</div>
            </div>
            
            <div class="section">
              <div class="section-title">🎯 Best Use Cases</div>
              <div class="use-cases">
                ${color.useCases.map(uc => `<div class="use-case">• ${uc}</div>`).join('')}
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }
    
    function copyColor(hex, event) {
      event.stopPropagation();
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied ${hex}`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }
    
    renderColors();

const colorPsychology = [
      {
        name: 'Red',
        hex: '#E63946',
        meanings: ['Passion', 'Energy', 'Danger', 'Love', 'Power', 'Excitement'],
        emotions: 'Red evokes strong emotions and stimulates appetite. It increases heart rate and creates urgency. Often used to grab attention and create a sense of immediacy.',
        positive: 'Bold, energetic, passionate, confident, powerful, stimulating',
        negative: 'Aggressive, domineering, demanding, intense, alarming',
        useCases: ['Call-to-action buttons', 'Sales and clearance', 'Food industry', 'Emergency services', 'Sports brands', 'Valentine\'s Day']
      },
      {
        name: 'Orange',
        hex: '#F77F00',
        meanings: ['Creativity', 'Adventure', 'Enthusiasm', 'Success', 'Energy', 'Warmth'],
        emotions: 'Orange combines the energy of red and the happiness of yellow. It represents enthusiasm, creativity, and determination. Creates feelings of warmth and excitement.',
        positive: 'Cheerful, friendly, confident, creative, adventurous, warm',
        negative: 'Superficial, loud, overpowering, attention-seeking',
        useCases: ['E-commerce sites', 'Children\'s products', 'Creative agencies', 'Fitness brands', 'Entertainment', 'Technology startups']
      },
      {
        name: 'Yellow',
        hex: '#FFD60A',
        meanings: ['Happiness', 'Optimism', 'Caution', 'Clarity', 'Warmth', 'Joy'],
        emotions: 'Yellow is the brightest color and stimulates mental activity. It evokes feelings of happiness, positivity, and optimism. Can also signal caution when paired with black.',
        positive: 'Optimistic, cheerful, bright, creative, energetic, confident',
        negative: 'Irritating, impatient, critical, cowardly, anxious',
        useCases: ['Highlight important info', 'Children\'s products', 'Summer campaigns', 'Caution signs', 'Food packaging', 'Clearance sales']
      },
      {
        name: 'Green',
        hex: '#06A77D',
        meanings: ['Nature', 'Growth', 'Harmony', 'Health', 'Money', 'Freshness'],
        emotions: 'Green is the most restful color for the eye. It represents nature, growth, and renewal. Creates feelings of balance, stability, and environmental awareness.',
        positive: 'Natural, balanced, healthy, fresh, calm, prosperous',
        negative: 'Boring, stagnant, bland, jealous, materialistic',
        useCases: ['Environmental brands', 'Health & wellness', 'Financial services', 'Organic products', 'Call-to-action buttons', 'Sustainability']
      },
      {
        name: 'Blue',
        hex: '#457B9D',
        meanings: ['Trust', 'Stability', 'Calm', 'Loyalty', 'Intelligence', 'Serenity'],
        emotions: 'Blue is the most universally preferred color. It creates a sense of calm, trust, and professionalism. Reduces appetite and promotes productivity.',
        positive: 'Trustworthy, dependable, calm, intelligent, serene, loyal',
        negative: 'Cold, aloof, unfriendly, unemotional, predictable',
        useCases: ['Corporate brands', 'Healthcare', 'Technology', 'Social media', 'Financial institutions', 'Professional services']
      },
      {
        name: 'Purple',
        hex: '#9D4EDD',
        meanings: ['Luxury', 'Royalty', 'Creativity', 'Wisdom', 'Mystery', 'Magic'],
        emotions: 'Purple combines the stability of blue and the energy of red. It represents luxury, creativity, and spirituality. Often associated with imagination and sophistication.',
        positive: 'Luxurious, creative, wise, spiritual, mysterious, imaginative',
        negative: 'Exotic, overly introspective, immature, extravagant',
        useCases: ['Luxury brands', 'Beauty products', 'Creative services', 'Spiritual/wellness', 'Education', 'Children\'s fantasy']
      },
      {
        name: 'Pink',
        hex: '#FF006E',
        meanings: ['Love', 'Romance', 'Compassion', 'Youth', 'Playfulness', 'Femininity'],
        emotions: 'Pink has a calming effect and is associated with nurturing and compassion. It represents sweetness, innocence, and femininity. Can also appear modern and edgy in brighter shades.',
        positive: 'Romantic, compassionate, youthful, playful, nurturing, sweet',
        negative: 'Immature, weak, over-emotional, inhibition, feminine stereotype',
        useCases: ['Beauty & cosmetics', 'Fashion brands', 'Romance products', 'Women\'s products', 'Charity campaigns', 'Modern design']
      },
      {
        name: 'Brown',
        hex: '#8B4513',
        meanings: ['Reliability', 'Stability', 'Honesty', 'Nature', 'Warmth', 'Comfort'],
        emotions: 'Brown is an earthy color associated with reliability and comfort. It creates feelings of warmth, stability, and wholesome simplicity. Often underused but highly effective.',
        positive: 'Reliable, stable, warm, comfortable, natural, wholesome',
        negative: 'Dull, boring, predictable, dirty, cheap',
        useCases: ['Coffee brands', 'Outdoor products', 'Natural/organic', 'Real estate', 'Law firms', 'Construction']
      },
      {
        name: 'Black',
        hex: '#1A1A1A',
        meanings: ['Elegance', 'Power', 'Sophistication', 'Mystery', 'Authority', 'Formality'],
        emotions: 'Black is sophisticated and timeless. It represents power, elegance, and formality. Creates strong contrast and makes other colors stand out. Can be overwhelming if overused.',
        positive: 'Elegant, sophisticated, powerful, classic, formal, authoritative',
        negative: 'Depressing, pessimistic, cold, heavy, evil',
        useCases: ['Luxury brands', 'Fashion', 'High-end products', 'Technology', 'Professional services', 'Formal events']
      },
      {
        name: 'White',
        hex: '#FFFFFF',
        meanings: ['Purity', 'Simplicity', 'Cleanliness', 'Innocence', 'Peace', 'Minimalism'],
        emotions: 'White represents purity, cleanliness, and simplicity. It creates a sense of space and minimalism. Highly versatile and essential for creating breathing room in design.',
        positive: 'Pure, clean, simple, peaceful, innocent, spacious',
        negative: 'Sterile, cold, empty, clinical, distant',
        useCases: ['Healthcare', 'Minimalist design', 'Weddings', 'Modern tech', 'Backgrounds', 'Premium products']
      },
      {
        name: 'Gray',
        hex: '#95999C',
        meanings: ['Neutrality', 'Balance', 'Professionalism', 'Calm', 'Maturity', 'Timelessness'],
        emotions: 'Gray is the ultimate neutral color representing balance and sophistication. It creates a professional and timeless feel. Works well as a background color to highlight other elements.',
        positive: 'Professional, sophisticated, neutral, balanced, calm, timeless',
        negative: 'Boring, dull, depressing, lifeless, moody',
        useCases: ['Corporate design', 'Professional services', 'Technology', 'Backgrounds', 'Neutral contexts', 'Modern architecture']
      }
    ];
    
    function renderColors() {
      const grid = document.getElementById('colorsGrid');
      
      grid.innerHTML = colorPsychology.map(color => `
        <div class="color-psychology-card">
          <div class="color-visual" style="--color: ${color.hex}">
            <div class="color-name">${color.name}</div>
            <div class="color-hex" onclick="copyColor('${color.hex}', event)">${color.hex}</div>
          </div>
          <div class="color-content">
            <div class="section">
              <div class="section-title">💡 Meanings & Associations</div>
              <div class="tags">
                ${color.meanings.map(m => `<span class="tag">${m}</span>`).join('')}
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">🧠 Psychological Effects</div>
              <div class="section-content">${color.emotions}</div>
            </div>
            
            <div class="section">
              <div class="section-title">✅ Positive Associations</div>
              <div class="section-content">${color.positive}</div>
            </div>
            
            <div class="section">
              <div class="section-title">⚠️ Negative Associations</div>
              <div class="section-content">${color.negative}</div>
            </div>
            
            <div class="section">
              <div class="section-title">🎯 Best Use Cases</div>
              <div class="use-cases">
                ${color.useCases.map(uc => `<div class="use-case">• ${uc}</div>`).join('')}
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }
    
    function copyColor(hex, event) {
      event.stopPropagation();
      navigator.clipboard.writeText(hex).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `Copied ${hex}`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.textContent = 'Copied to clipboard!', 300);
        }, 2000);
      });
    }
    
    renderColors();


