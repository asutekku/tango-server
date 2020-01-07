import { Router } from 'express';

export class Utils {
    static async GET(url: string, router: Router, handler: (req: any) => any) {
        console.log('GET: ' + url);
        router.get(url, (req: any, res: any) => {
            handler(req)
                .then((data: any) => {
                    res.json(data);
                })
                .catch((error: any) => {
                    res.json({
                        success: false,
                        error: error.message || error
                    });
                });
        });
    }

    static POST(url: string, router: Router, handler: (req: any) => any) {
        console.log('POST: ' + url);
        router.post(url, (req: any, res: any) => {
            handler(req)
                .then((data: any) => {
                    res.json(data);
                })
                .catch((error: any) => {
                    res.json({
                        success: false,
                        error: error.message || error
                    });
                });
        });
    }
}