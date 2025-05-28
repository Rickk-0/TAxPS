
        // Social dropdown functionality
        const socialToggle = document.getElementById('socialToggle');
        const socialDropdown = document.getElementById('socialDropdown');

        socialToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            socialDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!socialToggle.contains(e.target) && !socialDropdown.contains(e.target)) {
                socialDropdown.classList.remove('active');
            }
        });

        // Prevent dropdown from closing when clicking inside it
        socialDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Close dropdown when pressing escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                socialDropdown.classList.remove('active');
            }
        });
    
