const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test the API endpoints
async function testAPI() {
  try {
    console.log('🧪 Testing Skill Swap Platform API...\n');

    // Test 1: Check if server is running
    console.log('1. Testing server connection...');
    const response = await axios.get('http://localhost:5000/');
    console.log('✅ Server is running:', response.data);

    // Test 2: Register a test user
    console.log('\n2. Testing user registration...');
    const registerData = {
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      location: 'Test City',
      skillsOffered: ['JavaScript', 'React'],
      skillsWanted: ['Python', 'Django'],
      availability: 'Weekends',
      isPrivate: false
    };

    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, registerData);
    console.log('✅ User registered successfully');
    console.log('User ID:', registerResponse.data.user._id);
    console.log('Token received:', registerResponse.data.token ? 'Yes' : 'No');

    // Test 3: Login with the registered user
    console.log('\n3. Testing user login...');
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };

    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, loginData);
    console.log('✅ User logged in successfully');
    const token = loginResponse.data.token;

    // Test 4: Get user profile
    console.log('\n4. Testing profile retrieval...');
    const profileResponse = await axios.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Profile retrieved successfully');
    console.log('User name:', profileResponse.data.fullName);

    // Test 5: Get announcements
    console.log('\n5. Testing announcements...');
    const announcementsResponse = await axios.get(`${BASE_URL}/announcements`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Announcements retrieved successfully');
    console.log('Announcements count:', announcementsResponse.data.length);

    console.log('\n🎉 All tests passed! Your API is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the test
testAPI(); 