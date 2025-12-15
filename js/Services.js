

  

// JavaScript كامل لصفحة السيرفسس

// بيانات الخدمات - مع الكارد الجديدة
const servicesData = {
    1: {
        id: 1,
        title: "Rendering & Storytelling",
        price: 0,
        description: "Transform your architectural concepts into compelling visual narratives. We create photorealistic renders that tell the story of your design, perfect for presentations and portfolio enhancement.",
        image: "./img/Orla-by-OMNIYAT-Amenities-1024x569 (1).jpg",
        features: [
            "Photorealistic quality renders",
            "Visual storytelling & narratives",
            "Multiple angle options",
            "48h Delivery Label",
            "High-resolution exports",
            "Lighting and material studies"
        ],
        category: "rendering",
        delivery: "48h"
    },
    2: {
        id: 2,
        title: "3D Modelling",
        price: 0,
        description: "Professional 3D modeling services using industry-standard software like Revit, Rhino, and AutoCAD. We deliver clean, organized models with export-ready files for your architectural projects.",
        image: "/img/getCroppedImage (2) (1).jpg",
        features: [
            "Revit, Rhino, AutoCAD",
            "Clean layer organization",
            "48h Delivery Label",
            "Academic standard quality",
            "Exportable formats",
            "Technical documentation"
        ],
        category: "3d",
        featured: true
    },
    3: {
        id: 3,
        title: "Full Project Assistance",
        price: 0,
        description: "End-to-end project support from initial concept through design development to final presentation. We provide comprehensive assistance including diagrams, narrative development, and presentation layouts.",
        image: "/img/getCroppedImage (2).jpg",
        features: [
            "End-to-end project support",
            "Concept to completion",
            "Diagrams & narrative",
            "48h Delivery Label",
            "Presentation layouts",
            "Design development"
        ],
        category: "project"
    },
    4: {
        id: 4,
        title: "Tutoring & Coaching",
        price: 0,
        description: "Personalized one-on-one tutoring and coaching sessions for architecture students and professionals. We help with portfolio reviews, interview preparation, and skill development in design software.",
        image: "/img/getCroppedImage (3).jpg",
        features: [
            "Portfolio reviews & feedback",
            "Interview preparation",
            "Software skill-building",
            "48h Delivery Label",
            "One-on-one sessions",
            "Career guidance"
        ],
        category: "tutoring",
        isHourly: true
    },
    5: {
        id: 5,
        title: "Build‑Your‑Own Order",
        price: 0,
        description: "Customize your architectural service package with our intuitive shop interface. Select exactly what you need from our modular service offerings to create a personalized solution for your project.",
        image: "/img/getCroppedImage (4).jpg",
        features: [
            "Modular service selection",
            "Customized package building",
            "Flexible pricing options",
            "48h Delivery Label",
            "Tailored solutions",
            "Multiple service combinations"
        ],
        category: "custom"
    },
    // الكارد الجديدة: Portfolio Design & Development
    6: {
        id: 6,
        title: "Portfolio Design & Development",
        price: 0,
        description: "Create a stunning professional portfolio that showcases your architectural work effectively. We design visually compelling portfolios tailored for job applications, university admissions, or client presentations.",
        image: "/img/getCroppedImage (5).jpg",
        features: [
            "Custom portfolio layout design",
            "Content organization & sequencing",
            "Print-ready & digital formats",
            "48h Delivery Label",
            "Brand identity integration",
            "Responsive web portfolio option"
        ],
        category: "portfolio",
        delivery: "48h"
    }
};

// السلة
let cart = JSON.parse(localStorage.getItem('servicesCart')) || [];
let currentServiceId = null;

// DOM Elements
const servicesContainer = document.getElementById('servicesContainer');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotalAmount = document.getElementById('cartTotalAmount');
const cartCount = document.getElementById('cartCount');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');
const scrollProgress = document.getElementById('scrollProgress');
const serviceModal = document.getElementById('serviceModal');
const exploreServicesBtn = document.getElementById('exploreServicesBtn');
const contactUsBtn = document.getElementById('contactUsBtn');

