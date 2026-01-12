import { TransformInterceptor } from './transform.interceptor';
import { of } from 'rxjs';
import { ExecutionContext, CallHandler } from '@nestjs/common';

describe('TransformInterceptor', () => {
    let interceptor: TransformInterceptor<any>;
    let executionContext: ExecutionContext;
    let callHandler: CallHandler;

    beforeEach(() => {
        interceptor = new TransformInterceptor();

        const mockResponse = {
            statusCode: 200,
        };

        executionContext = {
            switchToHttp: jest.fn().mockReturnThis(),
            getResponse: jest.fn().mockReturnValue(mockResponse),
        } as unknown as ExecutionContext;

        callHandler = {
            handle: jest.fn().mockReturnValue(of('test data')),
        } as unknown as CallHandler;
    });

    it('should be defined', () => {
        expect(interceptor).toBeDefined();
    });

    it('should transform response correctly', (done) => {
        interceptor.intercept(executionContext, callHandler).subscribe((result) => {
            expect(result).toEqual({
                statusCode: 200,
                message: 'Success',
                result: 'test data',
            });
            done();
        });
    });

    it('should use the status code from the response', (done) => {
        const mockResponse = {
            statusCode: 201,
        };

        (executionContext.switchToHttp().getResponse as jest.Mock).mockReturnValue(mockResponse);

        interceptor.intercept(executionContext, callHandler).subscribe((result) => {
            expect(result.statusCode).toBe(201);
            done();
        });
    });
});
