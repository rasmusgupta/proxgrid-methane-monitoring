// Comprehensive Debug Test Script
// Run this in browser console to identify all issues

console.log('🔍 ProxGrid Debug Test Suite Starting...');

// Test 1: Check for React errors
console.group('1. React & Component Tests');
try {
  const reactErrors = window.__REACT_DEVTOOLS_GLOBAL_HOOK__?.reactDevtoolsAgent?.currentErrors || [];
  console.log('React Errors:', reactErrors.length ? reactErrors : '✅ None');
} catch (e) {
  console.log('React DevTools not available');
}
console.groupEnd();

// Test 2: Check authentication context
console.group('2. Authentication Tests');
try {
  console.log('localStorage user:', localStorage.getItem('proxgrid-user'));
  console.log('Auth context available:', window.React ? '✅ Yes' : '❌ No');
} catch (e) {
  console.error('Auth test failed:', e);
}
console.groupEnd();

// Test 3: Check CSS and Tailwind
console.group('3. CSS & Styling Tests');
// Check if Tailwind classes are working
const testElement = document.createElement('div');
testElement.className = 'bg-primary-600 text-white p-4';
document.body.appendChild(testElement);
const computedStyle = window.getComputedStyle(testElement);
console.log('Primary color working:', computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' ? '✅ Yes' : '❌ No');
console.log('Computed bg color:', computedStyle.backgroundColor);
document.body.removeChild(testElement);
console.groupEnd();

// Test 4: Check for console errors
console.group('4. Console Error Check');
let errorCount = 0;
const originalError = console.error;
console.error = function(...args) {
  errorCount++;
  originalError.apply(console, args);
};
setTimeout(() => {
  console.log(`Console errors detected: ${errorCount}`);
  console.error = originalError;
}, 1000);
console.groupEnd();

// Test 5: Network requests
console.group('5. Network Tests');
fetch(window.location.href)
  .then(response => {
    console.log('Homepage fetch status:', response.status === 200 ? '✅ OK' : '❌ Error');
  })
  .catch(e => console.error('Network test failed:', e));
console.groupEnd();

// Test 6: DOM structure
console.group('6. DOM Structure Tests');
const navigation = document.querySelector('nav');
const heroSection = document.querySelector('section');
const footer = document.querySelector('footer');

console.log('Navigation present:', navigation ? '✅ Yes' : '❌ No');
console.log('Hero section present:', heroSection ? '✅ Yes' : '❌ No');
console.log('Footer present:', footer ? '✅ Yes' : '❌ No');
console.groupEnd();

// Test 7: Link functionality
console.group('7. Navigation Link Tests');
const loginButton = document.querySelector('a[href="/login"]');
const signInButton = document.querySelector('a[href*="login"]');

console.log('Login button found:', loginButton ? '✅ Yes' : '❌ No');
console.log('Sign in button found:', signInButton ? '✅ Yes' : '❌ No');

if (loginButton) {
  console.log('Login button href:', loginButton.href);
}
console.groupEnd();

console.log('🏁 Debug Test Suite Complete');
console.log('Check above groups for any ❌ errors that need fixing');