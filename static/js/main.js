document.addEventListener("DOMContentLoaded", () => {
    
    // Typing Effect for Hero Section
    const typeTarget = document.querySelector('.type-effect');
    if (typeTarget) {
        const words = ['Customers', 'Revenue', 'Loyalty', 'Insights'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typeTarget.innerText = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeTarget.innerText = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 30 : 60;
            
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 1500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 300;
            }
            
            setTimeout(type, typeSpeed);
        }
        setTimeout(type, 1000);
    }
    
    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counter.innerText = '0';
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const c = +counter.innerText.replace(/,/g, '');
            const increment = target / 100;
            if (c < target) {
                let nextVal = Math.ceil(c + increment);
                if(target % 1 !== 0) {
                   counter.innerText = (c + increment).toFixed(1);
                } else {
                   counter.innerText = nextVal > target ? target : nextVal.toLocaleString();
                }
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target % 1 !== 0 ? target : target.toLocaleString();
            }
        };
        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        });
        observer.observe(counter);
    });

    // Prediction Form AJAX (Supercharged)
    const predictForm = document.getElementById('predictForm');
    if (predictForm) {
        predictForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const loader = document.getElementById('predictLoader');
            const resultArea = document.getElementById('resultArea');
            loader.classList.remove('d-none');
            
            const data = {
                session_id: document.getElementById('sessionId').value,
                country: document.getElementById('country').value,
                category: document.getElementById('category').value,
                clicks: document.getElementById('clicks').value,
                price: document.getElementById('price').value,
                duration: document.getElementById('duration').value
            };
            
            try {
                // We map all requests closely
                const [classRes, revRes, churnRes, nextRes, recRes] = await Promise.all([
                    fetch('/predict_conversion', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) }).then(r=>r.json()),
                    fetch('/predict_revenue', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) }).then(r=>r.json()),
                    fetch('/churn_prediction', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) }).then(r=>r.json()),
                    fetch('/predict_next_action', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) }).then(r=>r.json()),
                    fetch('/recommend_products', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) }).then(r=>r.json())
                ]);
                
                // Render Conversion
                const convText = document.getElementById('conversionText');
                if (classRes.prediction === 1) {
                    convText.innerText = "Likely to Convert";
                    convText.className = "mb-2 text-success fw-bold";
                } else {
                    convText.innerText = "Unlikely to Convert";
                    convText.className = "mb-2 text-danger fw-bold";
                }
                document.getElementById('confidenceText').innerText = `Confidence: ${classRes.confidence_score}%`;
                document.getElementById('convExp').innerText = classRes.explanation;
                
                // Render Revenue
                document.getElementById('revenueText').innerText = `$${revRes.prediction}`;
                document.getElementById('revExp').innerText = revRes.explanation;
                
                // Render Churn
                const churnEl = document.getElementById('churnText');
                if (churnRes.prediction === 1) {
                    churnEl.innerText = "High Risk";
                    churnEl.className = "mb-2 text-danger fw-bold";
                } else {
                    churnEl.innerText = "Low Risk / Safe";
                    churnEl.className = "mb-2 text-success fw-bold";
                }
                document.getElementById('churnExp').innerText = churnRes.explanation;
                
                // Render Next
                document.getElementById('nextText').innerText = nextRes.prediction;
                document.getElementById('nextExp').innerText = nextRes.explanation;
                
                // Render Recommends
                const recList = document.getElementById('recList');
                recList.innerHTML = "";
                if(recRes.prediction && recRes.prediction.recommended) {
                    recRes.prediction.recommended.forEach(item => {
                        recList.innerHTML += `<li><i class="fa-solid fa-check text-primary me-2"></i>${item}</li>`;
                    });
                }
                document.getElementById('recExp').innerText = recRes.explanation;
                
                resultArea.classList.remove('d-none');
                gsap.fromTo(resultArea, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5});
            } catch (err) {
                alert("API connection failed. Make sure backend is running on correct ports.");
                console.error(err);
            } finally {
                loader.classList.add('d-none');
            }
        });
    }

    // Upload Data
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    
    if (fileInput && uploadBtn) {
        uploadBtn.addEventListener('click', async () => {
             // simplified for brevity...
             const formData = new FormData();
             formData.append('file', fileInput.files[0]);
             try {
                const res = await fetch('/upload_data', { method: 'POST', body: formData }).then(r=>r.json());
                if (res.status === 'success') {
                    document.getElementById('toastMessage').innerText = res.message;
                    new bootstrap.Toast(document.getElementById('uploadToast')).show();
                } else {
                    alert(res.error);
                }
             } catch(e) { console.error(e); }
        });
    }
});
