#!/usr/bin/env node

/**
 * Supabase Configuration Test Script
 * Run this script to test if Supabase is properly configured
 */

// Load environment variables from .env.local manually
const fs = require('fs');
const path = require('path');

try {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        process.env[key.trim()] = value;
      }
    });
  }
} catch (error) {
  console.log('⚠️  Could not load .env.local file');
}

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

console.log('🔍 Testing Supabase Configuration...\n');

// Check environment variables
console.log('📋 Environment Variables:');
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (value && value.length > 0) {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`❌ ${varName}: Missing or empty`);
  }
});

// Test URL validity
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (supabaseUrl) {
  try {
    new URL(supabaseUrl);
    console.log('✅ Supabase URL format: Valid');
    
    // Check if it's not a placeholder
    if (supabaseUrl.includes('your_supabase_project_url_here') || 
        supabaseUrl.includes('your-project-id')) {
      console.log('⚠️  Supabase URL: Contains placeholder values');
    } else {
      console.log('✅ Supabase URL: Real configuration detected');
    }
  } catch (error) {
    console.log('❌ Supabase URL format: Invalid -', error.message);
  }
} else {
  console.log('❌ Supabase URL: Not set');
}

// Test API key format
const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (apiKey) {
  if (apiKey.includes('your_supabase_anon_key')) {
    console.log('⚠️  Supabase API Key: Contains placeholder values');
  } else if (apiKey.startsWith('eyJ')) {
    console.log('✅ Supabase API Key: Valid JWT format detected');
  } else {
    console.log('⚠️  Supabase API Key: Unexpected format');
  }
} else {
  console.log('❌ Supabase API Key: Not set');
}

console.log('\n' + '='.repeat(50));

// Test client creation
try {
  const { createClient } = require('@supabase/supabase-js');
  
  if (supabaseUrl && apiKey && 
      !supabaseUrl.includes('your_supabase_project_url_here') &&
      !apiKey.includes('your_supabase_anon_key')) {
    
    const client = createClient(supabaseUrl, apiKey);
    console.log('🎉 Supabase client created successfully!');
    console.log('✨ Configuration appears to be working correctly.');
  } else {
    console.log('⚠️  Supabase client not created due to placeholder values.');
    console.log('📝 Please update your .env.local file with real Supabase credentials.');
  }
} catch (error) {
  console.log('❌ Failed to create Supabase client:', error.message);
}