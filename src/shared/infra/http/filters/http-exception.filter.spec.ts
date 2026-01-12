import { HttpException, HttpStatus } from '@nestjs/common';
import { GlobalExceptionFilter } from './http-exception.filter';

describe('GlobalExceptionFilter', () => {
    let filter: GlobalExceptionFilter;
    let mockResponse: any;
    let mockArgumentsHost: any;

    beforeEach(() => {
        filter = new GlobalExceptionFilter();
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        mockArgumentsHost = {
            switchToHttp: jest.fn().mockReturnValue({
                getResponse: () => mockResponse,
            }),
        };
    });

    it('should be defined', () => {
        expect(filter).toBeDefined();
    });

    it('should catch HttpException and return correct response', () => {
        const status = HttpStatus.BAD_REQUEST;
        const message = 'Bad Request';
        const exception = new HttpException(message, status);

        filter.catch(exception, mockArgumentsHost);

        expect(mockResponse.status).toHaveBeenCalledWith(status);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: false,
                statusCode: status,
                error: message,
                timestamp: expect.any(String),
            })
        );
    });

    it('should catch generic error and return internal server error status', () => {
        const exception = new Error('Generic Error');
        const status = HttpStatus.INTERNAL_SERVER_ERROR;

        filter.catch(exception, mockArgumentsHost);

        expect(mockResponse.status).toHaveBeenCalledWith(status);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: false,
                statusCode: status,
                error: 'Generic Error',
                timestamp: expect.any(String),
            })
        );
    });

    it('should return "Internal server error" if exception has no message', () => {
        const exception = {};
        const status = HttpStatus.INTERNAL_SERVER_ERROR;

        filter.catch(exception, mockArgumentsHost);

        expect(mockResponse.status).toHaveBeenCalledWith(status);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                error: 'Internal server error',
            })
        );
    });
});
