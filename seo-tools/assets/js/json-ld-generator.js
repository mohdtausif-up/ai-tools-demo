let currentSchema = 'organization';

    const schemas = {
      organization: [
        { name: 'name', label: 'Organization Name', type: 'text', value: 'Acme Corporation' },
        { name: 'url', label: 'Website URL', type: 'url', value: 'https://example.com' },
        { name: 'logo', label: 'Logo URL', type: 'url', value: 'https://example.com/logo.png' },
        { name: 'description', label: 'Description', type: 'textarea', value: 'Leading provider of innovative solutions' },
        { name: 'contactEmail', label: 'Contact Email', type: 'email', value: 'contact@example.com' },
        { name: 'contactPhone', label: 'Contact Phone', type: 'tel', value: '+1-234-567-8900' }
      ],
      article: [
        { name: 'headline', label: 'Article Headline', type: 'text', value: 'Amazing Article Title' },
        { name: 'description', label: 'Description', type: 'textarea', value: 'A comprehensive guide to everything you need to know' },
        { name: 'author', label: 'Author Name', type: 'text', value: 'John Doe' },
        { name: 'datePublished', label: 'Published Date', type: 'date', value: '2025-01-01' },
        { name: 'image', label: 'Image URL', type: 'url', value: 'https://example.com/article-image.jpg' },
        { name: 'publisher', label: 'Publisher Name', type: 'text', value: 'Example Publisher' }
      ],
      product: [
        { name: 'name', label: 'Product Name', type: 'text', value: 'Awesome Product' },
        { name: 'description', label: 'Description', type: 'textarea', value: 'High-quality product with amazing features' },
        { name: 'image', label: 'Image URL', type: 'url', value: 'https://example.com/product.jpg' },
        { name: 'price', label: 'Price', type: 'number', value: '99.99' },
        { name: 'currency', label: 'Currency Code', type: 'text', value: 'USD' },
        { name: 'brand', label: 'Brand Name', type: 'text', value: 'BrandName' }
      ],
      person: [
        { name: 'name', label: 'Full Name', type: 'text', value: 'Jane Smith' },
        { name: 'jobTitle', label: 'Job Title', type: 'text', value: 'CEO & Founder' },
        { name: 'url', label: 'Website URL', type: 'url', value: 'https://janesmith.com' },
        { name: 'image', label: 'Photo URL', type: 'url', value: 'https://example.com/jane.jpg' },
        { name: 'email', label: 'Email', type: 'email', value: 'jane@example.com' },
        { name: 'telephone', label: 'Phone', type: 'tel', value: '+1-234-567-8900' }
      ],
      event: [
        { name: 'name', label: 'Event Name', type: 'text', value: 'Annual Conference 2025' },
        { name: 'description', label: 'Description', type: 'textarea', value: 'Join us for an amazing event' },
        { name: 'startDate', label: 'Start Date', type: 'datetime-local', value: '2025-06-15T09:00' },
        { name: 'endDate', label: 'End Date', type: 'datetime-local', value: '2025-06-15T17:00' },
        { name: 'location', label: 'Location', type: 'text', value: 'Convention Center, New York' },
        { name: 'image', label: 'Image URL', type: 'url', value: 'https://example.com/event.jpg' }
      ],
      recipe: [
        { name: 'name', label: 'Recipe Name', type: 'text', value: 'Delicious Chocolate Cake' },
        { name: 'description', label: 'Description', type: 'textarea', value: 'Rich and moist chocolate cake' },
        { name: 'author', label: 'Author Name', type: 'text', value: 'Chef Gordon' },
        { name: 'prepTime', label: 'Prep Time (minutes)', type: 'number', value: '30' },
        { name: 'cookTime', label: 'Cook Time (minutes)', type: 'number', value: '45' },
        { name: 'image', label: 'Image URL', type: 'url', value: 'https://example.com/cake.jpg' }
      ]
    };

    function init() {
      loadSchemaFields('organization');
    }

    function selectSchema(schema) {
      currentSchema = schema;
      document.querySelectorAll('.schema-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.schema === schema);
      });
      loadSchemaFields(schema);
    }

    function loadSchemaFields(schema) {
      const container = document.getElementById('schemaFields');
      container.innerHTML = '';

      schemas[schema].forEach(field => {
        const group = document.createElement('div');
        group.className = 'input-group';
        
        const label = document.createElement('label');
        label.className = 'input-label';
        label.textContent = field.label;
        
        let input;
        if (field.type === 'textarea') {
          input = document.createElement('textarea');
        } else {
          input = document.createElement('input');
          input.type = field.type;
        }
        input.className = 'input-field';
        input.value = field.value;
        input.dataset.fieldName = field.name;
        input.addEventListener('input', generateJsonLd);
        
        group.appendChild(label);
        group.appendChild(input);
        container.appendChild(group);
      });

      generateJsonLd();
    }

    function generateJsonLd() {
      const fields = document.querySelectorAll('#schemaFields .input-field');
      const data = {};

      fields.forEach(field => {
        const value = field.value.trim();
        if (value) {
          data[field.dataset.fieldName] = value;
        }
      });

      let jsonld = {};

      switch (currentSchema) {
        case 'organization':
          jsonld = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": data.name || "",
            "url": data.url || "",
            "logo": data.logo || "",
            "description": data.description || "",
            "contactPoint": {
              "@type": "ContactPoint",
              "email": data.contactEmail || "",
              "telephone": data.contactPhone || ""
            }
          };
          break;

        case 'article':
          jsonld = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": data.headline || "",
            "description": data.description || "",
            "image": data.image || "",
            "author": {
              "@type": "Person",
              "name": data.author || ""
            },
            "publisher": {
              "@type": "Organization",
              "name": data.publisher || ""
            },
            "datePublished": data.datePublished || ""
          };
          break;

        case 'product':
          jsonld = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": data.name || "",
            "description": data.description || "",
            "image": data.image || "",
            "brand": {
              "@type": "Brand",
              "name": data.brand || ""
            },
            "offers": {
              "@type": "Offer",
              "price": data.price || "",
              "priceCurrency": data.currency || "USD"
            }
          };
          break;

        case 'person':
          jsonld = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": data.name || "",
            "jobTitle": data.jobTitle || "",
            "url": data.url || "",
            "image": data.image || "",
            "email": data.email || "",
            "telephone": data.telephone || ""
          };
          break;

        case 'event':
          jsonld = {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": data.name || "",
            "description": data.description || "",
            "startDate": data.startDate || "",
            "endDate": data.endDate || "",
            "location": {
              "@type": "Place",
              "name": data.location || ""
            },
            "image": data.image || ""
          };
          break;

        case 'recipe':
          jsonld = {
            "@context": "https://schema.org",
            "@type": "Recipe",
            "name": data.name || "",
            "description": data.description || "",
            "author": {
              "@type": "Person",
              "name": data.author || ""
            },
            "prepTime": `PT${data.prepTime || 0}M`,
            "cookTime": `PT${data.cookTime || 0}M`,
            "image": data.image || ""
          };
          break;
      }

      const jsonString = JSON.stringify(jsonld, null, 2);
      const highlighted = jsonString
        .replace(/"(@[^"]+)":/g, '<span class="syntax-property">"$1"</span>:')
        .replace(/"([^"@][^"]+)":/g, '<span class="syntax-property">"$1"</span>:')
        .replace(/: "([^"]+)"/g, ': <span class="syntax-string">"$1"</span>')
        .replace(/: (\d+)/g, ': <span class="syntax-value">$1</span>');

      document.getElementById('jsonldOutput').innerHTML = highlighted;
    }

    function copyJsonLd() {
      const output = document.getElementById('jsonldOutput').textContent;
      navigator.clipboard.writeText(output).then(() => {
        showToast('JSON-LD copied to clipboard!');
      });
    }

    function downloadJsonLd() {
      const output = document.getElementById('jsonldOutput').textContent;
      const blob = new Blob([output], { type: 'application/ld+json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentSchema}-schema.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('JSON-LD downloaded!');
    }

    function showToast(message) {
      const existingToast = document.querySelector('.toast');
      if (existingToast) existingToast.remove();
      
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => toast.remove(), 3000);
    }

    init();
