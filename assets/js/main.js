/* ===================================================
   Khaled Mohamed - AI & ML Engineer Portfolio
   Interactive Features & Animations
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. TYPEWRITER EFFECT ---
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const roles = [
      'AI Engineer',
      'Machine Learning Specialist',
      'Computer Vision Researcher',
      'Data Analytics Expert'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 110;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 1800; // Pause at full word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400; // Pause before typing next word
      }

      setTimeout(type, typeSpeed);
    }
    type();
  }

  // --- 2. PARTICLE CONSTELLATION CANVAS ---
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    let mouse = { x: null, y: null, radius: 120 };

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.speedY = (Math.random() - 0.5) * 0.7;
        this.color = Math.random() > 0.4 ? 'rgba(0, 245, 255, ' : 'rgba(124, 58, 237, ';
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Mouse interaction
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * 2;
            this.y -= (dy / distance) * force * 2;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(0, 245, 255, 0.4)';
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 14000), 100);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            const opacity = 0.15 * (1 - distance / 110);
            ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connectParticles();
      animationFrameId = requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    resizeCanvas();
    animateParticles();
  }

  // --- 3. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHT ---
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('navbar-scrolled');
    } else {
      navbar?.classList.remove('navbar-scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    // Back to top button visibility
    const btt = document.getElementById('back-to-top');
    if (btt) {
      if (window.scrollY > 400) {
        btt.classList.add('visible');
      } else {
        btt.classList.remove('visible');
      }
    }
  });

  // Smooth scroll back to top
  const bttBtn = document.getElementById('back-to-top');
  if (bttBtn) {
    bttBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 4. HAMBURGER MENU ---
  const hamburger = document.getElementById('hamburger-btn');
  const navLinksContainer = document.getElementById('nav-links');
  if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinksContainer.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('open');
      });
    });
  }

  // --- 5. ANIMATED STAT COUNTERS ---
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  function runStatCounters() {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-count');
      let count = 0;
      const step = Math.max(1, Math.floor(target / 40));
      const interval = setInterval(() => {
        count += step;
        if (count >= target) {
          count = target;
          clearInterval(interval);
        }
        stat.textContent = count;
      }, 35);
    });
  }

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          runStatCounters();
        }
      });
    }, { threshold: 0.5 });
    statsObserver.observe(heroStats);
  }

  // --- 6. SKILL BARS FILL ANIMATION ---
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillsSection = document.getElementById('skills');

  if (skillsSection && skillBars.length > 0) {
    let animatedSkills = false;
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedSkills) {
          animatedSkills = true;
          skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
          });
        }
      });
    }, { threshold: 0.25 });
    skillsObserver.observe(skillsSection);
  }

  // --- 7. FREELANCE PACKAGE QUICK-SELECT ---
  const serviceButtons = document.querySelectorAll('.btn-service');
  const serviceSelect = document.getElementById('contact-service');
  const contactMsg = document.getElementById('contact-message');

  serviceButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.id;
      let packageValue = '';
      let defaultMsg = '';

      if (id.includes('bronze')) {
        packageValue = 'bronze';
        defaultMsg = 'Hi Khaled, I would like to book the Bronze Package ($30) for Data Analysis & Exploratory Insights. My dataset is...';
      } else if (id.includes('silver')) {
        packageValue = 'silver';
        defaultMsg = 'Hi Khaled, I would like to book the Silver Package ($50) for an End-to-End Machine Learning Model. Our goal is...';
      } else if (id.includes('premium')) {
        packageValue = 'premium';
        defaultMsg = 'Hi Khaled, I am interested in the Premium Package ($70) for Computer Vision / Deep Learning + Web Deployment. We need...';
      }

      if (serviceSelect && packageValue) {
        serviceSelect.value = packageValue;
      }
      if (contactMsg && defaultMsg && !contactMsg.value.trim()) {
        contactMsg.value = defaultMsg;
      }
    });
  });

  // --- 8. CONTACT FORM SUBMISSION ---
  const contactForm = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success-msg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const btnText = submitBtn?.querySelector('.btn-text');

      // Simple validation
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all required fields (Name, Email, and Message).');
        return;
      }

      // Visual feedback
      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Sending...';

      setTimeout(() => {
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Send Message';
        contactForm.reset();
        if (successMsg) {
          successMsg.style.display = 'flex';
          setTimeout(() => {
            successMsg.style.display = 'none';
          }, 6000);
        }
      }, 1200);
    });
  }

  // --- 9. PROJECT MODAL / LIGHTBOX VIEWER ---
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalImg = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalDetails = document.getElementById('modal-details');

  const projectData = {
    da: {
      title: 'Retail Store Sales — Exploratory Data Analysis & Predictive Modeling',
      subtitle: 'Data Analysis • retail_store_sales.csv (404.csv) • Jupyter Notebook',
      image: 'assets/images/da_project.jpg',
      details: `
        <div class="modal-section">
          <h4>📌 Project Scope & Dataset Context</h4>
          <p>Comprehensive exploratory data analysis and statistical modeling on a retail sales dataset. Implements mode imputation for missing items grouped by category, datetime transaction parsing, and custom feature engineering: <code>Total_Price</code>, <code>Seasons</code>, and <code>Total Discount</code>.</p>
        </div>
        <div class="modal-section">
          <h4>📊 Key Visualizations & Findings (15+ Charts)</h4>
          <ul>
            <li><strong>Yearly Category Performance:</strong> Grouped bar plots analyzing transaction counts and revenue evolution.</li>
            <li><strong>Temporal & Seasonal Heatmaps:</strong> Category sales concentration across months and seasonal shifts.</li>
            <li><strong>Payment Method Patterns:</strong> Cross-tabulation & stacked bars comparing Cash, Credit Card, and Digital Wallet across categories.</li>
            <li><strong>Item Distribution & Pricing:</strong> Violin plots for top 5 highest priced items and strip plots for volume distribution per category.</li>
            <li><strong>Regional Analytics:</strong> Geographic transaction share (pie charts) and location-based revenue per year.</li>
          </ul>
        </div>
        <div class="modal-section">
          <h4>⚙️ Models & Machine Learning</h4>
          <ul>
            <li><strong>KNN Classification:</strong> Price quartile multi-class prediction with standardized features.</li>
            <li><strong>Clustering:</strong> K-Means and Agglomerative Hierarchical Clustering with linkage dendrograms.</li>
            <li><strong>Linear Regression & 5-Fold Cross-Validation:</strong> Predictive modeling evaluated with MAE, MSE, RMSE, and R² score.</li>
          </ul>
        </div>
      `
    },
    ml: {
      title: 'AI-Powered Customer Intelligence & Recommendation System',
      subtitle: 'Applied Machine Learning • Womens Clothing E-Commerce Reviews (~23,500 records)',
      image: 'assets/images/ml_project.jpg',
      details: `
        <div class="modal-section">
          <h4>📌 Project Architecture</h4>
          <p>End-to-end modular production pipeline (<code>DataPreprocessor</code>, <code>NLPProcessor</code>, <code>FeatureEngineer</code>, <code>ClusteringEngine</code>, <code>ClassificationEngine</code>, <code>Visualizer</code>, <code>BusinessInsightGenerator</code>) paired with an interactive Streamlit application.</p>
        </div>
        <div class="modal-section">
          <h4>🧠 NLP & Sentiment Analysis</h4>
          <p>Employs VADER SentimentIntensityAnalyzer to compute compound polarity scores classifying reviews into Positive, Neutral, and Negative sentiments. Generates customer review WordClouds and sentiment distribution charts.</p>
        </div>
        <div class="modal-section">
          <h4>🎯 Dual Unsupervised Customer Segmentation</h4>
          <ul>
            <li><strong>K-Means Clustering:</strong> Automated optimal K selection via Elbow method and Silhouette score analysis across <em>k ∈ [2, 8]</em>.</li>
            <li><strong>DBSCAN:</strong> Density-based spatial clustering with automatic epsilon estimation via k-distance graph.</li>
            <li><strong>Dimensionality Reduction:</strong> 2D and 3D PCA projection for cluster visualization.</li>
          </ul>
        </div>
        <div class="modal-section">
          <h4>🚀 Supervised Recommendation & Live Deployment</h4>
          <ul>
            <li><strong>KNN Classifier:</strong> Hyperparameter tuning across <em>k ∈ [3, 19]</em> for recommendation prediction with complete confusion matrix, precision, recall, and F1 evaluation.</li>
            <li><strong>Automated Business Insights:</strong> Translates cluster profiles into strategic business recommendations.</li>
            <li><strong>Streamlit Dashboard:</strong> Interactive web dashboard with real-time customer segment prediction and Plotly visualizations.</li>
          </ul>
        </div>
      `
    },
    cv: {
      title: 'Weather Image Classification & Error Analysis System',
      subtitle: 'Computer Vision • Weather Dataset (4 Classes) • ResNet Img2Vec Embeddings',
      image: 'assets/images/cv_project.jpg',
      details: `
        <div class="modal-section">
          <h4>📌 Overview & Multi-Class Dataset</h4>
          <p>Deep feature extraction and machine learning classification pipeline for weather condition identification across 4 classes: <strong>cloudy</strong>, <strong>rain</strong>, <strong>shine</strong>, and <strong>sunrise</strong>.</p>
        </div>
        <div class="modal-section">
          <h4>🔬 Deep Feature Extraction & Data Augmentation</h4>
          <ul>
            <li><strong>Img2Vec-PyTorch:</strong> Leverages a pretrained deep ResNet CNN backbone to transform 224×224 images into dense high-level semantic embedding vectors.</li>
            <li><strong>Augmentation Pipeline:</strong> Random horizontal flips, rotation jitter (±15°), and brightness variations (0.8–1.2×) for training generalization.</li>
          </ul>
        </div>
        <div class="modal-section">
          <h4>📈 Model Training & Manifold Analytics</h4>
          <ul>
            <li><strong>GridSearchCV Random Forest & SVM:</strong> Hyperparameter search across <code>n_estimators</code> (100, 300, 500), <code>max_depth</code>, <code>min_samples_split</code>.</li>
            <li><strong>t-SNE Manifold Visualization:</strong> 2D projection of deep image embeddings demonstrating tight class separation.</li>
            <li><strong>Misclassification Inspector:</strong> Automated visual diagnostics pinpointing and rendering misclassified test samples with true vs predicted labels.</li>
          </ul>
        </div>
        <div class="modal-section">
          <h4>🖥️ Graphical User Interface (GUI) & Interactive Inference</h4>
          <p>Includes a dedicated PySimpleGUI desktop application (<code>gui_app.py</code>) and interactive CLI (<code>interactive.py</code>) enabling users to select any image file and receive instant weather prediction with confidence scoring.</p>
        </div>
      `
    }
  };

  function openProjectModal(key) {
    const data = projectData[key];
    if (!data || !modal) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalSubtitle) modalSubtitle.textContent = data.subtitle;
    if (modalImg) {
      modalImg.src = data.image;
      modalImg.alt = data.title;
    }
    if (modalDetails) modalDetails.innerHTML = data.details;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeProjectModal);
  }

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeProjectModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // Attach click events to project cards and image overlays
  document.getElementById('project-card-da')?.addEventListener('click', () => openProjectModal('da'));
  document.getElementById('project-card-ml')?.addEventListener('click', () => openProjectModal('ml'));
  document.getElementById('project-card-cv')?.addEventListener('click', () => openProjectModal('cv'));

});