const closeCartModalBtn = document.getElementById('closeCartModalBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');
const closeServiceModalBtn = document.getElementById('closeServiceModalBtn');
const closeServiceModalBtn2 = document.getElementById('closeServiceModalBtn2');
const modalAddToCartBtn = document.getElementById('modalAddToCartBtn');

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// تهيئة كل المكونات
function initializeApp() {
    // تحديث عدد السلة
    updateCartCount();
    
    // إضافة الخدمات للصفحة
    displayServices();
    
    // إعداد Event Listeners
    setupEventListeners();
    
    // إعداد تأثيرات التمرير
    setupScrollEffects();
    
    // إعداد العدادات المتحركة
    setupCounterAnimations();
    
    // إضافة تأثير ظهور الكاردات
    observeServiceCards();
    
    // التأكد من عمل جميع أزرار الكاردات
    ensureAllCardsWorking();
}

// ضمان عمل جميع أزرار الكاردات
function ensureAllCardsWorking() {
    // إضافة event listeners لجميع الكاردات
    addServiceCardsEventListeners();
    
    // تحديث الكارتس الموجودة في localStorage لتشمل الكارد الجديدة
    updateStoredCart();
}

// تحديث السلة المخزنة لتشمل الكارد الجديدة
function updateStoredCart() {
    // لا حاجة لتحديث أي شيء هنا لأن البيانات الجديدة ستُستخدم مباشرة
    // هذه الدالة فقط للتأكد من التوافق
    console.log('All service cards are ready, including the new one.');
}

// عرض الخدمات
function displayServices() {
    // يمكن استخدام هذا إذا أردت إنشاء الكاردات ديناميكياً
    // لكن بما أن الكاردات موجودة بالفعل في الـHTML، سنضيف فقط الـevent listeners
    addServiceCardsEventListeners();
}

// إضافة event listeners للكاردات
function addServiceCardsEventListeners() {
    const serviceCards = document.querySelectorAll('.service-card');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    
    // الكاردات
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // لا تفتح المودال إذا تم النقر على زر
            if (!e.target.closest('.add-to-cart-btn') && 
                !e.target.closest('.learn-more-btn') && 
                !e.target.closest('.quick-view-btn')) {
                const serviceId = parseInt(this.getAttribute('data-service-id'));
                openServiceModal(serviceId);
            }
        });
    });
    
    // أزرار Add to Cart
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // منع فتح المودال
            const serviceId = parseInt(this.getAttribute('data-service-id'));
            addToCart(serviceId);
        });
    });
    
    // أزرار Learn More
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // منع فتح المودال
            const serviceId = parseInt(this.getAttribute('data-service-id'));
            openServiceModal(serviceId);
        });
    });
    
    // أزرار Quick View
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // منع فتح المودال
            const serviceId = parseInt(this.getAttribute('data-service-id'));
            openServiceModal(serviceId);
        });
    });
}

// إعداد Event Listeners
function setupEventListeners() {
    // زر السلة
    cartBtn.addEventListener('click', openCartModal);
    
    // إغلاق مودال السلة
    closeCartModalBtn.addEventListener('click', closeCartModal);
    
    // زر Checkout
    checkoutBtn.addEventListener('click', checkout);
    
    // زر تفريغ السلة
    clearCartBtn.addEventListener('click', clearCart);
    
    // إغلاق مودال الخدمة
    closeServiceModalBtn.addEventListener('click', closeServiceModal);
    closeServiceModalBtn2.addEventListener('click', closeServiceModal);
    
    // إضافة للسلة من المودال
    modalAddToCartBtn.addEventListener('click', addCurrentServiceToCart);
    
    // زر Explore Services
    exploreServicesBtn.addEventListener('click', function() {
        document.querySelector('.services-grid').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
    
    // زر Contact Us
    contactUsBtn.addEventListener('click', function() {
        window.location.href = 'Contact.html';
    });
    
    // إغلاق المودال بالـESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeCartModal();
            closeServiceModal();
        }
    });
    
    // إغلاق المودال عند الضغط خارج المحتوى
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            closeCartModal();
        }
        if (event.target === serviceModal) {
            closeServiceModal();
        }
    });
}

