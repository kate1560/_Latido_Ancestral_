#!/bin/bash

# Test Script para verificar el login

echo "🧪 Testing Login API..."
echo ""

# Test Admin Login
echo "1️⃣ Testing Admin Login:"
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}' \
  -w "\nStatus: %{http_code}\n\n"

# Test Vendor Login
echo "2️⃣ Testing Vendor Login:"
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"vendor@example.com","password":"vendor123"}' \
  -w "\nStatus: %{http_code}\n\n"

# Test User Login
echo "3️⃣ Testing User Login:"
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"user123"}' \
  -w "\nStatus: %{http_code}\n\n"

# Test Invalid Login
echo "4️⃣ Testing Invalid Login:"
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid@example.com","password":"wrong"}' \
  -w "\nStatus: %{http_code}\n\n"

echo "✅ Test Complete"
