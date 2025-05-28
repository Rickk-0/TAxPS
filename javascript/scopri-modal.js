const scopriToggle = document.getElementById('scopriToggle');
        const scopriModalOverlay = document.getElementById('scopriModalOverlay');
        const scopriModalClose = document.getElementById('scopriModalClose');

        scopriToggle.addEventListener('click', function(e) {
            e.preventDefault();
            scopriModalOverlay.classList.add('active');
            // Close social dropdown if open
            socialDropdown.classList.remove('active');
        });

        scopriModalClose.addEventListener('click', function() {
            scopriModalOverlay.classList.remove('active');
        });

        // Close scopri modal when clicking on overlay
        scopriModalOverlay.addEventListener('click', function(e) {
            if (e.target === scopriModalOverlay) {
                scopriModalOverlay.classList.remove('active');
            }
        });