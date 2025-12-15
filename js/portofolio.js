// بيانات المشاريع
const projectsData = {
    1: {
        title: "The Hillside Residence",
        type: "Built Project",
        price: 0,
        description: "A contemporary hillside residence featuring innovative structural design that harmonizes with the natural landscape. This project showcases our expertise in sustainable architecture with passive solar design and local material integration.",
        image: "/img/getCroppedImage(1).jpg",
        category: "projects",
        features: [
            "Sustainable architecture design",
            "Passive solar orientation",
            "Local material integration",
            "Smart home automation",
            "Natural ventilation system",
            "Landscape integration"
        ]
    },
    2: {
        title: "Urban Renewal Concept",
        type: "Photorealistic Render",
        price: 0,
        description: "A photorealistic visualization of urban renewal project transforming neglected urban spaces into vibrant community hubs. This render demonstrates our ability to envision transformative urban design solutions.",
        image: "/img/getCroppedImage (1) (2).jpg",
        
        category: "renders",
        features: [
            "Photorealistic quality",
            "Detailed material textures",
            "Natural lighting simulation",
            "Context integration",
            "Multiple view angles",
            "Post-processing effects"
        ]
    },
    3: {
        title: "Lakeside Pavilion",
        type: "CGI",
        price: 0,
        description: "A minimalist lakeside pavilion CGI showcasing clean lines and transparency. This digital model illustrates our approach to creating spaces that blur boundaries between interior and exterior environments.",
        image: "/img/getCroppedImage (1) (1).jpg",
        category: "renders",
        features: [
            "High-resolution CGI",
            "Architectural visualization",
            "Material studies",
            "Lighting analysis",
            "3D walkthrough available",
            "VR compatible"
        ]
    },
    4: {
        title: "Commercial Tower Study",
        type: "Hand-drawn",
        price:0,
        description: "Hand-drawn architectural study of a commercial tower exploring structural possibilities and aesthetic considerations. This blueprint represents the traditional craftsmanship in architectural design process.",
        image: "/img/getCroppedImage (1).jpg",
        category: "blueprints",
        features: [
            "Hand-drawn precision",
            "Technical specifications",
            "Scale accuracy",
            "Material annotations",
            "Structural details",
            "Professional drafting"
        ]
    },
    5: {
        title: "Residential Complex",
        type: "AutoCAD Drawing",
        price: 0,
        description: "Detailed AutoCAD drawing of a residential complex showcasing efficient space planning and structural layout. This technical drawing demonstrates our expertise in residential design and planning regulations compliance.",
        image: "/img/getCroppedImage (2) (2).jpg",
        category: "blueprints",
        features: [
            "AutoCAD precision",
            "Layer organization",
            "Dimension accuracy",
            "Plan and elevation views",
            "Construction details",
            "Exportable formats"
        ]
    },
    6: {
        title: "3D Printed Cityscape",
        type: "Scale Model Photography",
        price: 0,
        description: "Photography of a detailed 3D printed scale model representing an innovative cityscape design. This physical model demonstrates our commitment to tangible representation of architectural concepts.",
        image: "/img/getCroppedImage (3).jpg",
        category: "models",
        features: [
            "3D printed model",
            "Scale accuracy 1:100",
            "High-quality photography",
            "Multiple angles",
            "Material representation",
            "Professional lighting"
        ]
    }
};

// السلة
let cart = JSON.parse(localStorage.getItem('portfolioCart')) || [];
let currentProjectId = null;

// DOM Elements
 const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartModalContent = document.getElementById('cartModalContent');
const cartCount = document.getElementById('cartCount');
const projectModal = document.getElementById('projectModal');
const notification = document.getElementById('notification');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const portfolioGrid = document.getElementById('portfolioGrid');
const filterButtons = document.querySelectorAll('.filter-btn');

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// تهيئة كل المكونات
function initializeApp() {
    // تحديث عدد السلة
    updateCartCount();
    
    // إضافة Event Listeners
    setupEventListeners();
    
    // إعداد الفلاتر
    setupFilters();
    
    // إعداد تأثيرات التمرير
    setupScrollEffects();
    
    // عرض المشاريع
    displayAllProjects();
}

