import { generateGenericModel } from './agent';

// Test to verify lower/upper cabinet proportions
async function testProportions() {
  console.log('Testing lower/upper cabinet proportions...\n');

  try {
    console.log('Test: Complete kitchen request (should follow lower/upper proportion rule)');
    const result = await generateGenericModel('Create a complete kitchen with lower and upper cabinets');
    
    const lowerCount = result.filter(cabinet => cabinet.type === 'lower').length;
    const upperCount = result.filter(cabinet => cabinet.type === 'upper').length;
    const tallCount = result.filter(cabinet => cabinet.type === 'tall').length;
    
    console.log(`Lower cabinets: ${lowerCount}`);
    console.log(`Upper cabinets: ${upperCount}`);
    console.log(`Tall cabinets: ${tallCount}`);
    console.log(`Proportion correct: ${lowerCount === upperCount + 1 ? 'YES' : 'NO'}`);
    
    console.log('\nAll cabinets generated:');
    result.forEach((cabinet, index) => {
      console.log(`${index + 1}. Type: ${cabinet.type}, Dimensions: ${cabinet.dimensions.width}x${cabinet.dimensions.height}x${cabinet.dimensions.depth}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

testProportions().catch(console.error);