// إعداد تأثيرات التمرير
function setupScrollEffects() {
    // مؤشر التمرير
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
    
    // تأثير ظهور العناصر عند التمرير
    window.addEventListener('scroll', function() {
        const serviceCards = document.querySelectorAll('.service-card');
        const windowHeight = window.innerHeight;
        
        serviceCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < windowHeight - 100) {
                card.classList.add('visible');
            }
        });
    });
}

// إعداد العدادات المتحركة
function setupCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = stat.textContent; // الحفاظ على النص الأصلي
                clearInterval(timer);
            }
        }, stepTime);
        
        stat.classList.add('animated');
    });
}

// مراقبة ظهور الكاردات
function observeServiceCards() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        observer.observe(card);
    });
}

// فتح مودال الخدمة
function openServiceModal(serviceId) {
    currentServiceId = serviceId;
    const service = servicesData[serviceId];
    
    if (!service) {
        console.error('Service not found:', serviceId);
        return;
    }
    
    // تحديث محتوى المودال
    document.getElementById('serviceModalTitle').textContent = service.title;
    document.getElementById('serviceModalServiceTitle').textContent = service.title;
    document.getElementById('serviceModalPrice').textContent = service.isHourly ? 
        `$${service.price.toFixed(2)}/hr` : `$${service.price.toFixed(2)}`;
    document.getElementById('serviceModalDescription').textContent = service.description;
    
    // تحديث الصورة
    const serviceModalImage = document.getElementById('serviceModalImage');
    serviceModalImage.src = service.image;
    serviceModalImage.alt = service.title;
    
    // تحديث المميزات
    const featuresList = document.getElementById('serviceModalFeatures');
    featuresList.innerHTML = '';
    service.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // تحديث زر الإضافة
    modalAddToCartBtn.setAttribute('data-service-id', serviceId);
    modalAddToCartBtn.innerHTML = service.isHourly ? 
        `<span class="material-symbols-outlined">add_shopping_cart</span> Book Session` :
        `<span class="material-symbols-outlined">add_shopping_cart</span> Add to Cart`;
    
    // إظهار المودال
    serviceModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// إغلاق مودال الخدمة
function closeServiceModal() {
    serviceModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentServiceId = null;
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

// إضافة خدمة للسلة
function addToCart(serviceId) {
    const service = servicesData[serviceId];
    if (!service) {
        console.error('Service not found:', serviceId);
        return;
    }
    
    // التحقق إذا كانت الخدمة موجودة بالفعل
    const existingItemIndex = cart.findIndex(item => item.id === serviceId);
    
    if (existingItemIndex !== -1) {
        // زيادة الكمية إذا كانت موجودة
        cart[existingItemIndex].quantity += 1;
    } else {
        // إضافة جديدة
        cart.push({
            id: serviceId,
            title: service.title,
            price: service.price,
            image: service.image,
            isHourly: service.isHourly || false,
            quantity: 1
        });
    }
    
    // حفظ في localStorage
    localStorage.setItem('servicesCart', JSON.stringify(cart));
    
    // تحديث العد
    updateCartCount();
    
    // إظهار الإشعار
    showNotification(`${service.title} added to cart!`);
    
    // تحديث زر الإضافة في الكارد
    updateAddToCartButton(serviceId);
    
    // تحديث المودال إذا كان مفتوح
    if (cartModal.style.display === 'flex') {
        renderCartContent();
    }
}

// إضافة الخدمة الحالية للسلة
function addCurrentServiceToCart() {
    if (currentServiceId) {
        addToCart(currentServiceId);
        // يمكن إغلاق المودال بعد الإضافة
        // closeServiceModal();
    }
}

// تحديث زر الإضافة في الكارد
function updateAddToCartButton(serviceId) {
    const addBtn = document.querySelector(`.add-to-cart-btn[data-service-id="${serviceId}"]`);
    if (addBtn) {
        addBtn.classList.add('added');
        addBtn.innerHTML = `<span class="material-symbols-outlined">check</span> Added`;
        
        setTimeout(() => {
            addBtn.classList.remove('added');
            const service = servicesData[serviceId];
            addBtn.innerHTML = service.isHourly ? 
                `<span class="material-symbols-outlined">add_shopping_cart</span> Book Session` :
                `<span class="material-symbols-outlined">add_shopping_cart</span> Add to Cart`;
        }, 2000);
    }
}

// تحديث عدد السلة
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// عرض محتوى السلة
function renderCartContent() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <span class="material-symbols-outlined cart-empty-icon">shopping_cart</span>
                <p>Your cart is empty</p>
                <button class="btn btn-primary" id="startShoppingBtn" style="margin-top: 20px;">
                    <span class="material-symbols-outlined">shopping_bag</span>
                    Start Shopping
                </button>
            </div>
        `;
        
        document.getElementById('startShoppingBtn')?.addEventListener('click', function() {
            closeCartModal();
            document.querySelector('.services-grid').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
        
        cartTotalAmount.textContent = '$0.00';
    } else {
        let cartHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const service = servicesData[item.id];
            if (!service) {
                console.error('Service data not found for item:', item.id);
                return;
            }
            
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${service.image}" alt="${service.title}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${service.title}</h4>
                        <div class="cart-item-price">${service.isHourly ? `$${service.price.toFixed(2)}/hr` : `$${service.price.toFixed(2)}`}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                            <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                            <button class="remove-from-cart" data-id="${item.id}">
                                <span class="material-symbols-outlined">delete</span>
                            </button>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
                    </div>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = cartHTML;
        cartTotalAmount.textContent = `$${total.toFixed(2)}`;
        
        // إضافة event listeners للكميات
        document.querySelectorAll('.decrease-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const serviceId = parseInt(this.getAttribute('data-id'));
                updateCartQuantity(serviceId, -1);
            });
        });
        
        document.querySelectorAll('.increase-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const serviceId = parseInt(this.getAttribute('data-id'));
                updateCartQuantity(serviceId, 1);
            });
        });
        
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const serviceId = parseInt(this.getAttribute('data-id'));
                const newQuantity = parseInt(this.value);
                if (newQuantity > 0) {
                    setCartQuantity(serviceId, newQuantity);
                }
            });
        });
        
        document.querySelectorAll('.remove-from-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                const serviceId = parseInt(this.getAttribute('data-id'));
                removeFromCart(serviceId);
            });
        });
    }
}

// تحديث كمية العنصر في السلة
function updateCartQuantity(serviceId, change) {
    const itemIndex = cart.findIndex(item => item.id === serviceId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        // إزالة العنصر إذا كانت الكمية 0 أو أقل
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
            showNotification('Item removed from cart');
        }
        
        // حفظ وتحديث
        localStorage.setItem('servicesCart', JSON.stringify(cart));
        updateCartCount();
        renderCartContent();
    }
}

// تعيين كمية محددة
function setCartQuantity(serviceId, quantity) {
    const itemIndex = cart.findIndex(item => item.id === serviceId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = quantity;
        
        // حفظ وتحديث
        localStorage.setItem('servicesCart', JSON.stringify(cart));
        updateCartCount();
        renderCartContent();
    }
}

// إزالة عنصر من السلة
function removeFromCart(serviceId) {
    cart = cart.filter(item => item.id !== serviceId);
    localStorage.setItem('servicesCart', JSON.stringify(cart));
    updateCartCount();
    renderCartContent();
    showNotification('Item removed from cart');
}

// تفريغ السلة
function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        localStorage.setItem('servicesCart', JSON.stringify(cart));
        updateCartCount();
        renderCartContent();
        showNotification('Cart cleared');
    }
}

// إتمام الشراء
function checkout() {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // هنا يمكنك إضافة عملية الدفع الفعلية
    // لاحظت أنك تستخدم WhatsApp للتواصل
    const message = `Hello! I would like to order the following services:\n\n` +
                   cart.map(item => {
                       const service = servicesData[item.id];
                       return `• ${service.title} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
                   }).join('\n') +
                   `\n\nTotal: $${total.toFixed(2)}`;
    
    const whatsappUrl = `https://wa.me/447470631885?text=${encodeURIComponent(message)}`;
    
    // يمكنك فتح WhatsApp أو عرض رسالة تأكيد
    if (confirm(`Total: $${total.toFixed(2)}\n\nProceed to WhatsApp for payment?`)) {
        window.open(whatsappUrl, '_blank');
        
        // تفريغ السلة بعد الإرسال
        cart = [];
        localStorage.setItem('servicesCart', JSON.stringify(cart));
        updateCartCount();
        closeCartModal();
        showNotification('Order sent to WhatsApp!');
    }
}

