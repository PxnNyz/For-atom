document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const previewContainer = document.getElementById('image-preview-container');
    const imagePreview = document.getElementById('image-preview');
    const analyzeBtn = document.getElementById('analyze-btn');
    
    if (uploadArea) {
        // Add event listeners for drag and drop functionality
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, unhighlight, false);
        });
        
        function highlight() {
            uploadArea.classList.add('highlight');
        }
        
        function unhighlight() {
            uploadArea.classList.remove('highlight');
        }
        
        // Handle file drop
        uploadArea.addEventListener('drop', handleDrop, false);
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            
            if (files.length) {
                fileInput.files = files;
                updateImagePreview(files[0]);
            }
        }
        
        // Handle click to upload
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });
        
        // Handle file selection
        fileInput.addEventListener('change', function() {
            if (fileInput.files.length) {
                updateImagePreview(fileInput.files[0]);
            }
        });
        
        // Update image preview
        function updateImagePreview(file) {
            // Check if file is an image
            if (!file.type.match('image.*')) {
                alert('Please upload an image file (jpg, jpeg, png)');
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Display image preview
                imagePreview.src = e.target.result;
                previewContainer.style.display = 'block';
                
                // Enable analyze button
                analyzeBtn.disabled = false;
                
                // Add uploaded class to change the appearance
                uploadArea.classList.add('uploaded');
            }
            
            reader.readAsDataURL(file);
        }
    }
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