// إعداد Event Listeners
function setupEventListeners() {
    // زر السلة
    cartBtn.addEventListener('click', openCartModal);
    
    // زر إغلاق المودال
    document.getElementById('closeModalBtn').addEventListener('click', closeProjectModal);
    document.getElementById('modalCloseBtn').addEventListener('click', closeProjectModal);
    
    // زر إضافة إلى السلة في المودال
    document.getElementById('modalAddCartBtn').addEventListener('click', addCurrentProjectToCart);
    
    // زر العودة للأعلى
    scrollTopBtn.addEventListener('click', scrollToTop);
    
    // إغلاق المودال عند الضغط خارج المحتوى
    window.addEventListener('click', function(event) {
        if (event.target === projectModal) {
            closeProjectModal();
        }
        if (event.target === cartModal) {
            closeCartModal();
        }
    });
    
    // زر الإضافة إلى السلة في المودال
    document.getElementById('modalAddCartBtn').addEventListener('click', function() {
        if (currentProjectId) {
            addToCart(currentProjectId);
        }
    });
}

// إعداد الفلاتر
function setupFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterProjects(filter);
            
            // تحديث الأزرار النشطة
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// إعداد تأثيرات التمرير
function setupScrollEffects() {
    window.addEventListener('scroll', function() {
        // زر العودة للأعلى
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
        
        // تأثيرات الظهور عند التمرير
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    });
}

// عرض كل المشاريع
function displayAllProjects() {
    // إضافة تأثير fade-in لكل البطاقات
    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
        
        // إضافة حدث النقر لكل بطاقة
        card.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-project-id'));
            openProjectModal(projectId);
        });
    });
}

// فلترة المشاريع
function filterProjects(category) {
    const cards = document.querySelectorAll('.portfolio-card');
    
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
        }
    });
    
    // إعادة تطبيق تأثيرات التمرير
    setTimeout(() => {
        const visibleCards = document.querySelectorAll('.portfolio-card[style="display: block"]');
        visibleCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }, 100);
}