// عرض الإشعار
function showNotification(message) {
    notificationMessage.textContent = message;
    notification.style.display = 'flex';
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            notification.style.display = 'none';
            notification.style.animation = '';
        }, 300);
    }, 3000);
}

// جعل الدوال متاحة عالمياً
window.openServiceModal = openServiceModal;
window.addToCart = addToCart;

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

// إعداد القائمة المتنقلة
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.createElement('div'); // سننشئ العنصر ديناميكيًا

// إنشاء القائمة المتنقلة
function createMobileMenu() {
    // إنشاء العنصر
    mobileNav.className = 'mobile-nav';
    mobileNav.id = 'mobileNav';
    
    // محتوى القائمة
    mobileNav.innerHTML = `
        <button class="nav-cart" id="mobileCartBtn">
            <span class="material-symbols-outlined">shopping_cart</span>
            Cart (<span id="mobileCartCount">${cart.reduce((total, item) => total + item.quantity, 0)}</span>)
        </button>
        <a class="nav-link" href="Home.html">Home</a>
        <a class="nav-link active" href="Services.html">Services</a>
        <a class="nav-link" href="Shop.html">Shop</a>
        <a class="nav-link" href="portofolio.html">Portfolio</a>
        <a class="nav-link" href="About.html">About Us</a>
        <a class="nav-link" href="Contact.html">Contact</a>
        <a class="nav-link" onclick="toggleAuth()">
            <span id="mobileAuthText">
                ${localStorage.getItem('currentUser') ? 'Logout' : 'Login'}
            </span>
        </a>
    `;
    
    // إضافة للصفحة
    document.body.appendChild(mobileNav);
    
    // إضافة event listener لزر السلة
    document.getElementById('mobileCartBtn').addEventListener('click', openCartModal);
}

