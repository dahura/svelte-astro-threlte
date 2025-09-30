import { generateGenericModel } from './agent';

// Test function to specifically test complete kitchen modules
async function testKitchenModules() {
  console.log('Testing complete kitchen module generation...\n');

  // Test 1: Complete kitchen request
  console.log('Test 1: Complete kitchen request');
  try {
    const result1 = await generateGenericModel('I want a complete modern kitchen with lower cabinets, upper cabinets, and a tall pantry cabinet');
    console.log('Number of cabinets generated:', result1.length);
    console.log('Cabinet types:');
    const typeCount: Record<string, number> = {};
    result1.forEach(cabinet => {
      typeCount[cabinet.type] = (typeCount[cabinet.type] || 0) + 1;
    });
    console.log(typeCount);
    console.log('First few cabinets:', result1.slice(0, 3));
  } catch (error) {
    console.error('Error:', error);
  }
 console.log('\n' + '='.repeat(70) + '\n');

 // Test 2: Kitchen with specific features
  console.log('Test 2: Kitchen with specific features');
  try {
    const result2 = await generateGenericModel('Create a modern kitchen with multiple lower cabinets with drawers, some upper cabinets with glass doors, and a tall connecting cabinet');
    console.log('Number of cabinets generated:', result2.length);
    console.log('Cabinet types:');
    const typeCount: Record<string, number> = {};
    result2.forEach(cabinet => {
      typeCount[cabinet.type] = (typeCount[cabinet.type] || 0) + 1;
    });
    console.log(typeCount);
  } catch (error) {
    console.error('Error:', error);
  }
  console.log('\n' + '='.repeat(70) + '\n');

  // Test 3: L-shaped kitchen
  console.log('Test 3: L-shaped kitchen');
  try {
    const result3 = await generateGenericModel('Design an L-shaped kitchen with corner cabinet, lower cabinets with various door configurations, upper cabinets, and a tall pantry');
    console.log('Number of cabinets generated:', result3.length);
    console.log('Cabinet types:');
    const typeCount: Record<string, number> = {};
    result3.forEach(cabinet => {
      typeCount[cabinet.type] = (typeCount[cabinet.type] || 0) + 1;
    });
    console.log(typeCount);
  } catch (error) {
    console.error('Error:', error);
  }
  console.log('\n' + '='.repeat(70) + '\n');

  // Test 4: Small kitchen
  console.log('Test 4: Small kitchen');
  try {
    const result4 = await generateGenericModel('I have a small kitchen space, create a compact design with essential lower and upper cabinets and one tall cabinet');
    console.log('Number of cabinets generated:', result4.length);
    console.log('Cabinet types:');
    const typeCount: Record<string, number> = {};
    result4.forEach(cabinet => {
      typeCount[cabinet.type] = (typeCount[cabinet.type] || 0) + 1;
    });
    console.log(typeCount);
  } catch (error) {
    console.error('Error:', error);
  }
 console.log('\n' + '='.repeat(70) + '\n');

  console.log('All kitchen module tests completed!');
}

// Run the tests
testKitchenModules().catch(console.error);