// فتح مودال المشروع
function openProjectModal(projectId) {
    currentProjectId = projectId;
    const project = projectsData[projectId];
    
    if (!project) return;
    
    // تحديث محتوى المودال
    document.getElementById('modalProjectTitle').textContent = project.title;
    document.getElementById('modalProjectType').textContent = project.type;
    document.getElementById('modalProjectPrice').textContent = `$${project.price.toFixed(2)}`;
    document.getElementById('modalProjectDescription').textContent = project.description;
    document.getElementById('modalProjectImage').src = project.image;
    document.getElementById('modalProjectImage').alt = project.title;
    
    // تحديث المميزات
    const featuresList = document.getElementById('modalFeaturesList');
    featuresList.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // إظهار المودال
    projectModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// إغلاق مودال المشروع
function closeProjectModal() {
    projectModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentProjectId = null;
}

// فتح سلة التسوق
function openCartModal() {
    renderCartContent();
    cartModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// إغلاق سلة التسوق
function closeCartModal() {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// إضافة مشروع إلى السلة
function addToCart(projectId) {
    const project = projectsData[projectId];
    if (!project) return;
    
    // التحقق إذا كان المشروع موجود بالفعل
    const existingItemIndex = cart.findIndex(item => item.id === projectId);
    
    if (existingItemIndex !== -1) {
        // زيادة الكمية إذا كان موجود
        cart[existingItemIndex].quantity += 1;
    } else {
        // إضافة جديد
        cart.push({
            id: projectId,
            title: project.title,
            price: project.price,
            image: project.image,
            type: project.type,
            quantity: 1
        });
    }
    
    // حفظ في localStorage
    localStorage.setItem('portfolioCart', JSON.stringify(cart));
    
    // تحديث العد
    updateCartCount();
    
    // إظهار الإشعار
    showNotification(`${project.title} added to cart!`);
    
    // تحديث المودال إذا كان مفتوح
    if (cartModal.style.display === 'flex') {
        renderCartContent();
    }
}

// إضافة المشروع الحالي إلى السلة
function addCurrentProjectToCart() {
    if (currentProjectId) {
        addToCart(currentProjectId);
    }
}

// تحديث عدد السلة
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// عرض محتوى السلة
function renderCartContent() {
    let cartHTML = `
        <div class="cart-modal-header">
            <h3>Shopping Cart (${cart.reduce((total, item) => total + item.quantity, 0)} items)</h3>
            <button class="close-cart-btn" id="closeCartModalBtn">&times;</button>
        </div>
    `;
    
    if (cart.length === 0) {
        cartHTML += `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <button class="continue-shopping-btn" id="continueShoppingBtn">Browse Projects</button>
            </div>
        `;
    } else {
        cartHTML += `<div class="cart-items">`;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="cart-item-info">
                        <h4>${item.title}</h4>
                        <p>${item.type}</p>
                        <div class="cart-item-controls">
                            <button class="decrease-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                            <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
                        </div>
                    </div>
                    <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
                </div>
            `;
        });
        
        cartHTML += `</div>`;
        
        // حساب الإجمالي
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartHTML += `
            <div class="cart-total">
                <h4>Total: $${total.toFixed(2)}</h4>
            </div>
            <div class="cart-buttons">
                <button class="continue-shopping-btn" id="continueShoppingBtn">Continue Shopping</button>
                <button class="checkout-btn" id="checkoutBtn">Proceed to Checkout</button>
            </div>
        `;
    }
    
    cartModalContent.innerHTML = cartHTML;
    
    // إضافة Event Listeners جديدة
    document.getElementById('closeCartModalBtn')?.addEventListener('click', closeCartModal);
    document.getElementById('continueShoppingBtn')?.addEventListener('click', closeCartModal);
    document.getElementById('checkoutBtn')?.addEventListener('click', checkout);
}

// تحديث كمية العنصر في السلة
function updateCartQuantity(projectId, change) {
    const itemIndex = cart.findIndex(item => item.id === projectId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        // إزالة العنصر إذا كانت الكمية 0 أو أقل
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
            showNotification('Item removed from cart');
        }
        
        // حفظ وتحديث
        localStorage.setItem('portfolioCart', JSON.stringify(cart));
        updateCartCount();
        renderCartContent();
    }
}

// إزالة عنصر من السلة
function removeFromCart(projectId) {
    cart = cart.filter(item => item.id !== projectId);
    localStorage.setItem('portfolioCart', JSON.stringify(cart));
    updateCartCount();
    renderCartContent();
    showNotification('Item removed from cart');
}

// إتمام الشراء
function checkout() {
    if (cart.length === 0) return;
    
    alert('Thank you for your purchase! This is a demo checkout.');
    
    // تفريغ السلة
    cart = [];
    localStorage.setItem('portfolioCart', JSON.stringify(cart));
    updateCartCount();
    closeCartModal();
    showNotification('Order placed successfully!');
}

// عرض الإشعار
function showNotification(message) {
    notification.innerHTML = `<span>${message}</span>`;
    notification.style.display = 'flex';
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            notification.style.display = 'none';
            notification.style.animation = '';
        }, 300);
    }, 3000);
}

// التمرير إلى الأعلى
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// التمرير إلى قسم البورتفوليو
function scrollToPortfolio() {
    const portfolioSection = document.getElementById('portfolio');
    portfolioSection.scrollIntoView({
        behavior: 'smooth'
    });
}

// جعل الدوال متاحة عالمياً للاستخدام في HTML
window.openProjectModal = openProjectModal;
window.filterProjects = filterProjects;
window.scrollToPortfolio = scrollToPortfolio;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;




// تبديل بين Login/Logout
    function toggleAuth() {
        if (localStorage.getItem('currentUser')) {
            // تسجيل الخروج
            localStorage.removeItem('currentUser');
            showNotification('تم تسجيل الخروج بنجاح');
            setTimeout(() => location.reload(), 500);
        } else {
            // الذهاب لصفحة تسجيل الدخول
            window.location.href = 'registar.html';
        }
    }

    // تحديث نص الزر عند تحميل الصفحة
    function updateAuthButton() {
        const authText = document.getElementById('authText');
        if (authText) {
            authText.textContent = localStorage.getItem('currentUser') ? 'Logout' : 'Login';
        }
    }

    // استدعاء عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', updateAuthButton);





      