// تهيئة القائمة
function initializeMobileMenu() {
    createMobileMenu();
    
    // عند النقر على زر القائمة
    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        
        // تغيير الأيقونة
        const icon = this.querySelector('.material-symbols-outlined');
        if (mobileNav.classList.contains('active')) {
            icon.textContent = 'close';
        } else {
            icon.textContent = 'menu';
        }
    });
    
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileMenuBtn.querySelector('.material-symbols-outlined').textContent = 'menu';
        });
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(event) {
        if (!mobileNav.contains(event.target) && 
            !mobileMenuBtn.contains(event.target) &&
            mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            mobileMenuBtn.querySelector('.material-symbols-outlined').textContent = 'menu';
        }
    });
}

// استدعاء عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    // ... باقي الكود ...
});

// تحديث عداد السلة في القائمة المتنقلة
function updateMobileCartCount() {
    const mobileCartCount = document.getElementById('mobileCartCount');
    if (mobileCartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        mobileCartCount.textContent = totalItems;
    }
}

// تحديث دالة updateCartCount لتنعكس على الموبايل
const originalUpdateCartCount = updateCartCount;
updateCartCount = function() {
    originalUpdateCartCount();
    updateMobileCartCount();
};

// تحديث نص تسجيل الدخول في القائمة المتنقلة
function updateMobileAuthButton() {
    const mobileAuthText = document.getElementById('mobileAuthText');
    if (mobileAuthText) {
        mobileAuthText.textContent = localStorage.getItem('currentUser') ? 'Logout' : 'Login';
    }
}














 // Scroll Animation
    document.addEventListener('DOMContentLoaded', function() {
        const cards = document.querySelectorAll('.testimonial-card');
        const stats = document.querySelector('.stats-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('testimonial-card')) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 200);
                    } else {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, 600);
                    }
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(card => observer.observe(card));
        if (stats) observer.observe(stats);
    });
