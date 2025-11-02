import { TestBed } from '@angular/core/testing';

import { OrderLine } from './order-line';

describe('OrderLine', () => {
  let service: OrderLine;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderLine);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
