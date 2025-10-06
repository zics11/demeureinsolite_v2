import { NextResponse } from 'next/server';

const ERROR_STATUS_MAP = {
  INVALID_DATE: 400,
  START_AFTER_END: 400,
  DATE_RANGE_INVALID: 400,
  DATE_RANGE_TOO_LONG: 400,
  RESERVATION_STATUS_INVALID: 400,
  RESERVATION_NOT_FOUND: 404,
  LISTING_NOT_FOUND: 404,
  DATES_ALREADY_RESERVED: 409,
  DATES_BLOCKED: 409,
  BLACKOUT_OVERLAP: 409,
  UNSUPPORTED_CONTENT_TYPE: 415,
  UNAUTHORIZED: 401,
  MISSING_FIELDS: 400,
  INVALID_NUMBER: 400,
  LISTING_REQUIRED: 400,
  P2025: 404,
};

export function json(data, init = {}) {
  return NextResponse.json(data, init);
}

export function errorResponse(error) {
  const code = error.code || error.message || 'UNKNOWN_ERROR';
  const status = ERROR_STATUS_MAP[code] || 500;

  const body = {
    error: code,
  };

  if (error.missingFields) {
    body.missingFields = error.missingFields;
  }

  if (process.env.NODE_ENV !== 'production' && error.message) {
    body.message = error.message;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return NextResponse.json(body, { status });
}

export function requireJsonContentType(request) {
  const contentType = request.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const error = new Error('UNSUPPORTED_CONTENT_TYPE');
    error.code = 'UNSUPPORTED_CONTENT_TYPE';
    throw error;
  }
}
