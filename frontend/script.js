// --- 1. Background Particles ---
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Randomize size, position, and animation delay
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(particle);
    }
}

createParticles();

// --- 2. Contact Form Handling ---
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const statusDiv = document.getElementById('formStatus');
    const submitBtn = e.target.querySelector('button');

    // UI Loading state
    submitBtn.textContent = 'Transmitting...';
    submitBtn.disabled = true;

    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();

        if (response.ok) {
            statusDiv.textContent = data.success;
            statusDiv.className = 'mt-4 text-center text-green-400 font-bold';
            document.getElementById('contactForm').reset();
        } else {
            statusDiv.textContent = data.error || 'Transmission failed.';
            statusDiv.className = 'mt-4 text-center text-red-400 font-bold';
        }
    } catch (error) {
        statusDiv.textContent = 'Error: Cannot reach the server.';
        statusDiv.className = 'mt-4 text-center text-red-400 font-bold';
    } finally {
        statusDiv.classList.remove('hidden');
        submitBtn.textContent = 'Send Transmission';
        submitBtn.disabled = false;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            statusDiv.classList.add('hidden');
        }, 5000);
    }
});