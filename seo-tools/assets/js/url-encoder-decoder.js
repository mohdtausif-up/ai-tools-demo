function encodeURL() {
      const input = document.getElementById('inputText').value;
      try {
        const encoded = encodeURIComponent(input);
        document.getElementById('outputText').value = encoded;
      } catch (error) {
        alert('Error encoding URL');
      }
    }

    function decodeURL() {
      const input = document.getElementById('inputText').value;
      try {
        const decoded = decodeURIComponent(input);
        document.getElementById('outputText').value = decoded;
      } catch (error) {
        alert('Error decoding URL');
      }
    }

    function copyOutput() {
      const output = document.getElementById('outputText');
      output.select();
      navigator.clipboard.writeText(output.value).then(() => {
        alert('Copied to clipboard!');
      });
    }

    function clearAll() {
      document.getElementById('inputText').value = '';
      document.getElementById('outputText').value = '';
    }
