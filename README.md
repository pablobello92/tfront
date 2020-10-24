## Error "cannot find module "@angular/... blah blah/lifecycle hooks" for PrimeNG

Navigate to "/node_modules/primeng/components/table/table.d.ts" and change this line:

import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks'; 

For this one:

import {OnDestroy } from '@angular/core';

