"use strict";

module.exports = [
    {
        name: 'Strong Attack',
        slug: 'strong_attack',
        published: true,
        
        desc: 'This perk adds one point of strength to all units of the fleet per level of the perk.',
        excerpt: 'adds one point of strength per level to the units',
                
        cost: 50,
        costMultiply: 1.2,
        
        strength: 1,
        aim: 0,
        initiative: 0,
        morale: 0
    },
    {
        name: 'Steady Arms',
        slug: 'steady_arms',
        published: true,
        
        desc: 'This perk adds one point of aim to all units of the fleet per level of the perk.',
        excerpt: 'adds one point of aim per level to the units',
                
        cost: 50,
        costMultiply: 1.2,
        
        strength: 0,
        aim: 1,
        initiative: 0,
        morale: 0
    },
    {
        name: 'Fast Thinking',
        slug: 'fast_thinking',
        published: true,
        
        desc: 'This perk adds one point of initiative to all units of the fleet per level of the perk.',
        excerpt: 'adds one point of initiative per level to the units',
                
        cost: 50,
        costMultiply: 1.2,
        
        strength: 0,
        aim: 0,
        initiative: 1,
        morale: 0
    },
    {
        name: 'Good Spirit',
        slug: 'good_spirit',
        published: true,
        
        desc: 'This perk adds one point of morale to all units of the fleet per level of the perk.',
        excerpt: 'adds one point of morale per level to the units',
                
        cost: 50,
        costMultiply: 1.2,
        
        strength: 0,
        aim: 0,
        initiative: 0,
        morale: 1
    }
];
