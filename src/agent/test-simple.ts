import { generateGenericModel } from './agent';

// Simple test to check if components are included
async function testSimple() {
  console.log('Testing simple cabinet with components...\n');

  try {
    const result = await generateGenericModel('Create one lower cabinet with drawers and shelves');
    console.log('Generated cabinet:', JSON.stringify(result[0], null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testSimple().catch(console.error);