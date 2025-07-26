// User authentication and profile management with Firebase
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, setting up elements...');
    
    // Elements
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    const googleSignInBtn = document.getElementById('googleSignInBtn');
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const profileForm = document.getElementById('profile-form');
    const signinMsg = document.getElementById('signin-message');
    const signupMsg = document.getElementById('signup-message');
    const profileMsg = document.getElementById('profile-message');
    const profileSection = document.getElementById('profile-section');
    const signoutBtn = document.getElementById('signout-btn');
    const profileUsername = document.getElementById('profile-username');
    const profilePassword = document.getElementById('profile-password');

    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAN33slpw_IVDsgRyY9EiK_lxy6_O5Vp6s",
        authDomain: "uniroomie-80448.firebaseapp.com",
        projectId: "uniroomie-80448",
        storageBucket: "uniroomie-80448.firebasestorage.app",
        messagingSenderId: "157284440676",
        appId: "1:157284440676:web:d380b5a466338ca3235d71",
        measurementId: "G-WJME8WE15P"
    };

    // Firebase variables
    let app, auth, db, googleProvider;
    let isFirebaseInitialized = false;

    // Initialize Firebase (single initialization)
    function initializeFirebase() {
        return new Promise((resolve, reject) => {
            if (isFirebaseInitialized) {
                resolve();
                return;
            }

            if (!window.firebase) {
                reject(new Error('Firebase SDK not loaded'));
                return;
            }

            try {
                // Initialize Firebase app
                app = firebase.initializeApp(firebaseConfig);
                auth = firebase.auth();
                db = firebase.firestore();
                googleProvider = new firebase.auth.GoogleAuthProvider();
                
                isFirebaseInitialized = true;
                console.log('Firebase initialized successfully');
                
                // Set up auth state listener
                setupAuthStateListener();
                resolve();
            } catch (error) {
                console.error('Firebase initialization error:', error);
                reject(error);
            }
        });
    }

    // Setup Firebase auth state listener
    function setupAuthStateListener() {
        auth.onAuthStateChanged(function(user) {
            console.log('Auth state changed:', user ? user.email : 'No user');
            
            if (user) {
                // Only show profile if email is verified (for email/password users)
                if (user.providerData[0].providerId === 'password' && !user.emailVerified) {
                    console.log('User email not verified, showing auth screen');
                    showAuth();
                    showMessage(signinMsg, 
                        'Please verify your email address to continue. Check your inbox for the verification link.',
                        'error'
                    );
                    showResendVerificationOption(user);
                    return;
                }
                
                showProfile(user);
                loadUserInteractions();
            } else {
                showAuth();
            }
        });
    }

    // Show resend verification email option
    function showResendVerificationOption(user) {
        const resendContainer = document.createElement('div');
        resendContainer.id = 'resend-verification';
        resendContainer.style.marginTop = '10px';
        resendContainer.innerHTML = `
            <p style="font-size: 14px; color: #666; margin: 10px 0;">
                Didn't receive the email? 
                <button id="resend-verification-btn" style="background: none; border: none; color: #4a90e2; text-decoration: underline; cursor: pointer;">
                    Resend verification email
                </button>
            </p>
        `;
        
        // Remove existing resend container if present
        const existing = document.getElementById('resend-verification');
        if (existing) existing.remove();
        
        // Add after signin message
        signinMsg.parentNode.insertBefore(resendContainer, signinMsg.nextSibling);
        
        // Add click handler for resend button
        document.getElementById('resend-verification-btn').addEventListener('click', async function() {
            try {
                await user.sendEmailVerification();
                showMessage(signinMsg, 
                    `Verification email sent to ${user.email}. Please check your inbox.`,
                    'success'
                );
                
                // Remove the resend option temporarily
                resendContainer.remove();
                
                // Show it again after 60 seconds
                setTimeout(() => {
                    if (auth.currentUser && !auth.currentUser.emailVerified) {
                        showResendVerificationOption(auth.currentUser);
                    }
                }, 60000);
                
            } catch (error) {
                console.error('Error sending verification email:', error);
                showMessage(signinMsg, 'Error sending verification email. Please try again later.');
            }
        });
    }

    // Tab switching logic
    if (loginTab && signupTab) {
        loginTab.addEventListener('click', function () {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            loginSection.style.display = '';
            signupSection.style.display = 'none';
            clearMessages();
        });

        signupTab.addEventListener('click', function () {
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
            signupSection.style.display = '';
            loginSection.style.display = 'none';
            clearMessages();
        });
    }

    // Clear all messages and remove resend verification option
    function clearMessages() {
        if (signinMsg) {
            signinMsg.textContent = '';
            signinMsg.className = '';
        }
        if (signupMsg) {
            signupMsg.textContent = '';
            signupMsg.className = '';
        }
        if (profileMsg) {
            profileMsg.textContent = '';
            profileMsg.className = '';
        }
        
        // Remove resend verification container if present
        const resendContainer = document.getElementById('resend-verification');
        if (resendContainer) resendContainer.remove();
    }

    // Show message helper
    function showMessage(element, message, type = 'error') {
        if (element) {
            element.textContent = message;
            element.className = type;
        }
    }

    // Show/hide sections
    function showProfile(user) {
        document.getElementById('auth-card').style.display = 'none';
        if (loginSection) loginSection.style.display = 'none';
        if (signupSection) signupSection.style.display = 'none';
        if (profileSection) profileSection.style.display = 'block';
        
        const profileInfoSection = document.getElementById('profile-info-section');
        if (profileInfoSection) profileInfoSection.style.display = 'block';
        
        if (profileUsername) profileUsername.value = user.email || '';
        if (profilePassword) profilePassword.value = '';
        
        updateProfileInfo(user);
        setMemberSince(user);
        loadUserProfileFromFirestore(user.uid);
        clearMessages();
    }

    function showAuth() {
        document.getElementById('auth-card').style.display = '';
        if (loginSection) loginSection.style.display = '';
        if (signupSection) signupSection.style.display = 'none';
        if (profileSection) profileSection.style.display = 'none';
        
        const profileInfoSection = document.getElementById('profile-info-section');
        if (profileInfoSection) profileInfoSection.style.display = 'none';
        
        clearMessages();
    }

    // Update profile information display
    function updateProfileInfo(user) {
        const userEmailEl = document.getElementById('userEmail');
        if (userEmailEl) userEmailEl.textContent = user.email || 'N/A';
    }

    // Set member since date using Firestore
    async function setMemberSince(user) {
        try {
            const userDoc = await db.collection('userProfiles').doc(user.uid).get();
            
            if (userDoc.exists && userDoc.data().memberSince) {
                // Use existing member since date
                if (document.getElementById('memberSince')) {
                    document.getElementById('memberSince').textContent = userDoc.data().memberSince;
                }
            } else {
                // Set new member since date
                const now = new Date();
                const monthYear = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                
                await db.collection('userProfiles').doc(user.uid).set({
                    memberSince: monthYear
                }, { merge: true });
                
                if (document.getElementById('memberSince')) {
                    document.getElementById('memberSince').textContent = monthYear;
                }
            }
        } catch (error) {
            console.error('Error setting member since date:', error);
            // Fallback to current date
            const now = new Date();
            const monthYear = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            if (document.getElementById('memberSince')) {
                document.getElementById('memberSince').textContent = monthYear;
            }
        }
    }

    // Load user profile from Firestore
    async function loadUserProfileFromFirestore(userId) {
        try {
            const userDoc = await db.collection('userProfiles').doc(userId).get();
            
            if (userDoc.exists) {
                const data = userDoc.data();
                console.log('Loaded user profile from Firestore:', data);
                
                // Populate form fields
                if (document.getElementById('fullName')) document.getElementById('fullName').value = data.fullName || '';
                if (document.getElementById('age')) document.getElementById('age').value = data.age || '';
                if (document.getElementById('profession')) document.getElementById('profession').value = data.profession || '';
                if (document.getElementById('school')) document.getElementById('school').value = data.school || '';
                if (document.getElementById('cityArea')) document.getElementById('cityArea').value = data.cityArea || '';
                if (document.getElementById('budget')) document.getElementById('budget').value = data.budget || '';
                if (document.getElementById('leaseLength')) document.getElementById('leaseLength').value = data.leaseLength || '';
                if (document.getElementById('roomType')) document.getElementById('roomType').value = data.roomType || '';
            } else {
                console.log('No profile data found for user');
                // Clear all fields
                clearProfileForm();
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
            clearProfileForm();
        }
    }

    // Clear profile form
    function clearProfileForm() {
        if (document.getElementById('fullName')) document.getElementById('fullName').value = '';
        if (document.getElementById('age')) document.getElementById('age').value = '';
        if (document.getElementById('profession')) document.getElementById('profession').value = '';
        if (document.getElementById('school')) document.getElementById('school').value = '';
        if (document.getElementById('cityArea')) document.getElementById('cityArea').value = '';
        if (document.getElementById('budget')) document.getElementById('budget').value = '';
        if (document.getElementById('leaseLength')) document.getElementById('leaseLength').value = '';
        if (document.getElementById('roomType')) document.getElementById('roomType').value = '';
    }

    // Save user profile to Firestore
    async function saveUserProfileToFirestore(userId, profileData) {
        try {
            console.log('Saving profile data to Firestore:', profileData);
            
            await db.collection('userProfiles').doc(userId).set(profileData, { merge: true });
            
            console.log('Profile saved successfully to Firestore');
            return true;
        } catch (error) {
            console.error('Error saving user profile to Firestore:', error);
            throw error;
        }
    }

    // Personal Information Form
    const personalInfoForm = document.getElementById('personalInfoForm');
    if (personalInfoForm) {
        personalInfoForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            
            const currentUser = auth.currentUser;
            if (!currentUser) {
                alert('No user signed in');
                return;
            }

            // Collect form data
            const profileData = {
                fullName: document.getElementById('fullName')?.value || '',
                age: document.getElementById('age')?.value || '',
                profession: document.getElementById('profession')?.value || '',
                school: document.getElementById('school')?.value || '',
                cityArea: document.getElementById('cityArea')?.value || '',
                budget: document.getElementById('budget')?.value || '',
                leaseLength: document.getElementById('leaseLength')?.value || '',
                roomType: document.getElementById('roomType')?.value || '',
                email: currentUser.email,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            };

            // Validate required fields (optional)
            if (!profileData.fullName) {
                alert('Please enter your full name');
                return;
            }

            try {
                // Save to Firestore
                await saveUserProfileToFirestore(currentUser.uid, profileData);
                
                // Show success message
                alert('Profile information saved successfully!');
                
                // Optionally show a temporary success message
                const successMsg = document.createElement('div');
                successMsg.textContent = 'Profile saved successfully!';
                successMsg.style.cssText = 'background: #e8f5e8; color: #2e7d32; border: 1px solid #c8e6c9; padding: 8px; border-radius: 4px; margin-top: 10px; text-align: center;';
                personalInfoForm.appendChild(successMsg);
                
                setTimeout(() => {
                    if (successMsg.parentNode) {
                        successMsg.parentNode.removeChild(successMsg);
                    }
                }, 3000);
                
            } catch (error) {
                console.error('Error saving profile:', error);
                alert('Error saving profile information. Please try again.');
            }
        });
    }

    // Email/Password Sign Up
    if (signupForm) {
        signupForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            
            if (!isFirebaseInitialized) {
                showMessage(signupMsg, 'Firebase not initialized. Please refresh and try again.');
                return;
            }

            const email = document.getElementById('signup-email')?.value.trim();
            const password = document.getElementById('signup-password')?.value;
            const confirmPassword = document.getElementById('signup-confirm-password')?.value;
            
            // Validation
            if (!email) {
                showMessage(signupMsg, 'Email is required.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage(signupMsg, 'Please enter a valid email address.');
                return;
            }
            
            if (password.length < 6) {
                showMessage(signupMsg, 'Password must be at least 6 characters long.');
                return;
            }
            
            if (password !== confirmPassword) {
                showMessage(signupMsg, 'Passwords do not match.');
                return;
            }

            try {
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                console.log('User created successfully:', userCredential.user.email);
                
                // Send email verification immediately after account creation
                await userCredential.user.sendEmailVerification();
                
                // Create initial user profile document in Firestore
                const now = new Date();
                const monthYear = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                
                await db.collection('userProfiles').doc(userCredential.user.uid).set({
                    email: userCredential.user.email,
                    memberSince: monthYear,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                
                // Sign out the user until they verify their email
                await auth.signOut();
                
                showMessage(signupMsg, 
                    `Account created successfully! We've sent a verification email to ${email}. Please check your inbox and click the verification link before signing in.`, 
                    'success'
                );
                signupForm.reset();
                
                // Switch to login tab after successful signup
                setTimeout(() => {
                    loginTab.click();
                }, 3000);
                
            } catch (error) {
                console.error('Sign up error:', error);
                let errorMessage = 'Sign up failed. ';
                
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage += 'Email is already registered.';
                        break;
                    case 'auth/weak-password':
                        errorMessage += 'Password is too weak.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage += 'Invalid email address.';
                        break;
                    default:
                        errorMessage += error.message;
                }
                
                showMessage(signupMsg, errorMessage);
            }
        });
    }

    // Email/Password Sign In
    if (signinForm) {
        signinForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            
            if (!isFirebaseInitialized) {
                showMessage(signinMsg, 'Firebase not initialized. Please refresh and try again.');
                return;
            }

            const email = document.getElementById('signin-email')?.value.trim();
            const password = document.getElementById('signin-password')?.value;
            
            if (!email || !password) {
                showMessage(signinMsg, 'Please enter both email and password.');
                return;
            }

            try {
                const userCredential = await auth.signInWithEmailAndPassword(email, password);
                
                // Check if email is verified
                if (!userCredential.user.emailVerified) {
                    showMessage(signinMsg, 
                        'Please verify your email address before signing in. Check your inbox for the verification link.', 
                        'error'
                    );
                    
                    // Show option to resend verification email
                    showResendVerificationOption(userCredential.user);
                    await auth.signOut(); // Sign them out until verified
                    return;
                }
                
                console.log('User signed in successfully:', userCredential.user.email);
                signinForm.reset();
                
            } catch (error) {
                console.error('Sign in error:', error);
                let errorMessage = 'Sign in failed. ';
                
                switch (error.code) {
                    case 'auth/user-not-found':
                        errorMessage += 'No account found with this email.';
                        break;
                    case 'auth/wrong-password':
                        errorMessage += 'Incorrect password.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage += 'Invalid email address.';
                        break;
                    case 'auth/user-disabled':
                        errorMessage += 'This account has been disabled.';
                        break;
                    default:
                        errorMessage += error.message;
                }
                
                showMessage(signinMsg, errorMessage);
            }
        });
    }

    // Google Sign-In
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', async function () {
            console.log('Google sign-in button clicked');
            
            if (!isFirebaseInitialized) {
                showMessage(signinMsg, 'Firebase not initialized. Please refresh and try again.');
                return;
            }

            try {
                const result = await auth.signInWithPopup(googleProvider);
                console.log('Google sign-in successful:', result.user.email);
                
                // Check if user profile exists, if not create one
                const userDoc = await db.collection('userProfiles').doc(result.user.uid).get();
                
                if (!userDoc.exists) {
                    const now = new Date();
                    const monthYear = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                    
                    await db.collection('userProfiles').doc(result.user.uid).set({
                        email: result.user.email,
                        memberSince: monthYear,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                }
                
            } catch (error) {
                console.error('Google sign-in error:', error);
                let errorMessage = 'Google sign-in failed. ';
                
                switch (error.code) {
                    case 'auth/popup-blocked':
                        errorMessage += 'Popup blocked. Please allow popups for this site.';
                        break;
                    case 'auth/popup-closed-by-user':
                        errorMessage += 'Sign-in cancelled.';
                        break;
                    case 'auth/cancelled-popup-request':
                        errorMessage += 'Sign-in cancelled.';
                        break;
                    default:
                        errorMessage += error.message;
                }
                
                showMessage(signinMsg, errorMessage);
            }
        });
    }

    // Profile Update (for password changes)
    if (profileForm) {
        profileForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            
            if (!auth.currentUser) {
                showMessage(profileMsg, 'No user signed in.');
                return;
            }

            const newPassword = profilePassword?.value;
            
            if (!newPassword || newPassword.length < 6) {
                showMessage(profileMsg, 'Password must be at least 6 characters long.');
                return;
            }

            try {
                await auth.currentUser.updatePassword(newPassword);
                showMessage(profileMsg, 'Password updated successfully!', 'success');
                
            } catch (error) {
                console.error('Password update error:', error);
                let errorMessage = 'Password update failed. ';
                
                if (error.code === 'auth/requires-recent-login') {
                    errorMessage += 'Please sign out and sign in again before changing your password.';
                } else {
                    errorMessage += error.message;
                }
                
                showMessage(profileMsg, errorMessage);
            }
        });
    }

    // Sign Out
    if (signoutBtn) {
        signoutBtn.addEventListener('click', async function () {
            try {
                await auth.signOut();
                console.log('User signed out successfully');
                
            } catch (error) {
                console.error('Sign out error:', error);
                showMessage(profileMsg, 'Sign out failed: ' + error.message);
            }
        });
    }

    // Load user interactions (reviews, likes, etc.)
    async function loadUserInteractions() {
        const user = auth.currentUser;
        if (!user || !db) return;

        try {
            // Load liked reviews
            const likedQuery = db.collection('userInteractions')
                .where('userId', '==', user.uid)
                .where('type', '==', 'liked');
            const likedSnapshot = await likedQuery.get();
            displayReviews(likedSnapshot.docs, 'likedReviews');

            // Load disliked reviews
            const dislikedQuery = db.collection('userInteractions')
                .where('userId', '==', user.uid)
                .where('type', '==', 'disliked');
            const dislikedSnapshot = await dislikedQuery.get();
            displayReviews(dislikedSnapshot.docs, 'dislikedReviews');

            // Load favorite reviews
            const favoritesQuery = db.collection('userInteractions')
                .where('userId', '==', user.uid)
                .where('type', '==', 'favorites');
            const favoritesSnapshot = await favoritesQuery.get();
            displayReviews(favoritesSnapshot.docs, 'favoriteReviews');
            
        } catch (error) {
            console.error('Error loading user interactions:', error);
        }
    }

    // Display reviews in the UI
    function displayReviews(docs, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        if (docs.length === 0) {
            container.innerHTML = '<p class="text-muted">No reviews yet</p>';
            return;
        }
        
        container.innerHTML = docs.map(doc => {
            const data = doc.data();
            const review = data.reviewData || {};
            
            return `
                <div class="review-cube">
                    <h3 class="review-title">${review.title || 'Untitled Review'}</h3>
                    ${review.showTitle ? `<p class="show-title"><strong>Show/Movie:</strong> ${review.showTitle}</p>` : ''}
                    <p class="review-meta">${review.author || 'Anonymous'} - ${review.date || 'No date'}</p>
                    <p class="review-content">${review.content || 'No content'}</p>
                    <div class="text-muted mt-2">
                        Interaction date: ${new Date(data.timestamp).toLocaleDateString()}
                    </div>
                    <button class="btn btn-sm btn-outline-danger mt-2" onclick="removeReview('${doc.id}', '${data.type}')">
                        Remove from ${data.type === 'favorites' ? 'Favorites' : data.type === 'liked' ? 'Liked' : 'Disliked'}
                    </button>
                </div>
            `;
        }).join('');
    }

    // Global functions for the UI
    window.removeReview = async (docId, type) => {
        try {
            const user = auth.currentUser;
            if (!user) return;
            
            await db.collection('userInteractions').doc(docId).delete();
            await loadUserInteractions();
            
        } catch (error) {
            console.error('Error removing review:', error);
            alert('Error removing review. Please try again.');
        }
    };

    window.changePassword = () => {
        alert('Use the profile form above to change your password.');
    };

    window.updateProfile = () => {
        alert('Profile update functionality will be implemented.');
    };

    window.deleteAccount = async () => {
        if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            return;
        }
        
        try {
            const user = auth.currentUser;
            if (!user) return;
            
            // Delete user profile from Firestore
            await db.collection('userProfiles').doc(user.uid).delete();
            
            // Delete user account
            await user.delete();
            alert('Account deleted successfully.');
            
        } catch (error) {
            console.error('Account deletion error:', error);
            if (error.code === 'auth/requires-recent-login') {
                alert('Please sign out and sign in again before deleting your account.');
            } else {
                alert('Error deleting account: ' + error.message);
            }
        }
    };

    // Helper functions for backward compatibility (removed localStorage usage)
    function getUsers() {
        return {}; // No longer using localStorage for user management
    }

    function getCurrentUser() {
        return auth.currentUser ? auth.currentUser.email : null;
    }

    // Initialize Firebase when DOM is ready
    initializeFirebase().catch(error => {
        console.error('Failed to initialize Firebase:', error);
        showMessage(signinMsg, 'Failed to load authentication. Please refresh the page.');
    });
});