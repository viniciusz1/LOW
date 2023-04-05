import { TestBed } from '@angular/core/testing';

import { AuthenticationChildGuard } from './authentication-child.guard';

describe('AuthenticationChildGuard', () => {
  let guard: AuthenticationChildGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticationChildGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
