import Tabler from './tabler/tabler.js';
import HEADER from  './tabler/data/data-header.js';
import BODY from  './tabler/data/data-body.js';
import UPDATE from  './tabler/data/data-update.js';

console.log(HEADER);
console.log(BODY);
Tabler.create(BODY,HEADER)
	.appendOn('#root')
	.set({
		class : 'table table-striped',
		id : ''
	});

Tabler.updateRow(0,UPDATE);