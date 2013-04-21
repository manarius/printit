"use strict";

module.exports = [
    {
        name: 'fighter',
        slug: 'fighter',
        desc: 'fighters are the smallest ships',
        excerpt: 'smallest ships',
        published: true,
        
        minSize: 2,
        maxSize: 4,

        minCrew: 1, // size / 5 gets added and rounded
        maxCrew: 3  // size / 5 gets added and rounded
    },
    {
        name: 'frigate',
        slug: 'frigate',
        desc: 'frigates are the second biggest ships',
        excerpt: 'frigates. second biggest ships.',
        published: true,
        
        minSize: 5,
        maxSize: 10,

        minCrew: 2,
        maxCrew: 6
    },
    {
        name: 'cruiser',
        slug: 'cruiser',
        desc: 'cruisers are pretty big. not as big as battleships though',
        excerpt: 'bigger than frigates, smaller than battleships.',
        published: true,
        
        minSize: 10,
        maxSize: 15,

        minCrew: 3,
        maxCrew: 8
    },
    {
        name: 'battleship',
        slug: 'battleship',
        desc: 'biggest ship class so far',
        excerpt: 'they are really big.',
        published: true,
        
        minSize: 15,
        maxSize: 20,

        minCrew: 5,
        maxCrew: 10
    }
];
